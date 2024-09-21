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

// API endpoint to get all courses
app.get("/api/courses", (req, res) => {
  db.all("SELECT * FROM course", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ courses: rows });
  });
});


// API route to find a matching user
app.get("/api/match", (req, res) => {
  const { userId } = req.query;

  // Step 1: Query the user's degree and goalMinutes based on userId
  db.get(
    `SELECT degree, goalMinutes
     FROM user
     WHERE id = ?`,
    [userId],
    (err, user) => {
      if (err) {
        console.log("first");
        res.status(500).json({ error: err.message });
        return;
      }

      if (!user) {
        res.json({ message: "User not found" });
        return;
      }

      const { degree, goalMinutes } = user;

      console.log("userId:", userId);
      console.log("degree:", degree);
      console.log("goalMinutes:", goalMinutes);

      // Step 2: Check if the user is already in an auto-match group
      db.get(
        `SELECT * FROM user_studyGroup usg
         JOIN studyGroup sg ON usg.studyGroupId = sg.id
         WHERE usg.userId = ? AND sg.isAutomatch = 1`,
        [userId],
        (err, row) => {
          if (err) {
            console.log("second");
            res.status(500).json({ error: err.message });
            return;
          }

          if (row) {
            res.json({ message: "User is already in an auto-match group" });
          } else {
            // Step 3: Find a match based on degree and goalMinutes
            db.get(
              `WITH DegreeMatches AS (
                SELECT *, ABS(goalMinutes - ?) AS goalDiff FROM user
                WHERE degree = ?
                AND id NOT IN (
                    SELECT userId FROM user_studyGroup
                    WHERE studyGroupId IN (
                    SELECT id FROM studyGroup 
                    WHERE isAutomatch = true
                    AND DATETIME('now') > start
                    AND DATETIME('now') < end
                    )
                )
                AND id != ?  -- Exclude the requesting user
                ORDER BY goalDiff ASC
                )
                SELECT * FROM DegreeMatches
                UNION ALL
                SELECT *, ABS(goalMinutes - ?) AS goalDiff FROM user
                WHERE id NOT IN (
                SELECT userId FROM user_studyGroup
                WHERE studyGroupId IN (
                    SELECT id FROM studyGroup 
                    WHERE isAutomatch = true
                    AND DATETIME('now') > start
                    AND DATETIME('now') < end
                )
                )
                AND id != ?  -- Exclude the requesting user
                ORDER BY goalDiff ASC
                LIMIT 1;`,
              [goalMinutes, degree, userId, goalMinutes, userId],
              (err, matchedUser) => {
                if (err) {
                  console.log("third");
                  res.status(500).json({ error: err.message });
                  return;
                }

                if (matchedUser) {
                  const now = new Date().toISOString(); // Get the current date and time in ISO format
                  const oneWeekFromNow = new Date();
                  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Add one week
                  const end = oneWeekFromNow.toISOString(); // Get the date one week from now in ISO format

                  db.run(
                    `INSERT INTO studyGroup (name, isAutomatch, start, end) VALUES ('Study Buddy Group', ?, ?, ?)`,
                    [1, now, end],
                    function (err) {
                      if (err) {
                        console.log("forth", err.message);
                        res.status(500).json({ error: err.message });
                        return;
                      }

                      console.log("wtf is this?", this.lastID); // Get the new group's ID
                      const newGroupId = this.lastID; // Get the new group's ID

                      // Step 5: Add users to user_group table
                      db.run(
                        `INSERT INTO user_studyGroup (userId, studyGroupId) VALUES (?, ?), (?, ?)`,
                        [userId, newGroupId, matchedUser.id, newGroupId],
                        (err) => {
                          if (err) {
                            console.log("fifth", err.message);
                            res.status(500).json({ error: err.message });
                            return;
                          }

                          res.json({
                            message: "New group created and users added",
                            groupId: newGroupId,
                            matchedUser,
                          });
                        }
                      );
                    }
                  );
                } else {
                  res.json({ message: "No match found" });
                }
              }
            );
          }
        }
      );
    }
  );
})
// API endpoint to add a study session
app.post("/api/addStudySession", (req, res) => {
  console.log("Received request body:", req.body); // Log the request body

  const { userId, start, end, durationMinutes, tag } = req.body;

  // Validate the input
  if (!userId || !start || !end || (typeof durationMinutes !== "number" && !durationMinutes) || !tag) {
    console.log("loaf are we in here?", {userId, start, end, durationMinutes, tag})
    return res.status(400).json({ error: "Invalid request or unauthorized user" });
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
