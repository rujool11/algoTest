import express from 'express'
import { verifyDeletePassword, verifySubmitPassword } from '../middlewares/adminMiddleware.js';
import protect from '../middlewares/authMiddleware.js';
import createTestCasesByProblemId from '../controllers/testcases/createTestCasesByProblemId.js';
import getTestCasesByProblemId from '../controllers/testcases/getTestCasesByProblemId.js';
import deleteAllTestCasesByProblem from '../controllers/testcases/deleteAllTestCasesByProblemId.js';

const router = express.Router();

router.post('/:problemId', protect, verifySubmitPassword, createTestCasesByProblemId);
router.get('/:problemId',protect, getTestCasesByProblemId);
router.delete('/:problemId', protect, verifyDeletePassword, deleteAllTestCasesByProblem);

export default router;
