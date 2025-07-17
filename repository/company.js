import Company from '../schemas/company.js';
import crudRepository from './crud.js';

const companyRepository = {
    ...crudRepository(Company),
}

export default companyRepository;