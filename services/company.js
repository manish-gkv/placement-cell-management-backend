import companyRepository from '../repository/company.js';

export async function getAllCompaniesService() {
    try{
        const companies = await companyRepository.getAll();
        return companies;
    }
    catch (error) {
        console.error("Error in getAllCompaniesService:", error);
        throw error;
    }
}
export async function getCompanyByIdService(companyId) {
    try {
        const company = await companyRepository.get(parseInt(companyId));
        return company;
    } catch (error) {
        console.error("Error in getCompanyByIdService:", error);
        throw error;
    }
}

export async function createCompanyService(user, companyData) {
    try {
        const newCompany = await companyRepository.create({user, ...companyData});
        return newCompany;
    } catch (error) {
        console.error("Error in createCompanyService:", error);
        throw error;
    }
}

export async function updateCompanyService(companyId, companyData) {
    try {
        const updatedCompany = await companyRepository.findOneAndUpdate({companyId}, {...companyData});
        return updatedCompany;
    } catch (error) {
        console.error("Error in updateCompanyService:", error);
        throw error;
    }
}