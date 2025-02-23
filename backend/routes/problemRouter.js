import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import getAllProblems from '../controllers/problems/getAllProblems.js';
import submitProblem from '../controllers/problems/submitProblem.js';
const router = express.Router();

router.get('/', getAllProblems);
router.post('/', protect, submitProblem);

export default router;