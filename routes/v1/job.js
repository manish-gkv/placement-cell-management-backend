import { Router } from "express";
import{
    getAllJobsController,
    getJobByIdController,
    createJobController,
    updateJobController,
    deleteJobController,
    applyJobController,
    applyStatusController,
    getAllAppliedJobsController
} from "../../controllers/job.js";
const router = Router();

router.get("/applied", getAllAppliedJobsController);
router.get("/", getAllJobsController);
router.get("/:jobId", getJobByIdController);
router.post("/", createJobController);
router.put("/:jobId", updateJobController);
router.delete("/:jobId", deleteJobController);
router.get("/:jobId/apply", applyJobController);
router.get("/:jobId/apply-status", applyStatusController);

export default router;