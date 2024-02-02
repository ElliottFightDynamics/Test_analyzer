import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const apiService = {
  uploadCodebase: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  analyzeCodebase: async (codebaseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analyze/${codebaseId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  generateDocumentation: async (codebaseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/documentation/${codebaseId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAnalysisResults: async (codebaseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/results/${codebaseId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default apiService;