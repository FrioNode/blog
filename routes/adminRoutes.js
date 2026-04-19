const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/dashboard', adminController.dashboard);
router.get('/posts/new', adminController.newPost);
router.post('/posts/create', adminController.createPost);
router.get('/posts/edit/:id', adminController.editPost);
router.post('/posts/update/:id', adminController.updatePost);
router.post('/posts/delete/:id', adminController.deletePost);

module.exports = router;
