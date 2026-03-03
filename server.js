const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Optional route to test DB
app.get("/db-time", async (req, res) => {
  if (!pool) return res.status(500).send("DATABASE_URL not set");
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ now: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
