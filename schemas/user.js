import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'company', 'admin'], required: true },
}, {timestamps:true});

const  User = mongoose.model('Users', userSchema);
export default  User;