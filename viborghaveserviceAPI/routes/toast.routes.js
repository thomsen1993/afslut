const Toast = require( '../models/toast.model' );

const express = require( 'express' );
const formData = require( 'express-form-data' );              // HVIS der bruges multer et sted så skal denne kun placeres i routes UDEN multer!!!

const router = express.Router();
router.use( formData.parse() );


// ----- HENT/GET ONE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "Toast - GET/hent" );

    try {
        const toast = await Toast.findOne();

        res.status( 200 ).json( toast );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin', async ( req, res ) => {

    console.log( "Toast - PUT/ret" )

    try {

        let toast = await Toast.findOneAndUpdate( {}, req.body, { new: true } ); // req.body indeholder de data (title, content) som skal oprettes
        res.status( 200 ).json( { message: "Der er rettet!", toast: toast } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", about: null } ); // 500 = serverproblem
    }

} );






module.exports = router;