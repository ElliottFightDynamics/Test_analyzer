# User Manual

Welcome to the user manual for our full-stack application designed to analyze, vectorize, and document your codebase using advanced AI. This guide will walk you through the features of the application and how to use them effectively.

## Getting Started

### Installation

Please refer to the `installation_guide.md` for detailed instructions on how to install and set up the application on your system.

### Launching the Application

After installation, you can start the application by running the following commands:

For the client:
```
cd client
npm start
```

For the server:
```
cd server
npm run dev
```

For the AI service:
```
cd ai
python train_model.py
```

## Features

### Codebase Upload

To upload your codebase:

1. Navigate to the `UploadForm` component in the dashboard.
2. Choose one of the following methods:
   - Drag and drop your zip file into the designated area.
   - Paste your code snippet directly into the text area.
   - Provide a link to your repository (e.g., GitHub, Bitbucket).

### Automated Analysis

Once your codebase is uploaded:

1. The application will automatically start the analysis process.
2. You can view the progress in the `AnalysisResults` component.
3. Upon completion, a structural and semantic analysis of your code will be presented.

### Vectorization

The application converts your code into vector representations to understand its functionality. This process is automatic and requires no user input.

### Documentation Generation

After analysis and vectorization:

1. The AI models will predict and generate documentation for your codebase.
2. You can view and download the generated documentation from the `DocumentationDisplay` component.

### User Interface

The application features an intuitive UI with the following components:

- `Dashboard`: The central hub for managing your projects and accessing features.
- `UploadForm`: Where you upload your codebase.
- `AnalysisResults`: Displays the results of the automated code analysis.
- `DocumentationDisplay`: Shows the generated documentation.

## Customization Options

You can customize the analysis and documentation generation process by:

1. Selecting specific sections of the codebase for documentation.
2. Choosing different documentation formats and styles.

## Real-Time Feedback

During the upload and analysis process, the application provides real-time feedback on the progress and any issues encountered.

## Support and Feedback

For support or to provide feedback, please refer to the `README.md` file for contact information and how to report issues or contribute to the project.

## Conclusion

This user manual should provide you with all the necessary information to effectively use our application. For more detailed information on the API, please see the `api_documentation.md`. Enjoy using our application to simplify the process of understanding and documenting your codebase!