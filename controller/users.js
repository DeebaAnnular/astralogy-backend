const express = require("express");
const pool = require("../model/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Create table route
router.post("/create-user-table", async (req, res) => {
  try {
    const { tableName } = req.body;
    const createTableQuery = `CREATE TABLE ${tableName} (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            NAME VARCHAR(255),
            PHONE BIGINT,
            DOB DATE,
            TOB TIME,
            USERNAME VARCHAR(255),
            PASSWORD VARCHAR(255),
            PLACEOFBIRTH VARCHAR(255),
            CURRENTCITY VARCHAR(255),
            ACTIVESTATUS BOOLEAN DEFAULT true
        )`;

    // Execute query using async/await
    await pool.query(createTableQuery);
    res.status(200).send("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).send(error.message);
  }
});

// register user
router.post("/user_register", async (req, res) => {
  let {
    id,
    name,
    phone,
    dob,
    tob,
    username,
    password,
    placeOfBirth,
    currentCity,
  } = req.body;
  try {
    const insertDetails = `INSERT INTO users (ID,NAME,PHONE,DOB,TOB,USERNAME,PASSWORD,PLACEOFBIRTH,CURRENTCITY) VALUES(?,?,?,?,?,?,?,?,?)`;
    await pool.query(insertDetails, [
      id,
      name,
      phone,
      dob,
      tob,
      username,
      password,
      placeOfBirth,
      currentCity,
    ]);
    res.status(200).send("user registerd successfully");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).send(error.message);
  }
});

// login user

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query to check if the provided username and password match any user in the database
    const loginQuery = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const [rows] = await pool.query(loginQuery, [username, password]);

    // If no user found with the provided credentials
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const user = rows[0];
    const token = jwt.sign(
      { userId: user.ID, username: user.username },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
