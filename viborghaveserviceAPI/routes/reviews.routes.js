const Review = require( '../models/reviews.model' );

const express = require( 'express' );
const formData = require( 'express-form-data' );              // HVIS der bruges multer et sted så skal denne kun placeres i routes UDEN multer!!!

const router = express.Router();
router.use( formData.parse() );



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "Reviews - GET/hent alle" );

    try {
        const review = await Review.find();
        res.status( 200 ).json( review );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );


// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', async ( req, res ) => { //

    console.log( "Reviews - GET/Hent udvalgt ud fra ID" )


    try {
        const review = await Review.findById( req.params.id )
        if ( review ) res.status( 200 ).json( review );
        else res.status( 400 ).json( null );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );


// ----- OPRET/POST - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', async ( req, res ) => {

    console.log( "Reviews - POST/opret ny" );


    try {
        let review = new Review( req.body );
        review = await review.save();
        res.status( 201 ).json( { message: "Ny er oprettet", review: review } );

    } catch ( error ) {
        console.log( "fejl", error )
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "Reviews - DELETE/slet" )

    try {

        let slet = await Review.findByIdAndDelete( req.params.id ); 

        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); 
    }

} );

// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', async ( req, res ) => {

    console.log( "Reviews - PUT/ret" )

    try {

        let review = await Review.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        if ( review ) res.status( 200 ).json( { message: "Der er rettet!", review: review } );
        else res.status( 400 ).json( { message: "Id findes ikke", review: null } );


    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", review: null } ); // 500 = serverproblem
    }

} );

module.exports = router;