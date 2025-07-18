import { Router } from "express";
import{
    getAllJobsController,
    getJobByIdController,
    createJobController,
    updateJobController,
    deleteJobController
} from "../../controllers/job.js";
const router = Router();

router.get("/", getAllJobsController);
router.get("/:jobId", getJobByIdController);
router.post("/", createJobController);
router.put("/:jobId", updateJobController);
router.delete("/:jobId", deleteJobController);

export default router;