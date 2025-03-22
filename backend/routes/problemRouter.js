import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import getAllProblems from '../controllers/problems/getAllProblems.js';
import submitProblem from '../controllers/problems/submitProblem.js';
import deleteProblemById from '../controllers/problems/deleteProblemById.js';
import getProblemById from '../controllers/problems/getProblemById.js'; 
import deleteAllProblems from '../controllers/problems/deleteAllProblems.js';
import { verifySubmitPassword } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.delete('/all', protect, deleteAllProblems);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', protect, verifySubmitPassword, submitProblem);
router.delete('/:id', protect, deleteProblemById);

export default router;