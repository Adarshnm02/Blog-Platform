const express = require('express');
const { createPost, getBlog, getPost } = require('../controllers/postController');
const userAuth = require('../authentication/userAuth');

const router = express.Router();

// POST /createPost - Requires Authentication
router.post('/createPost', userAuth, createPost);
router.get('/getBlog', userAuth, getBlog)
router.get('/getPost/:postId', userAuth, getPost)

module.exports = router;
