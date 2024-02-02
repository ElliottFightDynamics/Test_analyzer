const { spawn } = require('child_process');
const path = require('path');

/**
 * This function calls the Python script to generate documentation based on the vectorized code.
 * @param {Object} vectorizedCode - The vector representation of the codebase.
 * @returns {Promise<string>} - The generated documentation as a string.
 */
const generateDocumentation = (vectorizedCode) => {
  return new Promise((resolve, reject) => {
    // Path to the Python script that generates documentation
    const scriptPath = path.join(__dirname, '../../ai/generate_documentation.py');

    // Spawn a Python process to run the script
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(vectorizedCode)]);

    let generatedDoc = '';

    // Collect data from the Python script
    pythonProcess.stdout.on('data', (data) => {
      generatedDoc += data.toString();
    });

    // Handle script execution errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      reject(new Error(data.toString()));
    });

    // Resolve the promise once the Python script finishes running
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`generateDocumentation script exited with code ${code}`));
      }
      resolve(generatedDoc);
    });
  });
};

module.exports = {
  generateDocumentation
};