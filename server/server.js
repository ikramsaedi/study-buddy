const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json()); // Add this line

// Connect to SQLite Database
const db = new sqlite3.Database("./studybuddy.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the studybuddy database.");
  }
});

// API route to find a matching user
app.get("/api/match", (req, res) => {
  const { userId } = req.query;

  getUserById(userId, (err, user) => {
    if (err) {
      if (err.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(500).json({ error: err.message });
    }

    const { degree, goalMinutes } = user;

    // Step 2: Check if the user is already in an active auto-match group
    isUserInActiveAutoMatchGroup(userId, (err, isInGroup) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (isInGroup) {
        return res.json({
          message: "User is already in an active auto-match group",
        });
      }

      // Step 3: Find a match based on degree and goalMinutes
      findMatchingUser(userId, degree, goalMinutes, (err, matchedUser) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (matchedUser) {
          // Step 4: Create a new group
          createStudyGroup(true, (err, newGroupId) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            // Step 5: Add users to the study group
            addUsersToStudyGroup(
              [userId, matchedUser.id],
              newGroupId,
              (err) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }

                res.json({
                  message: "New group created and users added",
                  groupId: newGroupId,
                  matchedUser,
                });
              }
            );
          });
        } else {
          res.json({ message: "No match found" });
        }
      });
    });
  });
});

// API route to check if user is already in a matched group and if the group is active
// Update /api/isUserInMatchedGroup to use the helper function
app.get("/api/isUserInMatchedGroup", (req, res) => {
  const { userId } = req.query;

  isUserInActiveAutoMatchGroup(userId, (err, isInGroup) => {
    if (err) {
      console.log("Error fetching user group:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json({ isInMatchedGroup: isInGroup });
  });
});

// API endpoint to add a study session
app.post("/api/addStudySession", (req, res) => {
  console.log("Received request body:", req.body); // Log the request body

  const { userId, start, end, durationMinutes, tag } = req.body;

  // Validate the input
  if (
    !userId ||
    !start ||
    !end ||
    (typeof durationMinutes !== "number" && !durationMinutes) ||
    !tag
  ) {
    return res
      .status(400)
      .json({ error: "Invalid request or unauthorized user" });
  }

  // SQL query to insert a new study session
  const query = `
    INSERT INTO studySession (userId, start, end, durationMinutes, tag)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [userId, start, end, durationMinutes, tag], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Study session added successfully!" });
  });
});

// Fetch user stats for today
app.get("/api/user/:id/stats", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT
      SUM(durationMinutes) as totalMinutes,
      MAX(durationMinutes) as longestSession,
      COUNT(*) as sessions,
      COUNT(DISTINCT tag) as types
    FROM studySession
    WHERE userId = ?
    AND DATE(start) = DATE('now') -- Filter for today's date
  `;

  db.get(query, [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      totalMinutes: row.totalMinutes || 0,
      longestSession: row.longestSession || 0,
      sessions: row.sessions || 0,
      types: row.types || 0,
    });
  });
});

// API endpoint to get all study groups for a user
app.get("/api/user/:id/studyGroups", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT sg.id, sg.name, sg.start, sg.end, sg.isAutomatch
    FROM studyGroup sg
    INNER JOIN user_studyGroup usg ON sg.id = usg.studyGroupId
    WHERE usg.userId = ?
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message); // Log the exact error for debugging
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: "No study groups found for this user" });
      return;
    }

    res.json({ studyGroups: rows });
  });
});

// API endpoint to get all members and their total minutes for a study group (filtered by group's start and end dates)
app.get("/api/groups/:id/members", (req, res) => {
  const groupId = req.params.id;

  const query = `
    SELECT u.name, 
           COALESCE(SUM(ss.durationMinutes), 0) AS minutes
    FROM user u
    INNER JOIN user_studyGroup usg ON u.id = usg.userId
    LEFT JOIN studySession ss ON u.id = ss.userId
    WHERE usg.studyGroupId = ?
      AND (ss.start IS NULL OR (ss.start >= (SELECT start FROM studyGroup WHERE id = ?)
      AND (SELECT end FROM studyGroup WHERE id = ?) IS NULL OR ss.start <= (SELECT end FROM studyGroup WHERE id = ?)))
    GROUP BY u.id
  `;

  db.all(query, [groupId, groupId, groupId, groupId], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message); // Log the exact error for debugging
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: "No members found for this group" });
      return;
    }

    // Return only name and minutes for each member
    const members = rows.map((row) => ({
      name: row.name,
      minutes: row.minutes,
    }));

    res.json({ members });
  });
});

// Endpoint to get user profile information
// Endpoint to get user profile information
app.get("/api/profile", (req, res) => {
  const { userId } = req.query;

  getUserById(userId, (err, user) => {
    if (err) {
      console.log("Error getting user profile:", err.message);
      if (err.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(500).json({ error: err.message });
      }
      return;
    }
    res.json({ user });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function getUserById(userId, callback) {
  db.get(
    `SELECT id, name, gender, degree, pronouns, goalMinutes
     FROM user
     WHERE id = ?`,
    [userId],
    (err, user) => {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(new Error("User not found"));
      }
      callback(null, user);
    }
  );
}

function isUserInActiveAutoMatchGroup(userId, callback) {
  // Log the userId for debugging purposes
  console.log("Checking for userId:", userId);

  // Query to check if the user is in an active auto-match group using DATETIME('now')
  db.get(
    `SELECT * FROM user_studyGroup usg
     JOIN studyGroup sg ON usg.studyGroupId = sg.id
     WHERE usg.userId = ?
     AND sg.isAutomatch = 1 
     AND DATETIME('now') BETWEEN DATETIME(sg.start) AND DATETIME(sg.end)`,
    [userId],
    (err, row) => {
      if (err) {
        console.log("Error fetching user group:", err.message);
        return callback(err);
      }

      console.log("Query result:", row); // Log the query result for debugging

      // If row exists, user is already in an active auto-match group
      callback(null, !!row);
    }
  );
}

function findMatchingUser(userId, degree, goalMinutes, callback) {
  db.get(
    `WITH DegreeMatches AS (
      SELECT *, ABS(goalMinutes - ?) AS goalDiff FROM user
      WHERE degree = ?
        AND id NOT IN (
          SELECT userId FROM user_studyGroup
          WHERE studyGroupId IN (
            SELECT id FROM studyGroup
            WHERE isAutomatch = 1
              AND DATETIME('now') BETWEEN start AND end
          )
        )
        AND id != ?
      ORDER BY goalDiff ASC
    )
    SELECT * FROM DegreeMatches
    UNION ALL
    SELECT *, ABS(goalMinutes - ?) AS goalDiff FROM user
    WHERE id NOT IN (
      SELECT userId FROM user_studyGroup
      WHERE studyGroupId IN (
        SELECT id FROM studyGroup
        WHERE isAutomatch = 1
          AND DATETIME('now') BETWEEN start AND end
      )
    )
      AND id != ?
    ORDER BY goalDiff ASC
    LIMIT 1;`,
    [goalMinutes, degree, userId, goalMinutes, userId],
    (err, matchedUser) => {
      if (err) {
        return callback(err);
      }
      callback(null, matchedUser);
    }
  );
}

function createStudyGroup(isAutomatch, callback) {
  const now = new Date().toISOString(); // Current datetime in ISO format
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Add one week
  const end = oneWeekFromNow.toISOString();

  db.run(
    `INSERT INTO studyGroup (name, isAutomatch, start, end) VALUES ('Study Buddy Group', ?, ?, ?)`,
    [isAutomatch ? 1 : 0, now, end],
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID); // Return the new group's ID
    }
  );
}

function addUsersToStudyGroup(userIds, studyGroupId, callback) {
  const placeholders = userIds.map(() => "(?, ?)").join(", ");
  const values = [];
  userIds.forEach((userId) => {
    values.push(userId, studyGroupId);
  });

  db.run(
    `INSERT INTO user_studyGroup (userId, studyGroupId) VALUES ${placeholders}`,
    values,
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    }
  );
}
