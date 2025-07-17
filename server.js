import express from 'express';
import adminRepository from './repository/admin.js';
import userRepository from './repository/user.js';
import companyRepository from './repository/company.js';
import jobApplicationRepository from './repository/jobApplication.js';
import jobPostingRepository from './repository/jobPosting.js';
import studentRepository from './repository/student.js';
const App = express();

App.listen(3000, () => {
  console.log('Server is running on port 3000');
});