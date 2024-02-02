const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema({
  codebaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Codebase',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

documentationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Documentation = mongoose.model('Documentation', documentationSchema);

module.exports = Documentation;