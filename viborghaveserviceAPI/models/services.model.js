//var fs = require('file-system');
const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
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

module.exports = mongoose.model('Services', servicesSchema, 'services');