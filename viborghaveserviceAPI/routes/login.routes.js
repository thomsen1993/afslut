const User = require('../models/users.model');

const express = require( 'express' );
const formData = require( 'express-form-data' );              // HVIS der bruges multer et sted så skal denne kun placeres i routes UDEN multer!!!

const router = express.Router();
router.use( formData.parse() );



// ----- LOGIN (tilføj session hvis match) ---------------------------------------------------------------------------------

router.post('/', async (req, res) => {

    console.log("LOGIN");

    try {

        const { email, password } = req.body;
        console.log(email, password)

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "User findes ikke ud fra email" })
        }


        user.comparePassword(password, function (err, isMatch) {

            if (err) throw err;
            console.log('Password: ', isMatch);

            if (isMatch) {

                req.session.userId = user._id 
                res.json({ email: user.email, brugerID: user._id });

            } else {
                // slet cookie - så en evt. tidligere succes bliver slettet når man forsøger at logge ind med forkert
                res.status(401).clearCookie(process.env.SESSION_NAME).json({ message: "Password matcher ikke user" });
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 = serverproblem
    }

});


// ----- LOGUD (destroy session) -------------------------------------------------------------------------------------------- 

router.get('/logout', async (req, res) => {

    console.log("LOGOUT")

    req.session.destroy(err => {

        if (err) return res.status(500).json({ message: 'Logud lykkedes ikke - prøv igen' }) // hvis fejl/ikke kan destroy så send til ???

        res.clearCookie(process.env.SESSION_NAME).json({ message: 'cookie slettet' });

    })

});



// ----- LOGGET IND? true eller false --------------------------------------------------------------------------------------- 

router.get('/loggedin', async (req, res) => {

    console.log("LOGGED IN?")

    if (req.session.userId) {

        return res.status(200).json({ message: 'Login er stadig aktiv', login: true }) 

    } else {
        return res.status(401).json({ message: 'Login eksisterer ikke eller er udløbet', login: null })
    }

})


module.exports = router;