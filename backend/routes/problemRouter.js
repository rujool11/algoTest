import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import getAllProblems from '../controllers/problems/getAllProblems.js';
import submitProblem from '../controllers/problems/submitProblem.js';
import deleteProblemById from '../controllers/problems/deleteProblemById.js';
import getProblemById from '../controllers/problems/getProblemById.js'; 
import deleteAllProblems from '../controllers/problems/deleteAllProblems.js';
import { verifySubmitPassword, verifyDeletePassword } from '../middlewares/adminMiddleware.js';
import searchProblems from '../controllers/problems/searchProblems.js';

const router = express.Router();


router.get('/search', protect, searchProblems);
router.delete('/all', protect, verifyDeletePassword, deleteAllProblems);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', protect, verifySubmitPassword, submitProblem);
router.delete('/:id', protect, verifyDeletePassword, deleteProblemById);

export default router;