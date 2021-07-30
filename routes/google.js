const express = require('express');

const passport = require('passport');
const router = express.Router();

// Unprotected Route / HOME PAGE
router.get('/', (req, res) => {
    // console.log('heleloele', JSON.stringify(req));

    res.send(
        req.user
            ? req.user
            : `not Logged in <a href="/login/google" >GOOGLE </a> or <a href="/login/facebook" >FACEBOOK </a>`
    );
});

router.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);
router.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: ['profile'] })
);

router.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
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

module.exports = router;
