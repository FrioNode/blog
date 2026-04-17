const express = require('express');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');

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

app.listen(PORT, () => {
  console.log(`blog.frionode.online running on http://localhost:${PORT}`);
});
