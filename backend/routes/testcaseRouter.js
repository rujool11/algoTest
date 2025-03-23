import express from 'express'
import { verifySubmitPassword } from '../middlewares/adminMiddleware.js';
import protect from '../middlewares/authMiddleware.js';
import createTestCasesByProblemId from '../controllers/testcases/createTestCasesByProblemId.js';
import getTestCasesByProblemId from '../controllers/testcases/getTestCasesByProblemId.js';

const router = express.Router();

router.post('/:problemId', protect, verifySubmitPassword, createTestCasesByProblemId);
router.get('/:problemId',protect, getTestCasesByProblemId);

export default router;
