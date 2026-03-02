const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.sendFile(__dirname + "/public/index.html");
  } catch (error) {
    console.error(error);
    res.send("Database connection failed ❌");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
