const Documentation = require('../models/Documentation');
const { generateDocumentation } = require('../utils/documentationGenerator');

const documentationController = {
  // Method to handle the request for generating documentation
  generateDocs: async (req, res) => {
    try {
      const { codebaseId } = req.params;
      // Retrieve the vectorized code from the database
      const codebase = await Documentation.findById(codebaseId);
      if (!codebase) {
        return res.status(404).json({ message: 'Codebase not found' });
      }

      // Generate documentation using the AI model
      const docsContent = await generateDocumentation(codebase.vectorizedCode);

      // Update the codebase with the generated documentation
      const updatedCodebase = await Documentation.findByIdAndUpdate(codebaseId, {
        $set: { documentation: docsContent }
      }, { new: true });

      // Send the generated documentation back to the client
      res.status(200).json(updatedCodebase.documentation);
    } catch (error) {
      res.status(500).json({ message: 'Error generating documentation', error });
    }
  },

  // Method to retrieve the generated documentation
  getDocumentation: async (req, res) => {
    try {
      const { codebaseId } = req.params;
      const codebase = await Documentation.findById(codebaseId);

      if (!codebase || !codebase.documentation) {
        return res.status(404).json({ message: 'Documentation not found' });
      }

      // Send the documentation to the client
      res.status(200).json(codebase.documentation);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving documentation', error });
    }
  }
};

module.exports = documentationController;