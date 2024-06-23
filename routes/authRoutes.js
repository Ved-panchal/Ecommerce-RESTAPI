import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const authRouter = express.Router();

// Middleware to parse cookies
authRouter.use(cookieParser());

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/auth/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { token, id } = req.user;

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
    res.cookie('userId', id.toString(), { httpOnly: false, secure: true, sameSite: 'strict', path: '/' });
    res.cookie('userName', req.user.name.toString(), { httpOnly: false, secure: true, sameSite: 'strict', path: '/' });

    res.redirect('http://localhost:5173');
  }
);

authRouter.post('/auth/google', async (req, res) => {
  // Get the token from the cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (user) {
      const authToken = createJWT({ id: user._id, googleId: user.googleId });
      res.json({
        token: authToken,
        userInfo: {
          _id: user._id,
          name: user.displayName,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
});

export default authRouter;
