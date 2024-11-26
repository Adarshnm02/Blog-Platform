const mongoose = require('mongoose')
const User = require('./User')


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    createdId: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Post', PostSchema)