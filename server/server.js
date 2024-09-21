const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json()); // Add this line

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
