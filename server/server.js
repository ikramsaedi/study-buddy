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
