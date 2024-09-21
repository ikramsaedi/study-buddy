const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("../database/studybuddy.db");
db.get("SELECT * FROM course;", (_, res) => console.log(res));
console.log("loaf");
