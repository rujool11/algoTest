import expressAsyncHandler from "express-async-handler";
import Problem from "../../models/problemModel.js";

const deleteAllProblems = expressAsyncHandler(async (req, res) => {
    try {
        await Problem.deleteMany({});
        res.status(200);
        res.json({ message: "All problems removed" });
    }
    catch (error) {
        res.status(500);
        throw new Error("SERVER ERROR: " + error.message);
    }
})

export default deleteAllProblems;