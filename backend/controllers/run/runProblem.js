import expressAsyncHandler from 'express-async-handler';
import path from "path";
import { generateFile } from "../../utils/generateFile.js";
import { execute_cpp } from "../../utils/execute_cpp.js";
import { fileURLToPath } from 'url';
import { execute_python } from "../../utils/execute_python.js";
import { unlink } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller responsible for the run functionality for a single custom input.
export const runController = expressAsyncHandler(async (req, res) => {

    const code = req.body.code;
    const lang = req.body.language;
    const customInput = req.body.customInput;

    const { filePath, outputDirectory, randomString } = generateFile(code, lang);
    let returnable;
    
    if (lang === "cpp") {
        try {
            returnable = await execute_cpp(outputDirectory, filePath, customInput, randomString);
        } catch (error) {
            returnable = { error: error.message };
        } finally {
            // delete cpp code file
            unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            
            // delete executable files
            unlink(path.join(outputDirectory, randomString), (err) => {
                if (err) {
                    console.log(err);
                } 
            });
        }
    }
    else if (lang === "py") {
        try {
            returnable = await execute_python(outputDirectory, filePath, customInput, randomString);
        } catch (error) {
            returnable = { error: error.message };
        } finally {
            // delete python code file
            unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                } 
            });
        }
    }
    else {
        returnable = {
            error: "Invalid language",
            output: "",
            time: 0,
            memory: 0
        };
    }
    
    // If the output is an object, stringify it.
    if (typeof returnable.output === 'object' && returnable.output !== null) {
        returnable.output = JSON.stringify(returnable.output);
    }
    
    res.json({
        op: returnable,
        code: code,
        lang: lang
    });
});

export default runController;
