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
{
  "name": "igbekele-cooperative-system",
  "version": "1.0.0",
  "description": "Cooperative Management System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  }
}<!DOCTYPE html>
<html>
<head>
<title>Members List</title>

<style>

body{
font-family: Arial;
margin:40px;
}

h1{
text-align:center;
color:green;
}

table{
width:100%;
border-collapse: collapse;
}

th, td{
border:1px solid #ccc;
padding:10px;
text-align:left;
}

th{
background:green;
color:white;
}

</style>

</head>

<body>

<h1>COOPERATIVE MEMBERS</h1>

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Phone</th>
<th>Address</th>
<th>Occupation</th>
<th>NIN</th>
</tr>

<tbody id="membersTable"></tbody>

</table>

<script>

fetch("/members")
.then(res => res.json())
.then(data => {

let table = document.getElementById("membersTable");

data.forEach(member => {

let row = `
<tr>
<td>${member.id}</td>
<td>${member.name}</td>
<td>${member.phone}</td>
<td>${member.address}</td>
<td>${member.occupation}</td>
<td>${member.nin}</td>
</tr>
`;

table.innerHTML += row;

});

});

</script>

</body>
</html>
