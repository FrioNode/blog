const db = require('../config/db');

// helper: title → slug
const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

exports.dashboard = (req, res) => {
  const posts = db.prepare('SELECT id, title, slug, date, tag FROM posts ORDER BY id DESC').all();
  res.render('admin/dashboard', { title: 'Admin | Dashboard', posts });
};

exports.newPost = (req, res) => {
  res.render('admin/new-post', { title: 'Admin | New Post', error: null });
};

exports.createPost = (req, res) => {
  const { title, excerpt, content, tag } = req.body;
  const slug = slugify(title);
  const date = new Date().toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  try {
    db.prepare(`
      INSERT INTO posts (title, slug, excerpt, content, date, tag)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt, content, date, tag);
    res.redirect('/admin/dashboard');
  } catch (e) {
    res.render('admin/new-post', { title: 'Admin | New Post', error: 'Slug already exists. Change the title slightly.' });
  }
};

exports.editPost = (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post) return res.redirect('/admin/dashboard');
  res.render('admin/edit-post', { title: 'Admin | Edit', post, error: null });
};

exports.updatePost = (req, res) => {
  const { title, excerpt, content, tag } = req.body;
  const slug = slugify(title);
  try {
    db.prepare(`
      UPDATE posts SET title=?, slug=?, excerpt=?, content=?, tag=? WHERE id=?
    `).run(title, slug, excerpt, content, tag, req.params.id);
    res.redirect('/admin/dashboard');
  } catch (e) {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    res.render('admin/edit-post', { title: 'Admin | Edit', post, error: 'Slug conflict. Tweak the title.' });
  }
};

exports.deletePost = (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.redirect('/admin/dashboard');
};
