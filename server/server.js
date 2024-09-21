const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Connect to SQLite Database
const db = new sqlite3.Database("../database/studybuddy.db", (err) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// TODO: Probably need to fix this to fetch today's data eventually
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
      types: row.types || 0
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
      console.error('Database error:', err.message); // Log the exact error for debugging
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'No study groups found for this user' });
      return;
    }

    res.json({ studyGroups: rows });
  });
});

// API endpoint to get all members and their total hours for a study group
app.get("/api/groups/:id/members", (req, res) => {
  const groupId = req.params.id;

  const query = `
    SELECT u.name, 
           COALESCE(SUM(ss.durationMinutes), 0) AS hours
    FROM user u
    INNER JOIN user_studyGroup usg ON u.id = usg.userId
    LEFT JOIN studySession ss ON u.id = ss.userId
    WHERE usg.studyGroupId = ?
    GROUP BY u.id
  `;

  db.all(query, [groupId], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message); // Log the exact error for debugging
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'No members found for this group' });
      return;
    }

    // Return only name and hours for each member
    const members = rows.map(row => ({
      name: row.name,
      hours: row.hours
    }));

    res.json({ members });
  });
});


