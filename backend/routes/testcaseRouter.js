import express from 'express'
import { verifyDeletePassword, verifySubmitPassword } from '../middlewares/adminMiddleware.js';
import protect from '../middlewares/authMiddleware.js';
import createTestCasesByProblemId from '../controllers/testcases/createTestCasesByProblemId.js';
import getTestCasesByProblemId from '../controllers/testcases/getTestCasesByProblemId.js';
import deleteAllTestCasesByProblem from '../controllers/testcases/deleteAllTestCasesByProblemId.js';
import { deleteTestCasesByTestCaseId } from '../controllers/testcases/deleteTestCasesByTestCaseId.js';

const router = express.Router();

router.post('/:problemId', protect, verifySubmitPassword, createTestCasesByProblemId);
router.get('/:problemId',protect, getTestCasesByProblemId);
router.delete('/del_ind/:testCaseId', protect, verifyDeletePassword, deleteTestCasesByTestCaseId);
router.delete('/:problemId', protect, verifyDeletePassword, deleteAllTestCasesByProblem);

export default router;
