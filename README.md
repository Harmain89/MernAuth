# MERN Authentication Project

## Overview
A full-stack authentication project using the MERN stack (MongoDB, Express, React, and Node.js). This setup provides a complete authentication flow with features such as:

- MongoDB integration for user data storage.
- JWT for secure user authentication.
- Cookies for session handling.
- Password encryption for user security.
- React Router for frontend routing.
- Pre-designed email templates for:
  - Registration
  - Email verification
  - OTP generation
  - Password reset
- Email sending via Brevo.
- Modern UI/UX design for seamless user interaction.

This project is actively being enhanced and advanced for more features and better performance.

## Features
- **Secure Authentication:**
  - Registration and login with password encryption.
  - JWT-based user authentication.
  - Email verification with OTP-based validation.
- **User Management:**
  - Reset password via email.
  - Resend verification emails.
- **Frontend:**
  - React-based frontend with responsive design.
  - Routing for authentication and user dashboard.
- **Backend:**
  - Node.js and Express.js server.
  - MongoDB database for persistent storage.
- **Email Functionality:**
  - Pre-designed email templates for various authentication events.
  - Brevo integration for reliable email delivery.

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- MongoDB
- npm or yarn

### Installation

#### Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

#### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your credentials:
   ```
   MONGODB_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net
   PORT=4000
   JWT_SECRET=yourSecretKey
   NODE_ENV='development'

   SMTP_USER='your-brevo-username'
   SMTP_PASS='your-brevo-password'
   SENDER_EMAIL='your-email@example.com'
   ```
5. Start the server:
   ```bash
   npm start
   ```

#### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with the backend URL:
   ```
   VITE_BACKEND_URL="http://localhost:4000"
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

### Running the Project
1. Ensure both the backend and frontend are running.
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## File Structure
```
.
├── client                 # Frontend React application
│   ├── public             # Static assets
│   ├── src                # Source files
│   │   ├── components     # Reusable React components
│   │   ├── pages          # React pages
│   │   ├── contexts       # Context API for state management
│   │   └── ...            # Other frontend files
│   └── ...
├── server                 # Backend Express application
│   ├── models             # MongoDB models
│   ├── routes             # API routes
│   ├── utils              # Utility functions
│   ├── ...                # Other backend files
│   └── index.js           # Main entry point for the server
└── README.md              # Project documentation
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your enhancements or fixes.

## License
This project is licensed under the [MIT License](LICENSE).

---

### Notes
- Active development is ongoing for further enhancements.
- Please feel free to report issues or request features in the [issues section](https://github.com/your-username/your-repo-name/issues).

Enjoy building with this comprehensive MERN authentication setup!
