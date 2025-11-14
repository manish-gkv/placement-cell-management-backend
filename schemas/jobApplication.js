import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

import getCurrAcademicYear from './utils/getCurrYear.js';

const AutoIncrement = sequence(mongoose);

const jobApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  jobId: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['applied', 'shortlisted', 'selected', 'rejected'], default: 'applied' }
}, { timestamps: true});

jobApplicationSchema.plugin(AutoIncrement, { inc_field: 'applicationId', start_seq: 10000*getCurrAcademicYear()+1});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;