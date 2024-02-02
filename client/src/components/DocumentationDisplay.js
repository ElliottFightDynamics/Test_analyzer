import React from 'react';

const DocumentationDisplay = ({ documentation }) => {
  return (
    <div id="documentationDisplay" className="documentation-display">
      <h2>Generated Documentation</h2>
      {documentation ? (
        <pre>{documentation}</pre>
      ) : (
        <p>No documentation available. Please upload and analyze a codebase to generate documentation.</p>
      )}
    </div>
  );
};

export default DocumentationDisplay;