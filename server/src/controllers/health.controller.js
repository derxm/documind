export const getHealthStatus = (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'DocuMind AI API',
    timestamp: new Date().toISOString(),
  });
};
