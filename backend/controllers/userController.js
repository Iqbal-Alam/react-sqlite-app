// controllers/userController.js
const db = require("../db/database");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(name, email, hashedPassword);

    res
      .status(201)
      .json({ message: "User registered.", id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user." });
  }
}

function getAllUsers(req, res) {
  try {
    const users = db.prepare("SELECT id, name, email FROM users").all(); // no passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
}

module.exports = {
  registerUser,
  getAllUsers,
};
