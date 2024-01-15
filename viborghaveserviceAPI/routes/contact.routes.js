const Contact = require( '../models/contacts.model' );

const express = require( 'express' );
const formData = require( 'express-form-data' );   

const router = express.Router();
router.use( formData.parse() );             




// ----- HENT/GET ONE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "Contact - GET/hent" );

    try {
        const contact = await Contact.findOne();
        res.status(200).json( contact );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); 
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------- 

router.put( '/admin', async ( req, res ) => {

    console.log( "Contact PUT/ret" )

    try {

        let contact = await Contact.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", contact: contact } );


    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", contact: null } ); 
    }

} );

module.exports = router;