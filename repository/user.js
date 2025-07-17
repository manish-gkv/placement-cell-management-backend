import User from '../schemas/user.js';
import crudRepository from './crud.js';

const userRepository = {
    ...crudRepository(User),
}

export default userRepository;