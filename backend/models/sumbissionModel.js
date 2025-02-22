import mongoose from 'mongoose';

const submissionModel = mongoose.Schema({
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    problemName:  String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },    
    username: String,
    language: { type: String, required: true },
    code: { type: String, required: true },
    verdict: { type: String, default: 'Pending' },
    time: { type: Number },
    memory: { type: Number },   
}, {
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionModel);
export default Submission;

