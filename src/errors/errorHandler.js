const ApiError = require('./ApiError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  // agar hamara ApiError hai
  if (err instanceof ApiError) {
    logger.error(`API Error: ${err.message}`, err.details);
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details || null,
    });
  }

  // unknown error / bug
  logger.error('Unexpected server error', { message: err.message, stack: err.stack });

  return res.status(500).json({
    error: 'Internal server error',
  });
}

module.exports = errorHandler;
