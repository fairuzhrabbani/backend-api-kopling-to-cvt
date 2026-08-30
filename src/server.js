import express from 'express';

import { testDatabaseConnection } from './config/database.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend API Store is running',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
const startServer = async () => {
  try {
    const database = await testDatabaseConnection();

    console.log('Database connected successfully');
    console.log('Database time:', database.now);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);

    process.exit(1);
  }
};

startServer();
