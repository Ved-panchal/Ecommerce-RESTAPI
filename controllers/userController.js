const { UserModel } = require("../models/userModel.js");
const { createJWT } = require("../utils/tokenUtils.js");
const { hashPassword, comparePassword } = require("../utils/passwordUtils.js");

const register = async (req, res) => {
    try {
        const { email, password, ...otherDetails } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "User already registered with this email" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await UserModel.create({ ...otherDetails, email, password: hashedPassword });

        res.status(201).json({ msg: "Registered Successfully", userInfo: user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Error registering user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User is not registered" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const token = createJWT({ userId: user._id });
        res.status(200).json({ msg: "Login Successfully", userInfo: user, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Error logging in", error: error.message });
    }
};

module.exports = { login, register };
