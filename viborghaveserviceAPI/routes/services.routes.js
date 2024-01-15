const Services = require( '../models/services.model' );

const express = require( 'express' );
const router = express.Router();


const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images' );
        },
        filename: function ( req, file, cb ) {
            cb( null, Date.now() + '-' + file.originalname )
            //cb(null, file.originalname)
        }
    } )
} );


// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "Services - GET/hent alle" );

    try {
        // Kan modtage et tal (limit/begræns antal)
        let limit;
        if ( req.query.limit && !isNaN( parseInt( req.query.limit ) ) ) limit = parseInt( req.query.limit );

        console.log( limit )

        const services = await Services.find().limit( limit );//.populate('galleryitems');
        res.status( 200 ).json( services );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );

// ----- HENT/GET SØGNING ------------------------------------------------------------------------------------------
// Denne route skal ligge FØR HENT UDVALGT da "soeg" ellers bliver opfattet som :id-parameter

router.get( '/soeg/:soegeord', async ( req, res ) => {

    console.log( "Services - GET/søgning", req.params.soegeord );

    try {
        const services = await Services.find( {
            $or: [
                // søg i title og content -  små bogstaver/i
                { "title": { "$regex": req.params.soegeord, "$options": "i" } },
                { "content": { "$regex": req.params.soegeord, "$options": "i" } },
            ]
        } );
        res.status( 200 ).json( services );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} );



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', async ( req, res ) => { //

    console.log( "Services - GET/Hent udvalgt ud fra ID" )

    try {
        const service = await Services.findById( req.params.id )
        if ( service ) res.status( 200 ).json( service );
        else res.status( 400 ).json( null );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }


} );




// ----- OPRET/POST - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "Services - POST/opret ny" );

    try {

        let service = new Services( req.body );
        service.image = req.file ? req.file.filename : "paavej.jpg"; // filename kommer ikke automatisk med i request
        service = await service.save();

        res.status( 201 ).json( { message: "Ny er oprettet", service: service } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", service: null } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "Services - DELETE/slet" )

    try {

        let slet = await Services.findByIdAndDelete( req.params.id );
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

} );

// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', upload.single( 'image' ), async ( req, res ) => {

    console.log( "Services - PUT/ret" )

    try {

        if ( req.file ) {
            req.body.image = req.file.filename;
        }

        let service = await Services.findByIdAndUpdate(req.params.id , req.body, { new: true } )

        if ( service ) res.status( 200 ).json( { message: 'Der er rettet', service: service } );
        else res.status( 400 ).json( { message: 'Id findes ikke', service: null } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", service: null } ); // 500 = serverproblem
    }

} );


module.exports = router;