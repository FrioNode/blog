const initDB = require('../config/db');

exports.index = async (req, res) => {
  const db = await initDB();
  const posts = await db.all('SELECT * FROM posts ORDER BY id DESC');

  res.render('index', {
    title: 'frionode | building in public',
    posts,
  });
};

exports.blog = async (req, res) => {
  const db = await initDB();
  const posts = await db.all('SELECT * FROM posts ORDER BY id DESC');

  res.render('blog', {
    title: 'Blog | frionode',
    posts,
  });
};

exports.about = (req, res) => {
  res.render('about', {
    title: 'About | frionode',
  });
};
