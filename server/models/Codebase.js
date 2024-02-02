const mongoose = require('mongoose');

const codebaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  repositoryUrl: {
    type: String,
    required: false
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'completed', 'error'],
    default: 'pending'
  },
  analysisResults: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  vectorizedRepresentation: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  documentation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documentation'
  }
});

module.exports = mongoose.model('Codebase', codebaseSchema);