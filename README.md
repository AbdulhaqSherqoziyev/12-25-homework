# 12-25 Homework

This is a Node.js and Express.js based project to practice CRUD operations using JSON files as a database. The project includes user management and blog post functionalities.

## Features

- User Registration
- User Login
- Profile Management (View, Update, Delete)
- Blog Post Management (Create, Read, Update, Delete)
- Comments on Blog Posts
- JSON-based storage for users and blogs

## Endpoints

### User Endpoints
1. **Register a User**  
   `POST /register`  
   Registers a new user.

2. **Login**  
   `POST /login`  
   Authenticates a user.

3. **View Profile**  
   `GET /profile/:identifier`  
   View user profile by `username` or `email`.

4. **Update Profile**  
   `PUT /profile/:identifier`  
   Update profile information by `username` or `email`.

5. **Delete Profile**  
   `DELETE /profile/:identifier`  
   Delete a user by `username` or `email`.

### Blog Endpoints
1. **Create Blog Post**  
   `POST /blog`  
   Creates a new blog post.

2. **View Blog Posts**  
   `GET /blog`  
   Retrieves all blog posts.

3. **Update Blog Post**  
   `PUT /blog/:id`  
   Updates a blog post by ID.

4. **Delete Blog Post**  
   `DELETE /blog/:id`  
   Deletes a blog post by ID.

5. **Add Comment to Blog Post**  
   `POST /blog/:id/comments`  
   Adds a comment to a specific blog post.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulhaqSherqoziyev/12-25-homework.git
