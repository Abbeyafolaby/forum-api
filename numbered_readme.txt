1	# Forum API
2	
3	Modern forum backend API with threaded comments, user discussions, and comprehensive community features.
4	
5	## Description
6	
7	A comprehensive forum backend API that enables rich community discussions with threaded/nested comments, user management, and moderation tools.
8	
9	## Features
10	
11	- Threaded Comments: Multi-level nested comment system with unlimited depth
12	- User Management: Registration, profiles, and reputation system
13	- Discussion Topics: Create and manage discussion threads with categories
14	- User Roles: Different permission levels (Admin, Moderator, User)
15	
16	## Installation & Usage
17	
18	### Prerequisites
19	- Node.js (v16 or higher)
20	- npm or yarn package manager
21	
22	### Installation
23	```bash
24	# Clone the repository
25	git clone https://github.com/yourusername/forum-api.git
26	
27	# Navigate to project directory
28	cd forum-api
29	
30	# Install dependencies
31	npm install
32	
33	# Create environment file
34	cp .env.example .env
35	
36	# Start the development server
37	npm start
38	```
39	
40	### Usage
41	The API runs at `http://localhost:3000` by default.
42	
43	## Auth Endpoints
44	
45	- `POST /auth/signup` — Register a new user
46	  - Body:
47	  ```json
48	  {
49	    "name": "John Bay",
50	    "email": "johnbay@mail.com",
51	    "password": "johnspassword",
52	    "role": "user" // optional, accepts "admin" or "user"; defaults to "user"
53	  }
54	  ```
55	
56	- `POST /auth/login` — Login and receive a JWT
57	  - Body:
58	  ```json
59	  {
60	    "email": "johnbay@mail.com",
61	    "password": "johnspassword"
62	  }
63	  ```
64	
65	Include the token as `Authorization: Bearer <token>` to access protected routes.
66	
67	## Threads Endpoints
68	
69	- `POST /threads` — Create a new thread (auth required)
70	  - Headers: `Authorization: Bearer <token>`
71	  - Body:
72	  ```json
73	  {
74	    "title": "How to learn Node.js?",
75	    "body": "Share your best resources and tips."
76	  }
77	  ```
78	
79	- `GET /threads` — List all threads (public)
80	
81	- `DELETE /threads/:id` — Delete a thread (admin only)
82	  - Headers: `Authorization: Bearer <admin token>`
83	  - Notes: Requires the requesting user to have `isAdmin: true` or `role: 'admin'`. Deleting a thread also removes all its comments.
84	
85	## Comments Endpoints
86	
87	- `POST /threads/:id/comments` — Add a top-level comment to a thread (auth)
88	  - Headers: `Authorization: Bearer <token>`
89	  - Body:
90	  ```json
91	  { "content": "This is a comment" }
92	
93	- `POST /comments/:id/reply` — Reply to an existing comment (auth)
94	  - Headers: `Authorization: Bearer <token>`
95	  - Body:
96	  ```json
97	  { "content": "This is a reply" }
98	
99	Notes:
100	- Both comment endpoints require a non-empty `content` string.
101	- Replies inherit the thread from the parent comment.
102	
103	## Voting Endpoints
104	
105	- `POST /threads/:id/vote` → Vote on a thread (auth)
106	  - Headers: `Authorization: Bearer <token>`
107	  - Body:
108	  ```json
109	  { "value": 1 }
110	  ```
111	  - Notes: Use `1` for upvote, `-1` for downvote. Sending the same vote twice returns 400. Sending the opposite value flips your vote.
112	
113	- `POST /comments/:id/vote` → Vote on a comment (auth)
114	  - Headers: `Authorization: Bearer <token>`
115	  - Body:
116	  ```json
117	  { "value": -1 }
118	  ```
119	  - Notes: Use `1` for upvote, `-1` for downvote. One vote per user per comment; duplicate same-value vote returns 400; opposite value flips your vote.
120	
121	## Technologies Used
122	
123	- Node.js — Runtime environment
124	- Express.js — Web framework
125	
126	## Author
127	
128	**Abiodun Afolabi** — Backend Developer
