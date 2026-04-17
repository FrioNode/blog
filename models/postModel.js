const db = require('../config/db');

function createTable() {
  db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    date TEXT,
    tag TEXT
  )
  `);
}

module.exports = { createTable };
