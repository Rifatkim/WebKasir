const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require("./db"); // Mengimpor koneksi database dari db.js

// Membuat aplikasi Express
const app = express();
const port = 3000;

// Middleware untuk parsing request body sebagai JSON
app.use(cors());
app.use(bodyParser.json());

// API untuk registrasi pengguna baru
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password harus diisi" });
  }

  // Meng-hash password sebelum menyimpan ke database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Simpan username dan hashed password ke database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan saat registrasi" });
      }
      res.status(201).json({ message: "Akun berhasil dibuat" });
    });
  });
});

// API untuk login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password harus diisi" });
  }

  // Ambil data pengguna berdasarkan username
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    // Bandingkan password yang dimasukkan dengan yang ada di database
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing password" });
      }

      if (isMatch) {
        res.status(200).json({ message: "Login berhasil" });
      } else {
        res.status(401).json({ message: "Password salah" });
      }
    });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
