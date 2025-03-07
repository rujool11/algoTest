import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import getAllProblems from '../controllers/problems/getAllProblems.js';
import submitProblem from '../controllers/problems/submitProblem.js';
import getProblemById from '../controllers/problems/getProblemById.js'; 
const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', protect, submitProblem);

export default router;