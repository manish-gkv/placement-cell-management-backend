import { Router } from "express";

import studentRoutes from "./student.js";
import authenticateToken from "../../middlewares/auth.js";
const router = Router();

// Apply authentication middleware to all routes in this version
router.use(authenticateToken);
router.use("/student", studentRoutes);

export default router;