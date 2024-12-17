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


exports.getBlog = async (req, res) => {
    try {
        const posts = await Post.find().populate('author')
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: posts,
        })
    } catch (error) {
        console.log("Error geting data", error);

    }
}


exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate('author')
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' })
        }
        res.status(200).json(post)
    } catch (error) {
        console.log("Error to fetch Post", error)
    }
}

exports.getUserPost = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user })
        if (!posts) {
            return res.status(404).json({ message: `No Posts Created` })
        }
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error to fetch User post's", error);
    }
}


exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, description, link, coverImage, optionalImages } = req.body;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }

        post.title = title;
        post.description = description;
        post.link = link || "";

        // Only update images if they are provided
        if (coverImage) post.coverImage = coverImage;
        post.optionalImages = optionalImages || [];

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost,
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            message: 'Error updating post',
            error: error.message,
        });
    }
};


exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByIdAndDelete(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' })
        }
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: 'Error deleting post', error: error.message })
    }
}