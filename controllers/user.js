import { StatusCodes } from "http-status-codes"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    successResponse,
    customErrorResponse,
    internalErrorResponse
} from "../utils/common/response.js";
import { signUpService, signInService } from "../services/user.js";
import { JWT_SECRET } from "../utils/constant.js";

export async function signUpController(req, res) {
    try {
        const { email, password, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await signUpService({ email, passwordHash, role });

        const token = jwt.sign({ email: user.email, role: user.role, _id:user._id }, JWT_SECRET, { expiresIn: '24h' });

        const data = {
            email: user.email,
            role: user.role,
            _id: user._id
        };

        return res.status(StatusCodes.CREATED).json(successResponse({...data, token}, "User created successfully"));
    } catch (error) {
        console.error("signUpController error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function signInController(req, res) {
    try {
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("Password Hash:", passwordHash);
        const user = await signInService(email);
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(StatusCodes.UNAUTHORIZED).json(customErrorResponse({
                message: "Invalid credentials",
                explanation: "The provided email or password is incorrect."
            }));
        }
        const token = jwt.sign({ email: user.email, role: user.role, _id:user._id }, JWT_SECRET, { expiresIn: '24h' });
        const data = {
            email: user.email,
            role: user.role,
            _id: user._id
        };
        return res.status(StatusCodes.OK).json(successResponse({...data, token}, "User signed in successfully"));
    } catch (error) {
        console.error("signInController error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

