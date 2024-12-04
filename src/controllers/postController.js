const Post = require('../models/Post');
const User = require('../models/User');


exports.createPost = async (req, res) => {
    try {
       const { title, content, image} = req.body;
       
       const newPost = new Post({
        title,
        content,
        image,
        author: req.user.id
       });

       const savedPost = await newPost.save();

       await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: savedPost._id}
       });

       res.status(201).json({
        message: 'Post created Successfully',
        post: savedPost
       });

    } catch (error) {
        res.status(400).json({
            message: 'Error creating post',
            error: error.message
        })
    }
};