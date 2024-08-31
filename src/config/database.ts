import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
})
  .on('connect', () => {
    console.log('Database connected successfully!');
  })
  .on('error', (err) => {
    console.error('Database connection error:', err);
  });
