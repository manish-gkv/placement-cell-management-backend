import { Router } from "express";

import studentRoutes from "./student.js";
import companyRoutes from "./company.js";
import jobRoutes from "./job.js";
import authenticateToken from "../../middlewares/auth.js";
import { getProfileController } from "../../controllers/user.js";
const router = Router();

// Apply authentication middleware to all routes in this version
router.use(authenticateToken);
router.use("/student", studentRoutes);
router.use("/company", companyRoutes);
router.use("/job", jobRoutes);
router.get("/profile", getProfileController);
export default router;