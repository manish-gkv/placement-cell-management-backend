import { StatusCodes } from "http-status-codes";

import {
    getAllStudentsService,
    getStudentByRollNumberService,
    createStudentService,
    updateStudentService
} from "../services/student.js";

import {
    successResponse,
    customErrorResponse,
    internalErrorResponse
} from "../utils/common/response.js";

export async function getAllStudentsController(req, res) {
    const user = req.user;
    if(user.role !== "admin"){
        // Only admin can access see all students
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "You do not have permission to access this resource."
        });
    }

    try {
        const students = await getAllStudentsService();
        return res.status(StatusCodes.OK).json(successResponse(students, "Students fetched successfully"));
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function getStudentByRollNumberController(req, res) {
    const user = req.user;
    const { rollNumber } = req.params;
    try {
        const student = await getStudentByRollNumberService(rollNumber);
        if (!student) {
            return res.status(StatusCodes.NOT_FOUND).json(customErrorResponse({
                message: "Student not found", explanation: "No student found with the provided roll number."
            }));
        }
        return res.status(StatusCodes.OK).json(successResponse(student, "Student fetched successfully"));
    }
    catch (error) {
        console.error("Error fetching student by roll number:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function createStudentController(req, res) {
    const user = req.user;
    if(user.role !== "student"){
        // Only student can create their own profile
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "You do not have permission to create a student profile."
        });
    }
    try{
        const studentData = req.body;
        const student = await createStudentService(user, studentData);
        return res.status(StatusCodes.CREATED).json(successResponse(student, "Student created successfully"));
    }
    catch (error) {
        console.error("Error creating student:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export async function updateStudentController(req, res) {
    // Logic to update an existing student
    const user = req.user;
    if(user.role !== "student"){
        // Only student can update their own details
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "You do not have permission to update this resource."
        });
    }
    try {
        const { rollNumber } = req.params;
        const studentData = req.body;
        const updatedStudent = await updateStudentService(rollNumber,studentData);
        return res.status(StatusCodes.OK).json(successResponse(updatedStudent, "Student updated successfully"));
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}
