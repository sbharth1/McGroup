import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected via Drizzle ORM');
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
};