import { Router } from "express";

const router = Router();

router.use("/student", studentRoutes);

export default router;