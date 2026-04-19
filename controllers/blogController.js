const db = require('../config/db');

exports.index = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  res.render('index', { title: 'frionode | building in public', posts });
};

exports.blog = (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  res.render('blog', { title: 'Blog | frionode', posts });
};

exports.singlePost = (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(req.params.slug);
  if (!post) return res.status(404).render('404', { title: 'Not Found | frionode' });
  res.render('post', { title: `${post.title} | frionode`, post });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About | frionode' });
};
