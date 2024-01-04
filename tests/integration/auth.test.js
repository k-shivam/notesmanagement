const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is defined in app.js or another file

describe('Authentication Endpoints', () => {
  let token; // Variable to store the authentication token for later use

  test('User Registration', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('User Login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    // Store the token for later use in other tests
    token = response.body.token;
  });

  test('Get User Profile', async () => {
    const response = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  // Add more tests for other authentication-related endpoints as needed
});
