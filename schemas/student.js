import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  rollNumber: { type: String, unique: true, required: true },
  course: String,
  stream: String,
  yearOfPassing: Number,
  cgpa: Number,
  resumeLink: String,
  isVerified: { type: Boolean, default: false }
});

const Student = mongoose.model('Students', studentSchema);
export default Student;

console.log(new Student({ name: 'John Doe', rollNumber: '12345', branch: 'CSE', yearOfPassing: 2024, cgpa: 8.5 }));
