const AboutUs = require( '../models/aboutus.model' );

const express = require( 'express' );
const formData = require( 'express-form-data' );             

const router = express.Router();
router.use( formData.parse() );                     



// ----- HENT/GET ONE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "About - GET/hent" );

    try {
        const aboutUs = await AboutUs.findOne();

        res.status(200).json( aboutUs );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------- 

router.put( '/admin', async ( req, res ) => {

    console.log( "About - PUT/ret" )

    try {

        let about = await AboutUs.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", about: about } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", about: null } ); 
    }

} );



module.exports = router;