import { exec } from 'child_process';
import { writeFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// actual process execution 
// execute run command while providing input from inputFilePath
const runProcess = async(returnable, outputDirectory, randomString, inputFilePath) => new Promise((resolve, reject) => {
    const start = new Date();
    try {
        // .. from output directory, so ../data/code, and supply input from inputFilePath as stdin
        const proc = exec(`cd ${outputDirectory} && cd .. && cd code && python ${randomString}.py < ${inputFilePath}`, (err, stdout, stderr) => {
            // system level error handling
            if (err) {
                returnable.error.message = err;
                reject(err);
            }
            
            // error handling for errors in executing code
            if (stderr) {
                returnable.error.message = stderr;
                reject(stderr);
            }

            // if successful execution,  add to returnable
            returnable.output += stdout;
            const end = new Date();
            returnable.time = end - start;
            resolve(returnable);

        })

    } catch (error) {
        // catch any sync errors
        returnable.error.message = error.message;
        // reject(error);
    }
});

// execute python script, 
// return object with error, output and time
export const execute_python = async(outputDirectory, filePath, customInput, randomString) => {

    let returnable = {
        error: {message: ''},
        output: '',
        time: 0,    
    } 

    // located in '../data/input, named <randomString>.txt'
    const inputFilePath = join(__dirname, '..', 'data', 'input', `${randomString}.txt`);
    
    // write customInput into inputFilePath asynchronously
    writeFile(inputFilePath, customInput, (err) => {
        if (err) {
            console.error(err);
        }
    });

    try {
        // race two promises against each other
        // returnable will be whatever the promise executes first
        // used to setTimeout of 3 seconds
        returnable = await Promise.race([
            runProcess(returnable, outputDirectory, randomString, inputFilePath),
            new Promise((_, reject) => setTimeout(() => reject(new Error("RUNTIME TLE")), 3000))
        ]);

    } catch (error) {

        returnable.error.message = "RUNTIME ERROR: " + error;
        returnable.time = 3000;

    } finally {
        // delete temporary input file
        fs.unlink(inputFilePath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

    return returnable;

}