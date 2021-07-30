const express = require('express');
const passport = require('passport');
const path = require('path');
const googleRoutes = require('./routes/google');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'));
});

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession = require('express-session');

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '651787270824-o51k7n3t3dsjtvet9qo67jruu5n4c132.apps.googleusercontent.com',
            clientSecret: 'hZKU8dPFcQdIFyY28fpOz5_V',
            callbackURL: '/google',
        },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, profile);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: '222926386362423',
            clientSecret: '0417ff8ada8724f5fc6f718ffeaec57a',
            callbackURL: '/facebook',
        },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(
    expressSession({
        secret: 'abc',
        resave: true,
        saveUninitialized: true,
    })
);

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleRoutes);
// //Unprotected Route / HOME PAGE
// app.get('/', (req, res) => {
//     // console.log('heleloele', JSON.stringify(req));

//     res.send(
//         req.user
//             ? req.user
//             : `not Logged in <a href="/login/google" >GOOGLE </a> or <a href="/login/facebook" >FACEBOOK </a>`
//     );
// });

// app.get(
//     '/login/google',
//     passport.authenticate('google', { scope: ['profile'] })
// );
// app.get(
//     '/login/facebook',
//     passport.authenticate('facebook', { scope: ['profile'] })
// );

// app.get('/google', passport.authenticate('google'), (req, res) => {
//     res.redirect('/profile');
// });

// app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
//     res.redirect('/profile');
// });

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

// // Middleware - Check user is Logged in
// const checkUserLoggedIn = (req, res, next) => {
//     req.user ? next() : res.sendStatus(401);
// };

// //Protected Route.
// app.get('/profile', checkUserLoggedIn, (req, res) => {
//     res.send(
//         `<h1>${req.user.displayName}'s Profile Page</h1><a href="/logout">Logout</a>`
//     );
// });

app.listen(5000, () => {
    console.log(`Server Running on PORT ${port}`);
});
