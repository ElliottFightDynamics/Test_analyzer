import React from 'react';

const AnalysisResults = ({ analysisData }) => {
  if (!analysisData) {
    return <div>No analysis data available. Please upload a codebase to analyze.</div>;
  }

  return (
    <div id="analysisResults">
      <h2>Analysis Results</h2>
      <div>
        <h3>Syntax and Structure</h3>
        <pre>{JSON.stringify(analysisData.syntax, null, 2)}</pre>
      </div>
      <div>
        <h3>Semantics</h3>
        <pre>{JSON.stringify(analysisData.semantics, null, 2)}</pre>
      </div>
      <div>
        <h3>Patterns and Best Practices</h3>
        <pre>{JSON.stringify(analysisData.patterns, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AnalysisResults;