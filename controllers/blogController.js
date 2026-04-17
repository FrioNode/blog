const db = require('../config/db');

exports.index = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();

  res.render('index', {
    title: 'frionode | building in public',
    posts,
  });
};

exports.blog = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();

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
