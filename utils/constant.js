import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const RANDOM_PASSWORD = process.env.RANDOM_PASSWORD;