import expressAsyncHandler from "express-async-handler";
import Problem from "../../models/problemModel.js";

// GET /api/problems/search?search=keyword
const searchProblems = expressAsyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const problems = await Problem.find(keyword);

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR: " + error.message });
  }
});

export default searchProblems;
