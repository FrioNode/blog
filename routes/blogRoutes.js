const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.index);
router.get('/blog', blogController.blog);
router.get('/about', blogController.about);

module.exports = router;
