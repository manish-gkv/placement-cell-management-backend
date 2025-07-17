import Admin from '../schemas/admin.js';
import crudRepository from './crud.js';

const adminRepository = {
    ...crudRepository(Admin),
}

export default adminRepository;