const express = require('express');

const passport = require('passport');
const router = express.Router();

router.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;
