import { generateFile } from '../../utils/generateFile.js'
import { execute_cpp } from '../../utils/execute_cpp.js'
import { execute_python } from '../../utils/execute_python.js'
import fs from 'fs';
import TestCase from '../../models/testCaseModel.js';
import Submission from '../../models/submissionModel.js'
import User from '../../models/userModel.js'

const createSubmission = async (req, res) => {

    const { pid } = req.params;
    const problemId = pid;
    const problem = req.body.problem;
    const code = req.body.code;
    const lang = req.body.lang;
    const username = req.body.username;

    // verdict initially set to accepted
    let verdict = 'Accepted';
    let testcases = [];

    try {
        // create cursor for iteration and get all testcases for that problem
        const cursor = TestCase.find({ problemId }).cursor();
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            testcases.push(doc); 
        }
    } catch (error) {
        return res.status(500).json({ error: "SERVER ERROR: error in fetching testcases" });
    }

    const { filePath, outputDirectory, randomString } = generateFile(code, lang);
    let totalTime = 0;

    for (const testcase of testcases) {
        const customInput = testcase.input;
        const requiredOutput = testcase.output;

        let op = {};

        switch(lang) {
            case 'cpp':
                try {
                    op = await execute_cpp(outputDirectory, filePath, customInput, randomString);
                } catch (error) {
                    op.error = { message: error.message };
                }
                break;

            case 'py':
                try {
                    op = await execute_python(outputDirectory, filePath, customInput, randomString);
                } catch (error) {
                    op.error = { message: error.message };
                }
                break;
            
            default: 
                return res.status(400).json({ error: "INVALID LANGUAGE" });
        }

        if (typeof op.output === 'object' && op.output !== null) {
            op.output = JSON.stringify(op.output);
        }

        if (op.time > 5000) {
            verdict = "TLE";
            break;
        }
        else if (op.error && op.error.message.match("COMPILATION ERROR") !== null) {
            verdict = "Compilation Error";
            break;
        }
        else if (op.error && op.error.message.match("RUNTIME ERROR") !== null) {
            verdict = "Runtime Error";
            break;
        }

        // Trim and split outputs into lines for line-by-line comparison.
        let opLines = op.output.endsWith('\n') ? op.output.slice(0, -1).split('\n') : op.output.split('\n');
        let requiredLines = requiredOutput.endsWith('\n') ? requiredOutput.slice(0, -1).split('\n') : requiredOutput.split('\n');

        let isMatch = opLines.length === requiredLines.length &&
                      opLines.every((val, index) => val.trim() === requiredLines[index].trim());
                   
        if (!isMatch) {
            verdict = "Wrong Answer";
            break;
        }

        totalTime += op.time;
    }

    // delete temporary files if they exist
    switch(lang) {
        case 'py':
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error(err);
                });
            }
            break;
        case 'cpp':
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error(err);
                });
            }
            const compiledFilePath = outputDirectory + '/' + randomString;
            if (fs.existsSync(compiledFilePath)) {
                fs.unlink(compiledFilePath, (err) => {
                    if (err) console.error(err);
                });
            }
            break;
        default:
            return res.status(400).json({ error: 'INVALID LANGUAGE' });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    const submission = new Submission({
        username: username,
        user: user._id,
        problem: problemId,
        problemName: problem.name,
        language: lang,
        code: code,
        time: totalTime,
        verdict: verdict
    });

    try {
        await submission.save();
        res.status(201).json(submission);
    } catch {
        res.status(500).json({ error: "SERVER ERROR: failed to save" });
    }
};

export default createSubmission;
