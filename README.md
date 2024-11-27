
# Node.js JWT Authentication System

A simple and secure Node.js application that demonstrates JWT-based authentication with access and refresh tokens. This app supports predefined users and does not use a database.

---

## Features

- **Predefined Users**: Uses predefined users stored in a file for testing.
- **JWT Authentication**: Access tokens with 1-minute expiration and refresh tokens with 5-minute expiration.
- **Secure Token Handling**: Access tokens returned in response body and refresh tokens stored in secure cookies.
- **Dynamic Secrets**: Secrets for token signing are generated dynamically at runtime.
- **APIs**:
  - `/login`: User login and token generation.
  - `/check-auth`: Verifies access token.
  - `/refresh`: Generates a new access token using a refresh token.

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Clone the Repository

```bash
git clone git@github.com:userpeaseonly/node-auth-app.git
cd node-auth-app
```

---

### Install Dependencies

```bash
npm install
```

---

### Run the Application

```bash
npm start
```

By default, the server runs on **http://localhost:3000**. You can change the port in the `.env` file.

---

## Environment Variables

Create a `.env` file in the root directory. Here's the basic configuration:

```env
PORT=3000
```

---

## Usage

### 1. **Login**

#### Endpoint
`POST /auth/login`

#### Request Body
```json
{
  "username": "user1",
  "password": "password1"
}
```

#### Response
```json
{
  "accessToken": "<JWT_ACCESS_TOKEN>"
}
```
- Sets the `refreshToken` as a secure HTTP-only cookie.

---

### 2. **Check Auth**

#### Endpoint
`GET /auth/check-auth`

#### Headers
```json
{
  "Authorization": "Bearer <JWT_ACCESS_TOKEN>"
}
```

#### Response (if valid token)
```json
{
  "message": "Authenticated"
}
```

#### Response (if expired or invalid token)
- Status: `401 Unauthorized`.

---

### 3. **Refresh Token**

#### Endpoint
`POST /auth/refresh`

#### Cookie
Ensure the `refreshToken` cookie is sent with the request.

#### Response
```json
{
  "accessToken": "<NEW_JWT_ACCESS_TOKEN>"
}
```

---

## Testing

1. Use a tool like **Postman**, **Insomnia**, or **curl** for testing.
2. Test the following APIs:
   - Login: Verify correct credentials generate tokens.
   - Check Auth: Confirm access token validity.
   - Refresh Token: Ensure a new access token is issued when the old one expires.

---

## Project Structure

```
node-auth-app/
├── index.js                 # Entry point
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── authMiddleware.js    # Token verification middleware
├── utils/
│   ├── generateTokens.js    # Access and refresh token generation
│   └── cryptoUtils.js       # Dynamic secret key generator
├── .env                     # Environment variables
├── predefinedUsers.js       # Predefined users with hashed passwords
└── package.json             # Project configuration
```

---

## Notes

- **Access Token Expiry**: Tokens expire in **1 minute** for testing purposes; adjust as needed.
- **Secure Cookies**: Ensure `httpOnly` and `secure` flags are enabled for production.
- **Dynamic Secrets**: Secrets are generated at runtime using `crypto` for enhanced security.

---

## Future Enhancements

- Integrate a real database (e.g., MongoDB or PostgreSQL) for dynamic user management.
- Add role-based authorization for user permissions.
- Implement rate limiting and account lockout mechanisms.

---

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute.

---

## Author

- [userpeaseonly](#)  
