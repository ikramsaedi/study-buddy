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
