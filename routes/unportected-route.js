const express = require('express');

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

module.exports = router;
