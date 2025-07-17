import JobPosting from '../schemas/jobPosting.js';
import crudRepository from './crud.js';

const jobPostingRepository = {
    ...crudRepository(JobPosting),
}

export default jobPostingRepository;