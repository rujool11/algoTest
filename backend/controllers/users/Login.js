import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import generateToken from "../../config/generateToken.js";

const Login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        res.status(400);
        throw new Error("AUTH ERROR: Invalid email or password");
    }

    // Check if username matches
    if (user.username !== username) {
        res.status(400);
        throw new Error("AUTH ERROR: Invalid username");
    }

    // Verify password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
        res.status(400);
        throw new Error("AUTH ERROR: Invalid email or password");
    }

    // If auth is successful, return user data 
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
    });
});

export default Login;
