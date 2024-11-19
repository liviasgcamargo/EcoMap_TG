// backend/db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME
    host: "localhost",
    user: "root",
    password: "123456",
    database: "ecomap",
});

export default db;
