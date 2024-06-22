import express from 'express';
import passport from '../config/passport.js';

const authRouter = express.Router();

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/auth/google/callback', 
    passport.authenticate('google', { session: false }),
    (req, res) => {
        res.redirect(`/profile?token=${req.user.token}`);
    }
);

export default authRouter;
