const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/frionode-admin/:token', (req, res) => {
    if (req.params.token !== process.env.ADMIN_TOKEN) return res.redirect('/404');
    req.session.adminToken = req.params.token;
    res.redirect('/admin/dashboard');
});

router.get('/', blogController.index);
router.get('/blog', blogController.blog);
router.get('/blog/:slug', blogController.singlePost);
router.get('/about', blogController.about);

module.exports = router;;
