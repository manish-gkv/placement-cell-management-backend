import JobApplication from '../schemas/jobApplication.js';
import crudRepository from './crud.js';

const jobApplicationRepository = {
    ...crudRepository(JobApplication),
}

export default jobApplicationRepository;