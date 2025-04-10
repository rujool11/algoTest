import express from 'express'
import runProblem from '../controllers/run/runProblem.js';


const router = express.Router();

router.post('/', runProblem);

export default router;