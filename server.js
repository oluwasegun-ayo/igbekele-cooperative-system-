const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new sqlite3.Database("./members.db");

db.run(`
CREATE TABLE IF NOT EXISTS members (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
phone TEXT,
address TEXT,
occupation TEXT,
nin TEXT
)
`);

app.post("/add-member", (req, res) => {

const { name, phone, address, occupation, nin } = req.body;

db.run(
`INSERT INTO members (name, phone, address, occupation, nin)
VALUES (?, ?, ?, ?, ?)`,
[name, phone, address, occupation, nin],
(err) => {

if(err){
res.send("Error saving member");
}else{
res.send("Member Registered Successfully");
}

});

});

app.listen(3000, () => {
console.log("Server running");
});
