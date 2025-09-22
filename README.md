# Forum API
**Abiodun Afolabi** — Backend Developer

## Admin Moderation

- GET /admin/threads � List all threads (admin only)
  - Headers: Authorization: Bearer <admin token>
  - Returns all threads, newest first, with author info.

- DELETE /admin/comments/:id � Delete a comment (admin only)
  - Headers: Authorization: Bearer <admin token>
  - Deletes the target comment and its replies.

Both routes require admin role via roleCheck('admin') middleware.

**Abiodun Afolabi** — Backend Developer
# Forum API

Modern forum backend API with threaded comments, user discussions, and comprehensive community features.

## Description

A comprehensive forum backend API that enables rich community discussions with threaded/nested comments, user management, and moderation tools.

## Features

- Threaded Comments: Multi-level nested comment system with unlimited depth
- User Management: Registration, profiles, and reputation system
- Discussion Topics: Create and manage discussion threads with categories
- User Roles: Different permission levels (Admin, Moderator, User)

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
The API runs at `http://localhost:3000` by default.

## Auth Endpoints

- `POST /auth/signup` — Register a new user
  - Body:
  ```json
  {
    "name": "John Bay",
    "email": "johnbay@mail.com",
    "password": "johnspassword",
    "role": "user" // optional, accepts "admin" or "user"; defaults to "user"
  }
  ```

- `POST /auth/login` — Login and receive a JWT
  - Body:
  ```json
  {
    "email": "johnbay@mail.com",
    "password": "johnspassword"
  }
  ```

Include the token as `Authorization: Bearer <token>` to access protected routes.

## Threads Endpoints

- `POST /threads` — Create a new thread (auth required)
  - Headers: `Authorization: Bearer <token>`
  - Body:
  ```json
  {
    "title": "How to learn Node.js?",
    "body": "Share your best resources and tips."
  }
  ```

- `GET /threads` — List all threads (public)

- `DELETE /threads/:id` — Delete a thread (admin only)
  - Headers: `Authorization: Bearer <admin token>`
  - Notes: Requires the requesting user to have `isAdmin: true` or `role: 'admin'`. Deleting a thread also removes all its comments.

## Comments Endpoints

- `POST /threads/:id/comments` — Add a top-level comment to a thread (auth)
  - Headers: `Authorization: Bearer <token>`
  - Body:
  ```json
  { "content": "This is a comment" }

- `POST /comments/:id/reply` — Reply to an existing comment (auth)
  - Headers: `Authorization: Bearer <token>`
  - Body:
  ```json
  { "content": "This is a reply" }

Notes:
- Both comment endpoints require a non-empty `content` string.
- Replies inherit the thread from the parent comment.

## Voting Endpoints

- `POST /threads/:id/vote` → Vote on a thread (auth)
  - Headers: `Authorization: Bearer <token>`
  - Body:
  ```json
  { "value": 1 }
  ```
  - Notes: Use `1` for upvote, `-1` for downvote. Sending the same vote twice returns 400. Sending the opposite value flips your vote.

- `POST /comments/:id/vote` → Vote on a comment (auth)
  - Headers: `Authorization: Bearer <token>`
  - Body:
  ```json
  { "value": -1 }
  ```
  - Notes: Use `1` for upvote, `-1` for downvote. One vote per user per comment; duplicate same-value vote returns 400; opposite value flips your vote.

## Technologies Used

- Node.js — Runtime environment
- Express.js — Web framework

## Admin Moderation

- `GET /admin/threads` ? List all threads (admin only)
  - Headers: `Authorization: Bearer <admin token>`
  - Returns all threads, newest first, with author info.

- `DELETE /admin/comments/:id` ? Delete a comment (admin only)
  - Headers: `Authorization: Bearer <admin token>`
  - Deletes the target comment and its replies.

Both routes require the 
ole of dmin (or isAdmin: true) via 
oleCheck('admin') middleware.

## Author

**Abiodun Afolabi** — Backend Developer
