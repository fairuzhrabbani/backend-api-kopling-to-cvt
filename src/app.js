import express from 'express';
import cors from 'cors';
import pool from './config/database.js';

const app = express();

// CORS Middleware — pasang sebelum routes
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// JSON Middleware
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Express server is running',
  });
});

// Endpoint untuk mengambil kategori
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
    });
  }
});

export default app;

/* 
app.js focus terhadap
Express application
Middleware
Routes
*/
