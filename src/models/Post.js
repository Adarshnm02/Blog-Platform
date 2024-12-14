const mongoose = require('mongoose');
const validator = require('validator');


const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String, 
    },
    optionalImages: [
      {
        type: String, 
      },
    ],
    link: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: [true, 'URL is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
