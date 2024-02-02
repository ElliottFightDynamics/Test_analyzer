import React, { useState } from 'react';
import apiService from '../services/apiService';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('codebase', file);
      const response = await apiService.uploadCodebase(formData);
      alert(response.data.message);
    } catch (error) {
      alert('An error occurred while uploading the file.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div id="uploadForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="codebaseUpload">Upload your codebase:</label>
        <input
          type="file"
          id="codebaseUpload"
          name="codebase"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;