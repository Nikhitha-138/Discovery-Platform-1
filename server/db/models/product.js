const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    THC: {
      type: Number,
      required: true,
      min: [0, 'THC must be at least 0%'],
      max: [100, 'THC cannot exceed 100%'],
    },
    CBD: {
      type: Number,
      required: true,
      min: [0, 'CBD must be at least 0%'],
      max: [100, 'CBD cannot exceed 100%'],
    },
    price: { type: Number, required: true },
    effect: { type: String },
    usageType: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
