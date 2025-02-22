import mongoose from "mongoose";

const testCaseModel = mongoose.Schema({
    problemId: { type: mongoose.Schema.ObjectId,ref: 'Problem', required: true },
    input: { type: String, required: true },
    output: { type: String, required: true },
});

const TestCase = mongoose.model('TestCase', testCaseModel);
export default TestCase;