const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Reviews', reviewsSchema, 'reviews')