const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { createTable } = require('./models/postModel');
const session = require('express-session');
const blogRoutes = require('./routes/blogRoutes')
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// middleares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 8 }
}));

// Routes
app.use('/', blogRoutes);
app.use('/admin', adminRoutes)

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found | frionode' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

// START SERVER ONLY AFTER DB READY
async function start() {
  try {
    await createTable();

    app.listen(PORT, () => {
      console.log(`blog.frionode.online running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

start();
