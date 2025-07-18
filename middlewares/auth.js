import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../utils/constant.js";

export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch {
        res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid or expired token' });
    }
}