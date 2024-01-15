const Users = require( '../models/users.model' );

const express = require( 'express' );
const formData = require( 'express-form-data' );              // HVIS der bruges multer et sted så skal denne kun placeres i routes UDEN multer!!!

const router = express.Router();
router.use( formData.parse() );


// ----- HENT/GET ALLE - ADMIN -----------------------------------------------------------------------------------------

router.get( '/admin', async ( req, res ) => {

    console.log( "User - GET/Hent alle" );

    try {
        const user = await Users.find();
        res.status( 200 ).json( user );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

} );


// ----- HENT/GET UDVALGT - ADMIN ------------------------------------------------------------------------------------------------------------- 

router.get( '/admin/:id', async ( req, res ) => { //

    console.log( "Users - GET/Hent udvalgt ud fra ID" )

    try {
        const user = await Users.findById( req.params.id )
        if ( user ) res.status( 200 ).json( user );
        else res.status( 400 ).json( null );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );


// ----- OPRET/POST - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', async ( req, res ) => {

    console.log( "User - POST/opret ny" );

    try {

        let user = await Users.findOne( { email: req.body.email } )

        if ( user ) {

            console.log( "USER findes i forvejen = kan ikke oprettes igen" )
            return res.status( 401 ).json( { message: "User findes allerede (OBS - denne besked skal laves om - GDPR!)" } )

        } else {

            console.log( "USER findes IKKE i forvejen" )
            user = new Users( req.body );
            user = await user.save();
            res.status( 201 ).json( { message: "Ny user er oprettet", user: user } );
        }
    }
    catch ( error ) {
        console.log( "fejl", error )
        res.status( 500 ).json( { message: "Der er opstået en fejl", review: null } );
    }

} );



// ----- SLET/DELETE - ADMIN------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "User - DELETE/slet" )

    try {

        let slet = await Users.findByIdAndDelete( req.params.id );

        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );


// ----- RET/PUT - ADMIN------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', async ( req, res ) => {

    console.log( "User - PUT/ret" )

    try {

        let user = await Users.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        if ( user ) res.status( 200 ).json( { message: "Der er rettet!", user: user } );
        else res.status( 400 ).json( { message: "Id findes ikke", user: null } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", user: null } ); // 500 = serverproblem

    }

} );



module.exports = router;
