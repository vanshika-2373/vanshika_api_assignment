const express = require('express');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./errors/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser (if needed later)
app.use(express.json());

// Simple health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Our main routes
app.use('/posts', postRoutes);

// Error handler (always LAST)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
