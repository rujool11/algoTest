import asyncHandler from "express-async-handler";

export const verifySubmitPassword = asyncHandler((req, res, next) => {
  const providedPassword = req.body.password;
  if (providedPassword !== process.env.SUBMIT_PROBLEM_PASSWORD) {
    res.status(401);
    throw new Error("UNAUTHORIZED: Invalid submission password");
  }
  next();
});


export const verifyDeletePassword = asyncHandler((req, res, next) => {
    const providedPassword = req.headers["x-delete-password"];
    if (providedPassword !== process.env.DELETE_PROBLEM_PASSWORD) {
      res.status(401);
      throw new Error("UNAUTHORIZED: Invalid deletion password");
    }
    next();
  });
