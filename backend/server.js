import { config } from 'dotenv';
import express from 'express';
import { connectDB } from './config/database.js';
import problemRouter from './routes/problemRouter.js';
import submissionRouter from './routes/submissionRouter.js';
import testcaseRouter from './routes/testcaseRouter.js';
import userRouter from './routes/userRouter.js';
import runRouter from './routes/runRouter.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cors from "cors";


// load .env
config();

// start express app
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Apply CORS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use('/api/run', runRouter);
app.use('/api/problem', problemRouter);
app.use('/api/submissions', submissionRouter);
app.use('/api/testcase', testcaseRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {   
    res.send('API is running');
});

app.use(notFound);
app.use(errorHandler);



// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
