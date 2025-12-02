import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config()

export const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT

})
// console.log("DB_password:", process.env.DB_PASSWORD)

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
