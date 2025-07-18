import userRepository from "../repository/user.js";

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