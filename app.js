const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const authRouter = require('./routes/authRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/database');

const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(authRouter);

app.use("/api/v1",productRouter)
app.use("/api/v1",cartRouter)
app.use("/api/v1",userRouter)

module.exports = app;
