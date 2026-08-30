import express from 'express';

/* 
app adalah instance dari Express.
app.get(...)
app.post(...)
app.put(...)
app.delete(...)
*/
const app = express();

// JSON Middleware
app.use(express.json());

//Endpoint
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
