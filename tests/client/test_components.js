import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UploadForm from '../../src/components/UploadForm';
import Dashboard from '../../src/components/Dashboard';
import AnalysisResults from '../../src/components/AnalysisResults';
import DocumentationDisplay from '../../src/components/DocumentationDisplay';
import apiService from '../../src/services/apiService';

jest.mock('../../src/services/apiService');

describe('UploadForm Component', () => {
  it('renders the upload form', () => {
    render(<UploadForm />);
    expect(screen.getByTestId('uploadForm')).toBeInTheDocument();
  });

  it('calls the apiService on form submit', async () => {
    const mockUpload = apiService.uploadCodebase.mockResolvedValue({
      message: 'Upload successful',
    });

    render(<UploadForm />);
    fireEvent.submit(screen.getByTestId('uploadForm'));

    await waitFor(() => expect(mockUpload).toHaveBeenCalled());
  });
});

describe('Dashboard Component', () => {
  it('renders the dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});

describe('AnalysisResults Component', () => {
  it('renders the analysis results', () => {
    const results = { syntax: 'Valid', semantics: 'Valid' };
    render(<AnalysisResults results={results} />);
    expect(screen.getByTestId('analysisResults')).toBeInTheDocument();
  });
});

describe('DocumentationDisplay Component', () => {
  it('renders the documentation display', () => {
    const documentation = 'Function: addNumbers - Adds two numbers.';
    render(<DocumentationDisplay documentation={documentation} />);
    expect(screen.getByTestId('documentationDisplay')).toBeInTheDocument();
  });
});