const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  type: { type: String, enum: ['lost', 'found'], required: true },
  photoUrl: { type: String, default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isResolved: { type: Boolean, default: false },
}, { timestamps: true }); 

itemSchema.virtual('id').get(function() {
  return this._id.toString();
});

module.exports = mongoose.model('Item', itemSchema);
