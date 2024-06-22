import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createJWT } from '../utils/tokenUtils.js';
import UserModel from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
            user = new UserModel({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }

        const token = createJWT({ id: user._id, googleId: user.googleId });
        return done(null, { token });
    } catch (error) {
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.token);
});

passport.deserializeUser((token, done) => {
    done(null, { token });
});

export default passport;
