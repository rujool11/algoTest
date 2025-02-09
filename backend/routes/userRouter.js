import express from 'express'
import Register from '../controllers/users/Register.js';
import Login from '../controllers/users/Login.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);


export default router;