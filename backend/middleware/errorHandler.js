// Centralized Express error handler so every thrown error receives a consistent response shape.
const errorHandler = (err, _req, res, _next) => {
  console.error('API Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong. Please try again later.';

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
