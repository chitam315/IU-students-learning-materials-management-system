import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const PORT = process.env.port || 5000;
const SERECT_KEY = process.env.SERECT_KEY || null;

export {PORT,SERECT_KEY}