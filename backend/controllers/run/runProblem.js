import expressAsyncHandler from 'express-async-handler';
import path from "path";
import { generateFile } from "../../utils/generateFile.js";
import { execute_cpp } from "../../utils/execute_cpp.js";
import { fileURLToPath } from 'url';
import { execute_python } from "../../utils/execute_python.js";
import { unlink } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller responsible for running code with custom input
export const runController = expressAsyncHandler(async (req, res) => {
  const code = req.body.code;
  const lang = req.body.language;
  const customInput = req.body.customInput;

  const { filePath, outputDirectory, randomString } = generateFile(code, lang);
  let returnable = {};

  if (lang === "cpp") {
    try {
      returnable = await execute_cpp(outputDirectory, filePath, customInput, randomString);
      
      // If there is output, return it
      if (returnable.output && returnable.output.trim()) {
        returnable.error = "";  // No error
      } else {
        // If there is no output but an error is present, show it
        if (returnable.error) {
          returnable.output = "";  // Clear output in case of error
        } else {
          returnable.output = "(No output)";  // No output, no error
        }
      }
    } catch (error) {
      returnable = { error: "Compilation or runtime error" };
    } finally {
      unlink(filePath, (err) => { if (err) console.log(err); });
      unlink(path.join(outputDirectory, randomString), (err) => { if (err) console.log(err); });
    }
  } else if (lang === "py") {
    try {
      returnable = await execute_python(outputDirectory, filePath, customInput, randomString);

      // explicity set fields to avoid issues
      // If there is output, return it
      if (returnable.output && returnable.output.trim()) {
        returnable.error = "";  // No error
      } else {
        // If there is no output but an error is present, show it
        if (returnable.error) {
          returnable.output = "";  // Clear output in case of error
        } else {
          returnable.output = "(No output)";  // No output, no error
        }
      }
    } catch (error) {
      returnable = { error: "Runtime error" };
    } finally {
      unlink(filePath, (err) => { if (err) console.log(err); });
    }
  } else {
    returnable = {
      error: "Invalid language",
      output: "",
      time: 0,
      memory: 0
    };
  }

  // Only return output if it's valid and non-empty
  if (returnable.output && returnable.output.trim()) {
    res.status(200).json({
      op: returnable,
      code,
      lang
    });
  } else if (returnable.error) {
    // If there's an error, return error message
    res.status(200).json({
      op: returnable,
      code,
      lang
    });
  } else {
    // If neither output nor error, return no output
    res.status(200).json({
      op: {
        output: "(No output)",
        error: ""
      },
      code,
      lang
    });
  }
});

export default runController;
