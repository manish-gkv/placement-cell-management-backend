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
  profileImage: String,
  phone: String,
  alternateEmail: { type: String },
  gender: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const Student = mongoose.model('Students', studentSchema);
export default Student;
