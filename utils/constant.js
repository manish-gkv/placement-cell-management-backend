import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET