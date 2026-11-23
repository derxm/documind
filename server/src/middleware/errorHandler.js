export const notFoundHandler = (_req, res, _next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error('[Error]', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
