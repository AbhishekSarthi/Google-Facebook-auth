const express = require('express');

const passport = require('passport');
const router = express.Router();

router.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: ['profile'] })
);

router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;
