const Database = require('better-sqlite3');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const dbPath = isProd
? '/data/sqlite.db'
: path.join(__dirname, '../database.sqlite');

const db = new Database(dbPath);

module.exports = db;
