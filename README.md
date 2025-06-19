# Simple REST API

A simple REST API for user management built with Node.js and Express.

## Programming Language and Framework

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Dependencies**: 
  - express: Web application framework
  - uuid: For generating unique user IDs

## Features

- Create users with name and email
- Retrieve users by ID
- In-memory storage (no database required)
- Comprehensive error handling
- Input validation
- JSON responses

## API Endpoints

### POST /users
Creates a new user with the provided name and email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### GET /users/:id
Retrieves a user by their ID.

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (404 Not Found):**
```json
{
  "error": "User not found",
  "message": "No user found with ID: invalid-id"
}
```

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd simple-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **The API will be available at:**
   ```
   http://localhost:3000
   ```

## Testing the API

### Using curl

**Create a user:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get a user by ID (replace with actual ID from create response):**
```bash
curl http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000
```

**Get all users (bonus endpoint):**
```bash
curl http://localhost:3000/users
```

### Example Test Sequence

1. **Create a user:**
   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Alice Smith", "email": "alice@example.com"}'
   ```

2. **Copy the `id` from the response and use it to retrieve the user:**
   ```bash
   curl http://localhost:3000/users/[PASTE_ID_HERE]
   ```

3. **Test error handling - missing fields:**
   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Bob"}'
   ```

4. **Test error handling - invalid email:**
   ```bash
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Bob", "email": "invalid-email"}'
   ```

5. **Test 404 - non-existent user:**
   ```bash
   curl http://localhost:3000/users/non-existent-id
   ```

## Error Handling

The API includes comprehensive error handling for:

- **400 Bad Request**: Missing required fields, invalid input format
- **404 Not Found**: User not found, invalid routes
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Server-side errors

## Project Structure

```
simple-rest-api/
├── server.js          # Main application file
├── package.json       # Project dependencies and scripts
└── README.md         # This file
```

## Requirements Fulfilled

✅ **POST /users endpoint** - Creates users with auto-generated UUID  
✅ **GET /users/:id endpoint** - Retrieves users by ID  
✅ **In-memory storage** - Uses JavaScript Map for data storage  
✅ **JSON responses** - All responses are in valid JSON format  
✅ **Error handling** - Comprehensive validation and error responses  
✅ **404 handling** - Returns 404 for non-existent users and routes  

## Additional Features

- Email format validation
- Duplicate email prevention
- Input sanitization (trimming whitespace)
- Bonus GET /users endpoint for viewing all users
- Comprehensive error messages
- Case-insensitive email handling
