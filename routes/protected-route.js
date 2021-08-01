const express = require('express');

const router = express.Router();

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
