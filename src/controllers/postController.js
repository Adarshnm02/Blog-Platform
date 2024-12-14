const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { title, description, link, coverImage, optionalImages } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and Description are required.' });
        }
        const newPost = new Post({
            title,
            description,
            link,
            coverImage,
            optionalImages,
            author: req.user._id, 
        });

        const savedPost = await newPost.save();
        await User.findByIdAndUpdate(req.user._id, {
            $push: { posts: savedPost._id },
        });

        res.status(201).json({
            message: 'Post created successfully',
            post: savedPost,
        });
    } catch (error) {
        console.error('Error creating post:', error.stack);
        res.status(500).json({
            message: 'Error creating post',
            error: error.message,
        });
    }
};


exports.getBlog = async(req,res) => {
    try{
        const posts = await Post.find().populate('author')
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: posts,
        })
    }catch(error){  
        console.log("Error geting data", error);
        
    }
}


exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate('author')
        if(!post){
            return res.status(404).json({message: 'Post not found!'})
        }
        res.status(200).json(post)
    } catch (error) {
        console.log("Error to fetch Post", error)
    }
}