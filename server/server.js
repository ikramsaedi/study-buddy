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

// API route to find a matching user
app.get("/api/match", (req, res) => {
  console.log("LOAF!!!");
  const { degree, course, goalMinutes } = req.query;
  sql = `SELECT * FROM user
     WHERE degree = ?
     AND id IN (SELECT userId FROM user_course WHERE courseId = ?)
     ORDER BY ABS(goalMinutes - ?) ASC
     LIMIT 1`;

  db.all(sql, [degree, course, goalMinutes], (err, rows) => {
    if (err) {
      console.log("Database error:", err.message); // Log the error
      res.status(500).json({ error: err.message });
    } else {
      res.json({ match: rows[0] || null });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
