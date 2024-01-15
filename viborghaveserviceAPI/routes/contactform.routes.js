const Contactform = require('../models/contactform.model');

const express = require('express');
const formData = require('express-form-data');             

const router = express.Router();
router.use(formData.parse());                             



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("Contactform - GET/hent alle");

    try {
        const contactform = await Contactform.find();

        res.status(200).json(contactform);

    } catch (err) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); 
    }

});



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', async (req, res) => { //

    console.log("Contactform - GET/hent udvalgt ud fra ID")

    try {
        const contact = await Contactform.findById( req.params.id )
        if ( contact ) res.status( 200 ).json( contact );
        else res.status( 400 ).json( null );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

});



// ----- OPRET/POST - IKKE ADMIN ---------------------------------------------------------------------------------------

router.post('/', async (req, res) => {

    console.log("Contactform - POST/opret ny");

    
    try {
        let contact = new Contactform(req.body);
        contact = await contact.save();
        res.status(201).json({ message: "Ny er oprettet", contactform: contact });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", contactform: null } );
    }

});



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------- 

router.delete('/admin/:id', async (req, res) => {

    console.log("Contactform - DELETE/slet")

    try {

        let slet = await Contactform.findByIdAndRemove(req.params.id);
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

});

module.exports = router;