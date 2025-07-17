import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);
const jobPostingSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  description: String,
  ctc: String,
  ctcBreakup: String,
  location: String,
  eligibleCourses: [String],
  elifigibleStreams: [String],
  skills: [String],
  passingYear: Number,
  roleType: { type: String, enum: ['full-time', 'internship'], default: 'full-time' },
  minCgpa: Number,
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
},{timestamps: true});

jobPostingSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
export default JobPosting;