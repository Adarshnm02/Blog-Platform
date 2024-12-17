const express = require('express');
const { createPost, getBlog, getPost, getUserPost, updatePost, deletePost } = require('../controllers/postController');
const userAuth = require('../authentication/userAuth');

const router = express.Router();

// POST /createPost - Requires Authentication
router.post('/createPost', userAuth, createPost);
router.get('/getBlog', userAuth, getBlog)
router.get('/getPost/:postId', userAuth, getPost)
router.get('/getUserPosts', userAuth, getUserPost)
router.put('/updatePost/:postId', userAuth, updatePost);
router.delete('/deletePost/:postId', userAuth, deletePost)


module.exports = router;
