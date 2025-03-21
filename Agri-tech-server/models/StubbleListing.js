import mongoose from 'mongoose';

const stubbleSchema = new mongoose.Schema({
  cropType: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  sellerName: { type: String, required: true },
  location: { type: String, required: true }
});

export default mongoose.model('StubbleListing', stubbleSchema);