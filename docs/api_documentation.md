# API Documentation

## Overview

This document outlines the API endpoints provided by the full-stack application designed to analyze, vectorize, and document a codebase using advanced AI techniques. The application offers a seamless interface for users to input their codebase, receive a comprehensive analysis, and generate documentation automatically.

## Base URL

The base URL for the API is:

```
https://<your-application-domain>/api
```

Replace `<your-application-domain>` with the domain where the application is hosted.

## Endpoints

### Codebase Upload

- **POST /upload**

  Allows users to upload their codebase for analysis.

  **Request Body:**

  - `codebase`: The zip file containing the codebase or a link to the repository.

  **Response:**

  - `200 OK`: Upload successful.
  - `400 Bad Request`: Invalid input or missing file.
  - `500 Internal Server Error`: Server error during file processing.

### Automated Analysis

- **GET /analyze/:codebaseId**

  Triggers the analysis of the uploaded codebase identified by `codebaseId`.

  **Response:**

  - `200 OK`: Analysis started successfully.
  - `404 Not Found`: Codebase with the given ID not found.
  - `500 Internal Server Error`: Server error during analysis.

### Vectorization

- **GET /vectorize/:codebaseId**

  Retrieves the vector representation of the codebase identified by `codebaseId`.

  **Response:**

  - `200 OK`: Vectorization data.
  - `404 Not Found`: Codebase with the given ID not found.
  - `500 Internal Server Error`: Server error during vectorization.

### Documentation Generation

- **GET /documentation/:codebaseId**

  Generates and retrieves documentation for the codebase identified by `codebaseId`.

  **Response:**

  - `200 OK`: Generated documentation content.
  - `404 Not Found`: Codebase with the given ID not found.
  - `500 Internal Server Error`: Server error during documentation generation.

## Status Codes

The application uses the following status codes:

- `200 OK`: The request was successful.
- `400 Bad Request`: The request was invalid or cannot be served.
- `404 Not Found`: The resource requested does not exist.
- `500 Internal Server Error`: An error occurred on the server.

## Error Handling

All API errors are returned in the following format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Error message describing the issue."
  }
}
```

## Security

All API endpoints are secured with appropriate authentication and authorization checks to ensure data privacy and integrity.

## Rate Limiting

The API enforces rate limiting to prevent abuse and ensure service availability for all users. If the rate limit is exceeded, the API will return a `429 Too Many Requests` status code.

## Conclusion

This API documentation provides developers with the necessary information to interact with the application's services. For more detailed examples and usage, refer to the `user_manual.md` and `installation_guide.md` documents.