import { StatusCodes } from "http-status-codes";

import {
    successResponse,
    customErrorResponse,
    internalErrorResponse
} from "../utils/common/response.js";

import {
    getAllJobsService,
    getJobByIdService,
    createJobService,
    updateJobService,
    deleteJobService,
    applyJobService
} from "../services/job.js";

export async function getAllJobsController(req, res) {
    try {
        const jobs = await getAllJobsService();
        return res.status(StatusCodes.OK).json(successResponse(jobs, "Jobs fetched successfully"));
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function getJobByIdController(req, res) {
    const { jobId } = req.params;
    try {
        const job = await getJobByIdService(jobId);
        if (!job) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Job not found", explanation: "No job found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(job, "Job fetched successfully"));
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function createJobController(req, res) {
    const user = req.user;
    if (user.role !== "company") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to create a job."
        }));
    }
    if (!req.body || !req.body.jobTitle) {
        return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
            message: "Bad Request", explanation: "Job title is required."
        }));
    }
    try {
        const jobData = req.body;
        const job = await createJobService(user, jobData);
        return res.status(StatusCodes.CREATED).json(successResponse(job, "Job created successfully"));
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function updateJobController(req, res) {
    const { jobId } = req.params;
    const user = req.user;
    if (user.role !== "company") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to update this job."
        }));
    }
    try {
        const jobData = req.body;
        const updatedJob = await updateJobService(jobId, jobData);
        if (!updatedJob) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Job not found", explanation: "No job found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(updatedJob, "Job updated successfully"));
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function deleteJobController(req, res) {
    const { jobId } = req.params;
    const user = req.user;
    if (user.role !== "company") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to delete this job."
        }));
    }
    try {
        const deletedJob = await deleteJobService(jobId);
        if (!deletedJob) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Job not found", explanation: "No job found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(deletedJob, "Job deleted successfully"));
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function applyJobController(req, res) {
    let { jobId } = req.params;
    jobId = parseInt(jobId);
    const user = req.user;
    console.log(user);
    if (user.role !== "student") {
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            message: "Forbidden", explanation: "You do not have permission to apply for this job."
        }));
    }
    try {
        const applicationResult = await applyJobService(user, jobId);
        if (!applicationResult) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Job not found", explanation: "No job found with the provided ID."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(applicationResult, "Successfully applied for the job"));
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}
