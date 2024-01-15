//var fs = require('file-system');
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    image: {
        type: String
    },
    service: { 
        type: mongoose.Schema.ObjectId, ref: 'Services' 
    }
})

// Ej testet - skal fjerne billeder ved ret og slet
// servicesSchema.pre('remove', async function () {
//     fs.unlink('./public/images/' + this.coverbillede.filnavn, () => { })
// })

// servicesSchema.pre('save', async function () {
//     // fs.unlink('./public/images/' + this.coverbillede.filnavn, () => { })
//     console.log("pre save filnavn:", this.coverbillede.filnavn);
// })

module.exports = mongoose.model('GalleryItem', galleryItemSchema, 'galleryitems');