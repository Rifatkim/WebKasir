// db.js
const mysql = require("mysql2");

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost", // Host database
  user: "root", // Username MySQL
  password: "", // Password MySQL
  database: "usernamekasir", // Nama database
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
