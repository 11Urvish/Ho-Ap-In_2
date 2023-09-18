import { model, Schema } from 'mongoose';
const UserloginSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    password: { type: String, required: true, trim: true },  
    status: { type: Number,default:1},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
    
  export default model('Auth', UserloginSchema);