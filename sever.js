const express = require('express');
const passport = require('passport');
// require('./auth.js');
const app = express();

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
            console.log(profile);
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
            console.log(profile);
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

//Unprotected Route / HOME PAGE
app.get('/', (req, res) => {
    // console.log('heleloele', JSON.stringify(req));

    res.send(
        req.user
            ? req.user
            : `not Logged in <a href="/login/google" >GOOGLE </a> or <a href="/login/facebook" >FACEBOOK </a>`
    );
    // res.send(req.user);
});

app.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);
app.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: ['profile'] })
);

app.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

//Protected Route.
app.get('/profile', checkUserLoggedIn, (req, res) => {
    res.send(
        `<h1>${req.user.displayName}'s Profile Page</h1><a href="/logout">Logout</a>`
    );
});

// app.get('/', (req, res) => {
//     res.send('<a href="/auth/google">Authenticate Google</a>');
// });

// app.get('/failed', (req, res) => {
//     res.send('<h1>Log in Failed :(</h1>');
// });

// app.get(
//     '/auth/google',
//     passport.authenticate('google', { scope: ['profile'] })
// );

// // app.get(
// //     '/auth/google/callback',
// //     passport.authenticate('google', {
// //         successRedirect: '/home',
// //         failureRedirect: '/',
// //     }),
// //     function (req, res) {
// //         // Successful authentication, redirect home.
// //         res.redirect('/home');
// //     }
// // );
// app.get(
//     '/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/failed' }),
//     (req, res) => {
//         res.redirect('/home');
//     }
// );

app.listen(5000, () => {
    console.log('Server Running on PORT:5000');
});
