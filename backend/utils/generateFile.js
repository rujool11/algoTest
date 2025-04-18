import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 }  from 'uuid';
import { fileURLToPath } from 'url';

// creates file with received code, 
// returns -->
// filePath : full path to generated file
// outputDirectory : directory path for output files 
// randomString : unique id used in file name, ensure file names aer unique

const __filename = fileURLToPath(import.meta.url); // absolute path of current file
const __dirname = path.dirname(__filename); // current directory path 

// directories for code, output, and input
const codeDirectory = path.join(__dirname, '../data/code');
const outputDirectory = path.join(__dirname, '../data/output');
const inputDirectory = path.join(__dirname, '../data/input');

// make directory if doesnt exist already, recursive: true builds any parent directories also
if (!fs.existsSync(codeDirectory)) {
    fs.mkdirSync(codeDirectory, {recursive : true});
}

// make outputDirectory if it does not exist
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

// make inputDirectory if it does not exist
if (!fs.existsSync(inputDirectory)) {
    fs.mkdirSync(inputDirectory, { recursive: true });
}
export const generateFile = (code, lang) => {

    let randomString = uuidv4(); // add unique uuid

    randomString = randomString.replace(/-/g, '_'); // replace - with _ (for valid filenames)
    let fileName = `${randomString}.${lang}`;

    const filePath = path.join(codeDirectory, fileName); // filePath of file to create

    fs.writeFileSync(filePath, code); // create file with filePath and code
    return { filePath, outputDirectory, randomString };
}
