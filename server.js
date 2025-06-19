const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for users
const users = new Map();

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /users - Create a new user
app.post('/users', (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both name and email are required'
      });
    }

    // Validate name is not empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid name',
        message: 'Name must be a non-empty string'
      });
    }

    // Validate email format
    if (typeof email !== 'string' || !isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    for (const user of users.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return res.status(409).json({
          error: 'Email already exists',
          message: 'A user with this email already exists'
        });
      }
    }

    // Create new user
    const id = uuidv4();
    const newUser = {
      id,
      name: name.trim(),
      email: email.toLowerCase()
    };

    // Store user
    users.set(id, newUser);

    // Return created user
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create user'
    });
  }
});

// GET /users/:id - Get user by ID
app.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format (basic UUID validation)
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: 'Invalid user ID',
        message: 'User ID must be provided'
      });
    }

    // Find user
    const user = users.get(id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `No user found with ID: ${id}`
      });
    }

    // Return user
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve user'
    });
  }
});

// GET /users - Get all users (bonus endpoint for testing)
app.get('/users', (req, res) => {
  try {
    const allUsers = Array.from(users.values());
    res.json({
      users: allUsers,
      count: allUsers.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve users'
    });
  }
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${8080}`);
  console.log(`API available at: http://localhost:${8080}`);
});

module.exports = app;