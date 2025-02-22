import mongoose from 'mongoose';

const problemModel = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    sampleInput: { type: String, required: true },
    sampleOutput: { type: String, required: true },
    difficulty: { type: String },
});

const Problem = mongoose.model('Problem', problemModel);
export default Problem;