require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.static('public'));

app.get('/api/greeting', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM greetings LIMIT 1');
    res.json({ name: result.rows[0].name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
