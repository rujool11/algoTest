const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(400);
    next(error);
}

// notFound -> will throw error when urls above it in server.js are not found

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

// standard error handling middleware

export { notFound, errorHandler };