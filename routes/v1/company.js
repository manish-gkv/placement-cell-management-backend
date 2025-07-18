import { Router } from "express";

import {
    getAllCompaniesController,
    getCompanyByIdController,
    createCompanyController,
    updateCompanyController
} from "../../controllers/company.js";

const router = Router();

router.get("/", getAllCompaniesController);
router.get("/:companyId", getCompanyByIdController);
router.post("/", createCompanyController);
router.put("/:companyId", updateCompanyController);

export default router;