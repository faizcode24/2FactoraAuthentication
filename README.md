# Two-Factor Authentication System

This is a two-factor authentication system built using Node.js and the following technologies:
- **bcryptjs**: For hashing passwords.
- **cors**: For handling Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.
- **express**: For building the web server.
- **express-session**: For managing session data.
- **jsonwebtoken**: For handling authentication tokens.
- **mongoose**: For interacting with MongoDB.
- **passport**: For authentication handling.
- **passport-local**: For local authentication strategies.
- **qrcode**: For generating QR codes for the second authentication factor.
- **speakeasy**: For generating Time-based One-Time Passwords (TOTP) for two-factor authentication.

## Installation

1. Clone the repository: 
   ```bash
   git clone <your-repository-url>
2. Navigate to the project directory:
   ```bash
   cd <your-project-directory>
3. Install dependencies:
   ```bash
    npm install

4. Create a .env file and add your environment variables:

    ```bash
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    SESSION_SECRET=<your-session-secret>

Usage
Start the server:
   you can use the npm start or you can use the nodemon to start the server .



# Features

- User Authentication: Users can register and log in using their username and password.

- Two-Factor Authentication (2FA): After login, users can set up 2FA by scanning a QR code using an authenticator app.

- Session Management: The application uses express-session to manage user sessions.

- JWT Authentication: After login and 2FA, users are provided with a JWT token for secure API access.

# Tech Stack

- Node.js: Server-side JavaScript runtime.

- Express.js: Web framework for Node.js.

- MongoDB: NoSQL database for storing user data.

- Passport.js: Authentication middleware for Node.js.

- Speakeasy: For generating TOTP codes for 2FA.

- QRCode: For generating QR codes for easy setup of TOTP in authenticator apps.



   


  
