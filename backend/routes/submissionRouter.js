import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import createSubmission from '../controllers/submissions/createSubmission.js';
import getSubmissionsByUser from '../controllers/submissions/getSubmissionsByUser.js';
import getSubmissionsByUserByProblem from '../controllers/submissions/getSubmissionsByUserByProblem.js';
import deleteSubmission from '../controllers/submissions/deleteSubmission.js';

const router = express.Router();

router.post('/submit/:pid', protect, createSubmission);
router.get('/user/:uid/problem/:pid', getSubmissionsByUserByProblem);
router.get('/user/:uid', getSubmissionsByUser);
router.delete('/delete/:sid', deleteSubmission)

export default router;
