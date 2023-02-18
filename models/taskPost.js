const mongoose = require('mongoose');

const taskPostSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: false,
        default: "No description given lmao"
    },
    bounty:{
        type: Number,
        required: false,
        default: 0
    },
    postDate:{
        type: Date,
        default: Date.now
    },
    expireDate:{
        type: Date,
        min: Date.now,
        default: () => new Date(+new Date() + 7*24*60*60*1000)
    },
    expiredStatus:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('TaskPost', taskPostSchema);