import { StatusCodes } from "http-status-codes";

import {
    successResponse,
    customErrorResponse,
    internalErrorResponse
} from "../utils/common/response.js";
import {
    getAllCompaniesService,
    getCompanyByIdService,
    createCompanyService,
    updateCompanyService
} from "../services/company.js";
export async function getAllCompaniesController(req, res) {
    try{
        const companies = await getAllCompaniesService();
        return res.status(StatusCodes.OK).json(successResponse(companies, "Companies fetched successfully"));
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}
export async function getCompanyByIdController(req, res) {
    const { companyId } = req.params;
    try {
        const company = await getCompanyByIdService(companyId);
        if (!company) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Company not found", explanation: "No company found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(company, "Company fetched successfully"));
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function createCompanyController(req, res) {
    const user = req.user;
    if(user.role !== "company") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to create a company."
        }));
    }
    if (!req.body || !req.body.companyName) {
        return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
            message: "Bad Request", explanation: "Company name is required."
        }));
    }
    try {
        const companyData = req.body;
        const company = await createCompanyService(user, companyData);
        return res.status(StatusCodes.CREATED).json(successResponse(company, "Company created successfully"));
    } catch (error) {
        console.error("Error creating company:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function updateCompanyController(req, res) {
    const { companyId } = req.params;
    const user = req.user;
    if(user.role !== "company") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to update this company."
        }));
    }
    try {
        const updatedCompany = await updateCompanyService(companyId, req.body);
        if (!updatedCompany) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Not Found", explanation: "No company found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(updatedCompany, "Company updated successfully"));
    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

