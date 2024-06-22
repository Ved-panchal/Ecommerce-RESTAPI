const express = require('express');
const passport = require('../config/passport');
const authRouter = express.Router();

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/auth/google/callback', 
    passport.authenticate('google', { session: false }),
    (req, res) => {
        res.redirect(`/profile?token=${req.user.token}`);
    }
);

module.exports = authRouter;
