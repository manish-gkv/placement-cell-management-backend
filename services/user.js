import userRepository from "../repository/user.js";
import companyRepository from "../repository/company.js";
import studentRepository from "../repository/student.js";

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