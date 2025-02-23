import Problem from '../../models/problemModel.js';
import asyncHandler from 'express-async-handler';

const submitProblem = asyncHandler(async (req, res) => {
    const { name, description, sampleInput, sampleOutput, difficulty } = req.body;

    if (!name || !description || !sampleInput || !sampleOutput || !difficulty) {   
        res.status(400);
        throw new Error("MISSING INPUTS: please fill out all fields");
    }

    const problemExists = await Problem.findOne({
        $or: [{ name }]
    });

    if (problemExists) {
        res.status(400);
        throw new Error("NON-UNIQUE INPUTS: problem title already exists");
    }

    const problem = await Problem.create({
        name,
        description,
        sampleInput,
        sampleOutput,
        difficulty,
    });  

    if (problem) { 
        res.status(201).json({
            _id: problem._id,
            name: problem.name, 
            description: problem.description, 
            sampleInput: problem.sampleOutput,
            difficulty: problem.difficulty,
        })
    } else {
        res.status(400);
        throw new Error("SERVER ERROR: failed to create problem");
    }
}); 


export default submitProblem;