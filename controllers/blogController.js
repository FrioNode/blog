// Placeholder data — will be replaced with DB later
const posts = [
  {
    id: 1,
    title: 'Day 0: Why I Am Building In Public',
    slug: 'day-0-building-in-public',
    excerpt: 'A solo dev in Nairobi. No team, no funding, just a laptop and a vision. This is where I document everything — the wins, the bugs, the lessons.',
    date: 'April 17, 2025',
    tag: 'Journal',
  }
];

exports.index = (req, res) => {
  res.render('index', {
    title: 'frionode | building in public',
    posts,
  });
};

exports.blog = (req, res) => {
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
