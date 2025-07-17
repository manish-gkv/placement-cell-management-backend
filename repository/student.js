import Student from '../schemas/student.js';
import crudRepository from './crud.js';

const studentRepository = {
    ...crudRepository(Student),
}

export default studentRepository;