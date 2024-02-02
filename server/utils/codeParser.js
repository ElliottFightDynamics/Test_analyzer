const treeSitter = require('tree-sitter');
const { Language } = require('tree-sitter');
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

// Assuming Tree-sitter grammars for different languages are installed and built
const treeSitterLanguages = {
  javascript: require('tree-sitter-javascript'),
  python: require('tree-sitter-python'),
  // Add other languages and their respective tree-sitter grammar here
};

// Initialize parsers for each language
const parsers = {};
for (const [language, grammar] of Object.entries(treeSitterLanguages)) {
  const parser = new treeSitter();
  parser.setLanguage(grammar);
  parsers[language] = parser;
}

/**
 * Parses the code using Tree-sitter based on the language specified.
 * @param {string} code - The source code to parse.
 * @param {string} language - The programming language of the source code.
 * @returns {treeSitter.Tree} The parsed syntax tree.
 */
const parseCode = (code, language) => {
  const parser = parsers[language];
  if (!parser) {
    throw new Error(`Unsupported language for parsing: ${language}`);
  }
  return parser.parse(code);
};

/**
 * Reads the code from a file and parses it.
 * @param {string} filePath - The path to the file containing the source code.
 * @param {string} language - The programming language of the source code.
 * @returns {Promise<treeSitter.Tree>} The parsed syntax tree.
 */
const parseCodeFromFile = async (filePath, language) => {
  try {
    const code = await readFileAsync(filePath, { encoding: 'utf8' });
    return parseCode(code, language);
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

module.exports = {
  parseCode,
  parseCodeFromFile,
};