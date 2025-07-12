// db/database.js
const Database = require("better-sqlite3");
const db = new Database("ecommerce.db");

// db.prepare(`DROP TABLE IF EXISTS products`).run();
// Create table if not exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agency_details TEXT,
    invoice_no TEXT,
    invoice_date TEXT,
    medicine_name TEXT,
    hsn TEXT,
    pack TEXT,
    mfg TEXT,
    exp TEXT,
    batch TEXT,
    qty INTEGER,
    free INTEGER,
    scheme TEXT,
    mrp REAL,
    rate REAL,
    tax_gst_amt REAL,
    gst REAL,
    created_at TEXT, 
    updated_at TEXT
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`
).run();

module.exports = db;
