import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const companySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true },
  companyDescription: String,
  website: String,
  industryType: String,
  contactPerson: String,
  contactEmail: String,
  logoUrl: String,
  isApproved: { type: Boolean, default: false }
}, {timestamps: true});

companySchema.plugin(AutoIncrement, { inc_field: 'companyId', start_seq: 1 });

const Company = mongoose.model('Company', companySchema);
export default Company;