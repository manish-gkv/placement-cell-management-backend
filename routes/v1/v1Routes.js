import { Router } from "express";

import studentRoutes from "./student.js";
import companyRoutes from "./company.js";
import authenticateToken from "../../middlewares/auth.js";
const router = Router();

// Apply authentication middleware to all routes in this version
router.use(authenticateToken);
router.use("/student", studentRoutes);
router.use("/company", companyRoutes);
export default router;