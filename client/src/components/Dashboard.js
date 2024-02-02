import React, { useState } from 'react';
import UploadForm from './UploadForm';
import AnalysisResults from './AnalysisResults';
import DocumentationDisplay from './DocumentationDisplay';
import apiService from '../services/apiService';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadData, setUploadData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [documentationData, setDocumentationData] = useState(null);

  const handleUpload = async (formData) => {
    try {
      const response = await apiService.uploadCodebase(formData);
      setUploadData(response.data);
      setCurrentStep(2);
      analyzeCodebase(response.data.id);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const analyzeCodebase = async (codebaseId) => {
    try {
      const response = await apiService.analyzeCodebase(codebaseId);
      setAnalysisData(response.data);
      setCurrentStep(3);
      generateDocumentation(codebaseId);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const generateDocumentation = async (codebaseId) => {
    try {
      const response = await apiService.generateDocumentation(codebaseId);
      setDocumentationData(response.data);
      setCurrentStep(4);
    } catch (error) {
      console.error('Documentation generation failed:', error);
    }
  };

  return (
    <div id="dashboard">
      {currentStep === 1 && <UploadForm onUpload={handleUpload} />}
      {currentStep === 2 && <AnalysisResults data={analysisData} />}
      {currentStep === 3 && <DocumentationDisplay data={documentationData} />}
    </div>
  );
};

export default Dashboard;