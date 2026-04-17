const db = require('./config/db');
const { createTable } = require('./models/postModel');

// ensure table exists
createTable();

// insert or update if slug exists
db.prepare(`
INSERT INTO posts (title, slug, excerpt, content, date, tag)
VALUES (?, ?, ?, ?, ?, ?)
ON CONFLICT(slug) DO UPDATE SET
title = excluded.title,
excerpt = excluded.excerpt,
content = excluded.content,
date = excluded.date,
tag = excluded.tag
`).run(
    'Day 0: Why I Am Building In Public',
    'day-0-building-in-public',
    'A solo dev in Nakuru. No team, no funding, just a laptop and a vision. This is where I document everything — the wins, the bugs, the lessons.',
    'I am not sure of what am doing here... let us just see how this goes..',
    'April 17, 2026',
    'Journal'
);

console.log('Post inserted or updated');
