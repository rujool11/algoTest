import expressAsyncHandler from "express-async-handler";
import Problem from "../../models/problemModel.js";

const deleteProblemById = expressAsyncHandler(async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (problem) {
            await Problem.deleteOne({ _id: req.params.id }); // Corrected deletion method
            res.status(200).json({ message: "Problem removed" });
        } else {
            res.status(404);
            throw new Error("Problem not found");
        }
    } catch (error) {
        res.status(500).json({ message: "SERVER ERROR: " + error.message });
    }
});

export default deleteProblemById;
