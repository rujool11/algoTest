import express from 'express'
import Register from '../controllers/users/Register.js';
import Login from '../controllers/users/Login.js';
import Logout from '../controllers/users/Logout.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);


export default router;