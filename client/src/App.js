import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import Dashboard from './components/Dashboard';
import AnalysisResults from './components/AnalysisResults';
import DocumentationDisplay from './components/DocumentationDisplay';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={UploadForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/analysis-results" component={AnalysisResults} />
          <Route path="/documentation" component={DocumentationDisplay} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;