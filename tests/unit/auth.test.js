const authController = require('../../controllers/authController');

test('User registration should return a new user object', async () => {
  // Mock request and response objects
  const req = {
    body: {
      username: 'testuser',
      password: 'testpassword',
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  // Call the user registration controller method
  await authController.register(req, res);

  // Assertions
  expect(res.status).toHaveBeenCalledWith(201); // Expect HTTP status code 201 (Created)
  expect(res.json).toHaveBeenCalled(); // Expect JSON response
  expect(res.json.mock.calls[0][0]).toHaveProperty('token'); // Expect the response to contain a token property
});

test('User login should return a valid JWT token', async () => {
  // Mock request and response objects
  const req = {
    body: {
      username: 'testuser',
      password: 'testpassword',
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  // Call the user login controller method
  await authController.login(req, res);

  // Assertions
  expect(res.status).toHaveBeenCalledWith(200); // Expect HTTP status code 200 (OK)
  expect(res.json).toHaveBeenCalled(); // Expect JSON response
  expect(res.json.mock.calls[0][0]).toHaveProperty('token'); // Expect the response to contain a token property
});
