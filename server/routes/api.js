const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const analysisController = require('../controllers/analysisController');
const documentationController = require('../controllers/documentationController');

// Route for codebase upload
router.post('/upload', uploadController.uploadCodebase);

// Route for initiating code analysis
router.get('/analyze/:codebaseId', analysisController.analyzeCodebase);

// Route for generating documentation
router.get('/document/:codebaseId', documentationController.generateDocumentation);

module.exports = router;