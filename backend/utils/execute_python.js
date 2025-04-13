import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// executes the Python process using the provided input file
const runProcess = async (returnable, outputDirectory, randomString, inputFilePath) =>
  new Promise((resolve, reject) => {
    const start = new Date();

    try {
      const command = `cd ${outputDirectory} && cd .. && cd code && python "${randomString}.py" < "${inputFilePath}"`;

      exec(command, (err, stdout, stderr) => {
        const end = new Date();
        returnable.time = end - start;

        // Check if process exited with an error
        if (err) {
          returnable.error.message = stderr || err.message;
          return reject(new Error(returnable.error.message));
        }

        // Log any non-fatal warnings from stderr.
        if (stderr) {
          console.warn("Warning in stderr (not fatal):", stderr);
        }

        returnable.output += stdout;
        resolve(returnable);
      });
    } catch (error) {
      returnable.error.message = error.message;
      reject(error);
    }
  });

export const execute_python = async (outputDirectory, filePath, customInput, randomString) => {
  let returnable = {
    error: { message: '' },
    output: '',
    time: 0,
  };

  // create temp input file
  const inputFilePath = join(__dirname, '..', 'data', 'input', `${randomString}.txt`);

  // synchronously write to input file
  try {
    writeFileSync(inputFilePath, customInput);
  } catch (err) {
    console.error("FAILED TO WRITE INPUT FILE", err);
    returnable.error.message = "FAILED TO WRITE INPUT FILE";
    return returnable;
  }

//   // check if the file exists immediately after writing.
//   if (!fs.existsSync(inputFilePath)) {
//     console.debug("Input file missing just before execution.");
//   }

  try {
    returnable = await Promise.race([
      runProcess(returnable, outputDirectory, randomString, inputFilePath),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("RUNTIME TLE")), 5000)
      )
    ]);
  } catch (error) {
    returnable.error.message = "RUNTIME ERROR: " + error.message;
    returnable.time = 5000;
  } finally {
    // synchronously remove the temporary input file to avoid race conditions
    try {
      if (fs.existsSync(inputFilePath)) {
        fs.unlinkSync(inputFilePath);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error("Failed to delete input file:", err);
      }
    }
  }

  return returnable;
};
