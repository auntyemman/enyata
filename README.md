# Enyata E-commerce APIs

## Features
User registration and authentication
Requesting fuel delivery
Tracking delivery status
Managing user profile

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreQL
- **Authentication:** JSON Web Tokens (JWT), Argon2 for password hashing
- **Validation:** Class-validator for input validation
- **Email Service:** Nodemailer for sending email notifications
- **Security:** Helmet for HTTP header security, CORS for cross-origin resource sharing

## Getting Started
1. **Clone the repository:**
git clone 

2. **Install dependencies:**
cd hunter
npm install or yarn install

3. **Set up environment variables:**
- Create a `.env` file in the root directory.
- Define the following variables in the `.env` file:
  ```
  PORT=2024
  DATABASE_URI=your_database_connection_string
  JWT_SECRET=your_jwt_secret_key
  FRONTEND_BASE_URL=http://localhost:your_frontend_port
  ```

4. **Start the development server:**
npm run dev or yarn dev

5. **Access the application:**
- Open a web browser and navigate to `http://localhost:2024` to access the application.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributions
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request
