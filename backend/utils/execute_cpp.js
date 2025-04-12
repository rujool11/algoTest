import { exec } from 'child_process';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// run the created executable file and resolve returnable according to 
// time and output data
const runProcess = async (returnable, outputDirectory, randomString, inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        const start = new Date();

        try {
            const proc = exec(
                `cd ${outputDirectory} && ./${randomString} < ${inputFilePath}`,
                (err, stdout, stderr) => {
                    // system level error handling
                    if (err) {
                        returnable.error.message = err.message || String(err);
                        return reject(err);
                    }

                    // runtime error handling
                    if (stderr) {
                        returnable.error.message = stderr;
                        return reject(new Error(stderr));
                    }

                    // success: update returnable
                    returnable.output += stdout;
                    const end = new Date();
                    returnable.time = end - start;

                    return resolve(returnable);
                }
            );
        } catch (error) {
            console.error(error);
            returnable.error.message = error.message || String(error);
            reject(error);
        }
    });
};


// execute cpp file
// compile file and place in outputDirectory 
// runProcess for execution, and resolve returnable 
export const execute_cpp = async (outputDirectory, filePath, customInput, randomString) => {
    let returnable = {
        error: { message: '' },
        output: '',
        time: 0
    };

    return new Promise((resolve, reject) => {
        // compile the c++ file and place the executable named randomString in outputDirectory
        const compilationProcess = exec(
            `g++ ${filePath} -o ${outputDirectory}/${randomString}`, 
            (err, stdout, stderr) => {
                if (err) {
                    console.log("Compilation Error : " + err);
                    returnable.error.message += "COMPILATION ERROR : " + err;
                }
                if (stderr) {
                    console.log("Compilation Error : " + stderr);
                    returnable.error.message += "COMPILATION ERROR : " + stderr;
                }    
            }
        );

        // returns when compilation process finished
        compilationProcess.on('close', async (code) => {
            // if exit code 0, compilation successful
            if (code == 0) {
                console.log("Compilation Done");
                // file placed in ../data/inputs folder with the name <randomString>.txt
                const inputFilePath = join(__dirname, '..', 'data', 'inputs', `${randomString}.txt`);
                fs.writeFile(inputFilePath, customInput, (err) => {
                    if (!err) {
                        console.log('input file written succesfully');
                    } else {
                        console.log("Error in writing file inside compilation process cpp");
                        console.error(err);
                    }
                });
                // outputFilePath points to compiled executable file
                const outputFilePath = join(outputDirectory, `${randomString}`);
                try {
                    returnable = await Promise.race([
                        runProcess(returnable, outputDirectory, randomString, inputFilePath, outputFilePath),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('RUNTIME TLE')), 3000))
                    ]);
                } catch (error) {
                    console.log("Runtime Error : " + error);
                    returnable.error.message = "RUNTIME ERROR : " + error;
                    returnable.time = 3000;
                } finally {
                    // delete inputFile
                    fs.unlink(inputFilePath, (err) => {
                        if (!err) {
                            console.log("input file deleted succesfuuly");
                        } else {
                            console.log("error in deleting input file .txt");
                            console.log(err);
                        }
                    });
                }
            }
            // resolve promise with the returnable object
            resolve(returnable);
        });
    });
};
