module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Unknown Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(`[${req.method}] ${req.originalUrl} -> ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
