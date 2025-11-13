import userRepository from "../repository/user.js";
import companyRepository from "../repository/company.js";
import studentRepository from "../repository/student.js";
import { createStudentService } from "./student.js";
import { RANDOM_PASSWORD } from "../utils/constant.js";
export async function signUpService({ email, passwordHash, role }) {
    try {
        const user = await userRepository.create({
            email,
            passwordHash,
            role
        });
        return user;
    } catch (error) {
        console.error("signUpService error:", error);
        throw error;
    }
    
}

export async function signInService(email) {
    try {
        const user = await userRepository.get({ email});
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("signInService error:", error);
        throw error;
    }
}

export async function getProfileService(user) {
    try {
        if(user.role === "student") {
            const profile =  await studentRepository.get({ user: user._id });
            if (!profile) {
                return null;
            }
            return profile;
        }
        if(user.role === "company") {
            const profile =  await companyRepository.get({ user: user._id });
            if (!profile) {
                return null;
            }
            return profile;
        }
    } catch (error) {
        console.error("getProfileService error:", error);
        throw error;
    }
}

export async function googleUserService({ userInfo, role }) {
    try {
        const email = userInfo.email;
        let user = await userRepository.get({ email});
        if (user) {
            return user;
        }
        
        user = await userRepository.create({
            email,
            passwordHash: RANDOM_PASSWORD,
            role
        });
        if(role === "student") await createStudentService(user, {name: userInfo.name, rollNumber: email.split("@")[0]});

        return user;
    } catch (error) {
        console.error("googleUserService error:", error);
        throw error;
    }
}