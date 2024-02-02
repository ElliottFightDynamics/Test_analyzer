const Codebase = require('../models/Codebase');
const vectorizer = require('../utils/vectorizer');
const codeParser = require('../utils/codeParser');
const { parseCode } = codeParser;
const { vectorizeCode } = vectorizer;

const analyzeCodebase = async (req, res) => {
    try {
        const { codebaseId } = req.params;
        const codebase = await Codebase.findById(codebaseId);

        if (!codebase) {
            return res.status(404).json({ message: 'Codebase not found' });
        }

        // Parse the code to analyze its structure and semantics
        const parsedCode = parseCode(codebase.code);

        // Vectorize the parsed code to understand its functionality
        const vectorizedCode = vectorizeCode(parsedCode);

        // Update the codebase with the analysis results
        codebase.analysis = {
            parsedCode,
            vectorizedCode
        };

        await codebase.save();

        res.status(200).json({
            message: 'Codebase analyzed successfully',
            analysis: codebase.analysis
        });
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing codebase', error: error.message });
    }
};

module.exports = {
    analyzeCodebase
};