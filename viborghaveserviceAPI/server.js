const express = require( 'express' );
require( 'dotenv' ).config(); // KUN TIL DEV/test lokalt - 
const cors = require( 'cors' );


const app = express();
const PORT = process.env.PORT;


// Mongoose og DB ---------------------------------------------------
const mongoose = require( 'mongoose' );

mongoose.connect( process.env.DATABASE_URL_NYERENODEJS, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;
db.on( 'error', ( error ) => console.error( error ) );
db.once( 'open', () => console.log( "Connected to database " ) );


// APP ----------------------------------------------------------------
app.use( cors( { credentials: true, origin: true } ) );
app.use( express.static( 'public' ) )
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
// SESSION --------------------------------------------------------------

const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )

const TWO_DAYS = 1000 * 60 * 60 * 60 * 24 * 2;

app.use( session( {

    name: process.env.SESSION_NAME,
    resave: true,
    rolling: false,
    saveUninitialized: false, // 
    store: MongoStore.create( { mongoUrl: process.env.DATABASE_URL_NYERENODEJS } ),
    //store: MongoStore.create( { mongoUrl: process.env.DB_URL_EXT } ),
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: TWO_DAYS,
        sameSite: 'strict', // 'none' 'lax'
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // vigtigt - session-cookie som ikke kan manipuleres med javascript
    }

} ) );

// HEROKU 
//app.set('trust proxy', 1); // trust first proxy


// ROUTES ----------------------------------------------------------

//  INDEX
app.get( '/', async ( req, res ) => {
    console.log( "HEJ og velkommen til Viborg Haveservices server" )
} );

// ----- TJEK OM AUTHORIZED hvis route indeholder ordet admin
// UDKOMMENTER DENNE - hvis login skal slås fra
// app.use( '*/admin*', async ( req, res, next ) => {


//     if ( req.session && req.session.userId ) {
//         console.log("LOGIN GODKENDT")
//         return next()
//     } else {
//         console.log( "LOGIN AFVIST" )
//         res.status( 401 ).json( { message: 'Du har ikke adgang...' } )
//         return res.set("Connection", "close");
//     }

// } )


//  ROUTES -------------------------------------------
app.use( '/aboutus', require( './routes/aboutus.routes' ) );
app.use( '/contacts', require( './routes/contact.routes' ) );
app.use( '/reviews', require( './routes/reviews.routes' ) );
app.use( '/services', require( './routes/services.routes' ) );
app.use( '/galleryitems', require( './routes/galleryitems.routes' ) );
app.use( '/toast', require( './routes/toast.routes' ) );
app.use( '/contactform', require( './routes/contactform.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );
app.use( '/users', require( './routes/users.routes' ) );



// LISTEN --------------------------------------------------------------------------------------------------
app.listen( PORT, () => console.log( 'server startet - lytter med store ører ʕʘ̅͜ʘ̅ʔ på port ' + PORT ) );
