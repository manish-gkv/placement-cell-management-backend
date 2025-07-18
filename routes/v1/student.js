import { Router } from "express";

import {
    getAllStudentsController,
    getStudentByRollNumberController,
    createStudentController,
    updateStudentController,
    deleteStudentController
} from "../../controllers/student.js";

const router = Router();

router.get("/", getAllStudentsController);
router.get("/:rollNumber", getStudentByRollNumberController);
router.post("/", createStudentController);
router.put("/", updateStudentController);
router.delete("/", deleteStudentController);