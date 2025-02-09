import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../../config/generateToken.js";

const Register = asyncHandler(async (req, res) => {
    const { username, email, password, picture} = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("INCOMPLETE INPUT: enter all fields");

    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (userExists) {
        res.status(400);
        throw new Error("NON-UNIQUE INPUTS: email or username already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
        picture,
    });  

    if (user) { 
        res.status(201).json({
            _id: user._id,
            username: user.username, 
            email: user.email, 
            picture: user.picture,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("SERVER ERROR: failed to create user");
    }
});

export default Register;