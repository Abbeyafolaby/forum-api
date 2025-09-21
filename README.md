# Forum API

Modern forum backend API with threaded comments, user discussions, and comprehensive community features.

## Description

A comprehensive forum backend API that enables rich community discussions with threaded/nested comments, user management, and moderation tools.

## Features

- **Threaded Comments**: Multi-level nested comment system with unlimited depth
- **User Management**: Registration, profiles, and reputation system
- **Discussion Topics**: Create and manage discussion threads with categories
- **User Roles**: Different permission levels (Admin, Moderator, User)

## Installation & Usage

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/forum-api.git

# Navigate to project directory
cd forum-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm start
```

### Usage
The API will be available at `http://localhost:3000`

## Auth Endpoints

- `POST /auth/signup` – Register a new user
  - Body: 
  ```json
  { 
    "name": "John Bay", 
    "email": "johnbay@mail.com", 
    "password": "johnspassword" 
  }
  ```

- `POST /auth/login` – Login and receive a JWT
  - Body: 
  ```json
  { 
    "email": "johnbay@mail.com", 
    "password": "johnspassword" 
  }
  ```

Include the token as `Authorization: Bearer <token>` to access protected routes.

## Environment Variables

Copy `.env.example` to `.env` and set values:

- `PORT` – Server port (default: 3000)
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – Long random string used to sign JWTs
- `JWT_EXPIRES_IN` – Optional, default `7d`



## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework

## Author

**Abiodun Afolabi** - Backend Developer
