import { model, Schema } from 'mongoose';

const CustomerSchema: Schema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  status: { type: Number, required: true, default: 1 },
  email: { type: String, trim: true },
  address: {
    address: { type: String, trim: true },
    village: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipcode: { type: String, trim: true },
  },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_at: { type: Date, default: Date.now },
});

export default model('Customer', CustomerSchema);