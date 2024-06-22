import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(authRouter);

app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", userRouter);

export default app;
