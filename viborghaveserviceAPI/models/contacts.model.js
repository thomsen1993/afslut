const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({

    address: {
        type: String
    },
    openhours: {
        type: String
    },
    contactinformation: {
        type: String
    }
})


module.exports = mongoose.model('Contacts', contactsSchema, 'contacts')