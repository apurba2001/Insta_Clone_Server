const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    image: String,
    author: String,
    location: String,
    description: String,
    date: String,
    likes: Number,
},{ timestamps: true})

module.exports = new mongoose.model('instagrams', schema)