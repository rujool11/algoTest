import express from 'express'
import { verifySubmitPassword } from '../middlewares/adminMiddleware.js';
import protect from '../middlewares/authMiddleware.js';
import createTestCasesByProblemId from '../controllers/testcases/createTestCasesByProblemId.js';

const router = express.Router();

router.post('/:problemId', protect, verifySubmitPassword, createTestCasesByProblemId);

export default router;
