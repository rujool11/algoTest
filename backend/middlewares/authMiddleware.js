import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

const protect = expressAsyncHandler( async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // token fork Bearer token_value, so split
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // add user field to request
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('AUTH FAILURE: token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('AUTH FAILURE: no token found');
    }
})

export default protect;