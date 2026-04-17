const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const { createTable } = require('./models/postModel');

(async () => {  await createTable(); })();
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

// crazy errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('You suck at codding');
});

app.listen(PORT, () => {
  console.log(`blog.frionode.online running on http://localhost:${PORT}`);
});
