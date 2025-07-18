import companyRepository from '../repository/company.js';
import jobPostingRepository from '../repository/jobPosting.js';

export async function getAllJobsService() {
    try {
        return await jobPostingRepository.getAll();
    } catch (error) {
        console.error("Error in getAllJobsService:", error);
        throw error;
    }
}

export async function getJobByIdService(jobId) {
    try {
        return await jobPostingRepository.get({jobId});
    } catch (error) {
        console.error("Error in getJobByIdService:", error);
        throw error;
    }
}

export async function createJobService(user, jobData) {
    try {
        const company =await companyRepository.get({ user });
        const job = {
            ...jobData,
            company,
            createdAt: new Date()
        };
        return await jobPostingRepository.create(job);
    } catch (error) {
        console.error("Error in createJobService:", error);
        throw error;
    }
}

export async function updateJobService(jobId, jobData) {
    try {
        return await jobPostingRepository.findOneAndUpdate({jobId}, {jobData});
    } catch (error) {
        console.error("Error in updateJobService:", error);
        throw error;
    }
}

export async function deleteJobService(jobId) {
    try {
        return await jobPostingRepository.findOneAndDelete({jobId});
    } catch (error) {
        console.error("Error in deleteJobService:", error);
        throw error;
    }
}