const request = require('supertest');
const app = require('../../server/index.js');
const { Codebase } = require('../../server/models/Codebase');
const { Documentation } = require('../../server/models/Documentation');

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Setup connection to the test database
    // This assumes you have a function to initialize the test DB
    await initializeTestDB();
  });

  afterAll(async () => {
    // Close the test database connection
    await closeTestDB();
  });

  describe('POST /api/upload', () => {
    it('should upload a codebase and return a success message', async () => {
      const response = await request(app)
        .post('/api/upload')
        .attach('codebase', 'path/to/test/codebase.zip');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Codebase uploaded successfully');
    });
  });

  describe('GET /api/analysis/:id', () => {
    it('should return analysis results for a given codebase', async () => {
      const codebase = await Codebase.create({ /* ... */ });
      const response = await request(app).get(`/api/analysis/${codebase.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('analysisResults');
    });
  });

  describe('GET /api/documentation/:id', () => {
    it('should return generated documentation for a given codebase', async () => {
      const documentation = await Documentation.create({ /* ... */ });
      const response = await request(app).get(`/api/documentation/${documentation.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('documentationContent');
    });
  });

  // Additional tests for other endpoints can be added here

});

// Helper functions for test database setup and teardown
async function initializeTestDB() {
  // Logic to initialize test database
}

async function closeTestDB() {
  // Logic to close test database connection
}