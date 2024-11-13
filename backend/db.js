// backend/db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "35.247.231.201",
    user: "root",
    password: "ecomap123",
    database: "ecomap"
});

export default db;
