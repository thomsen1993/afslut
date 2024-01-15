const mongoose = require('mongoose');


const toastSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
})


module.exports = mongoose.model('Toast', toastSchema, 'toast')