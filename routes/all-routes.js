const express = require('express');

const router = express.Router();

// Google Routes
router.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

// Facebook Routes
router.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: ['profile'] })
);

router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

// Unprotected Route / HOME PAGE
router.get('/', (req, res) => {
    res.send(
        req.user
            ? req.user
            : `not Logged in <a href="/login/google" >GOOGLE </a> or <a href="/login/facebook" >FACEBOOK </a>`
    );
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};
//Protected Route.
router.get('/profile', checkUserLoggedIn, (req, res) => {
    res.send(
        `<h1>${req.user.displayName}'s Profile Page</h1><a href="/logout">Logout</a>`
    );
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
