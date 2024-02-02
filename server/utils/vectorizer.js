const { Word2Vec } = require('word2vec');
const fs = require('fs');
const path = require('path');

/**
 * This function tokenizes the code into atomic elements (tokens).
 * @param {string} code - The source code to tokenize.
 * @returns {string[]} An array of tokens.
 */
const tokenizeCode = (code) => {
  // A simple tokenizer that splits the code by non-alphanumeric characters
  // This should be replaced with a more sophisticated tokenizer if necessary
  return code.split(/\W+/).filter(token => token.length > 0);
};

/**
 * This function converts an array of tokens into numerical vectors.
 * @param {string[]} tokens - An array of code tokens.
 * @param {function} callback - A callback function to handle the result.
 */
const vectorizeTokens = (tokens, callback) => {
  // Load a pre-trained Word2Vec model or train a new one
  const modelPath = path.join(__dirname, 'word2vec-model.bin');
  if (fs.existsSync(modelPath)) {
    Word2Vec.loadModel(modelPath, (error, model) => {
      if (error) {
        return callback(error);
      }
      const vectors = tokens.map(token => model.getVector(token) || []);
      callback(null, vectors);
    });
  } else {
    // If no pre-trained model is available, handle the error appropriately
    callback(new Error('Word2Vec model not found.'));
  }
};

/**
 * This function extracts high-level features from the code and converts them into vector form.
 * @param {string} code - The source code to extract features from.
 * @param {function} callback - A callback function to handle the result.
 */
const extractFeatures = (code, callback) => {
  const tokens = tokenizeCode(code);
  vectorizeTokens(tokens, (error, vectors) => {
    if (error) {
      return callback(error);
    }
    // Further processing to extract high-level features can be added here
    // For now, we simply return the vectors
    callback(null, vectors);
  });
};

module.exports = {
  tokenizeCode,
  vectorizeTokens,
  extractFeatures
};