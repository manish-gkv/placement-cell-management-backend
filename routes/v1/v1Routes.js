import { Router } from "express";

import studentRoutes from "./student.js";

const router = Router();

router.use("/student", studentRoutes);

export default router;