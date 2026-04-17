const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const { createTable } = require('./models/postModel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', blogRoutes);

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
