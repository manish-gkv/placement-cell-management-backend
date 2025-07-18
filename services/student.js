import studentRepository from "../repository/student.js"

export async function getAllStudentsService() {
    try{
        const students = await studentRepository.getAll();
        return students;
    }
    catch (error) {
        console.error("getAllStudentsService error : ", error);
        throw error;
    }
}

export async function getStudentByRollNumberService(rollNumber) {
    try {
        const student = await studentRepository.get({ rollNumber });
        return student;
    } catch (error) {
        console.error("getStudentByRollNumberService error : ", error);
        throw error;
    }
}

export async function createStudentService(user, studentData) {
    try {
        const student = await studentRepository.create({
            ...studentData,
            user
        });
        return student;
    } catch (error) {
        console.error("createStudentService error : ", error);
        throw error;
    }
}

export async function updateStudentService(rollNumber, studentData){
    try{
        const student = await studentRepository.findOneAndUpdate({ rollNumber }, studentData);
        return student;
    }
    catch (error) {
        console.error("updateStudentService error : ", error);
        throw error;
    }
} 

