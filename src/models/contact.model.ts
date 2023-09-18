import { model, Schema } from 'mongoose';
const ContactSchema: Schema = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    subjects: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },  
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
    
  export default model('Contact', ContactSchema);
