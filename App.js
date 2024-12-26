const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Middleware kelasi darsga kira olmayman va express.js haqida o'rganib qo'ydim

const readJsonFile = (filename) => {
  return JSON.parse(fs.readFileSync(filename, "utf8"));
};

const writeJsonFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};

app.post("/register", (req, res) => {
  const { username, password, fullName, age, email, gender } = req.body;

  const users = readJsonFile("database/users.json");

  if (username.length < 3)
    return res.status(400).send("Username must be at least 3 characters");
  if (password.length < 5)
    return res.status(400).send("Password must be at least 5 characters");
  if (age < 10)
    return res.status(400).send("You must be at least 10 years old");
  if (users.find((user) => user.username === username))
    return res.status(400).send("Username already exists");

  const newUser = {
    id: users.length + 1,
    username,
    password,
    fullName: fullName || "",
    age,
    email,
    gender: gender || "",
  };

  users.push(newUser);
  writeJsonFile("database/users.json", users);
  res.status(201).send("User registered successfully");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = readJsonFile("database/users.json");
  const user = users.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );

  if (!user) return res.status(400).send("Invalid username or password");
  res.status(200).send("Login successful");
});

app.get("/profile/:identifier", (req, res) => {
  const { identifier } = req.params;
  const users = readJsonFile("database/users.json");
  const user = users.find(
    (u) => u.username === identifier || u.email === identifier
  );

  if (!user) return res.status(404).send("User not found");
  res.status(200).json(user);
});

app.put("/profile/:identifier", (req, res) => {
  const { identifier } = req.params;
  const { fullName, age, email, gender } = req.body;

  const users = readJsonFile("database/users.json");
  const userIndex = users.findIndex(
    (u) => u.username === identifier || u.email === identifier
  );

  if (userIndex === -1) return res.status(404).send("User not found");

  const updatedUser = {
    ...users[userIndex],
    fullName: fullName || users[userIndex].fullName,
    age: age || users[userIndex].age,
    email: email || users[userIndex].email,
    gender: gender || users[userIndex].gender,
  };

  users[userIndex] = updatedUser;
  writeJsonFile("database/users.json", users);
  res.status(200).send("Profile updated successfully");
});

app.delete("/profile/:identifier", (req, res) => {
  const { identifier } = req.params;
  const users = readJsonFile("database/users.json");
  const userIndex = users.findIndex(
    (u) => u.username === identifier || u.email === identifier
  );

  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  writeJsonFile("database/users.json", users);
  res.status(200).send("Profile deleted successfully");
});

app.post("/blog", (req, res) => {
  const { title, slug, content, tags } = req.body;

  const blogs = readJsonFile("database/blog.json");

  const newBlog = {
    id: blogs.length + 1,
    title,
    slug,
    content,
    tags: tags || [],
    comments: [],
  };

  blogs.push(newBlog);
  writeJsonFile("database/blog.json", blogs);
  res.status(201).send("Blog post created successfully");
});

app.get("/blog", (req, res) => {
  const blogs = readJsonFile("database/blog.json");
  res.status(200).json(blogs);
});

app.put("/blog/:id", (req, res) => {
  const { id } = req.params;
  const { title, slug, content, tags } = req.body;

  const blogs = readJsonFile("database/blog.json");
  const blogIndex = blogs.findIndex((b) => b.id == id);

  if (blogIndex === -1) return res.status(404).send("Blog post not found");

  const updatedBlog = {
    ...blogs[blogIndex],
    title: title || blogs[blogIndex].title,
    slug: slug || blogs[blogIndex].slug,
    content: content || blogs[blogIndex].content,
    tags: tags || blogs[blogIndex].tags,
  };

  blogs[blogIndex] = updatedBlog;
  writeJsonFile("database/blog.json", blogs);
  res.status(200).send("Blog post updated successfully");
});

app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  const blogs = readJsonFile("database/blog.json");
  const blogIndex = blogs.findIndex((b) => b.id == id);

  if (blogIndex === -1) return res.status(404).send("Blog post not found");

  blogs.splice(blogIndex, 1);
  writeJsonFile("database/blog.json", blogs);
  res.status(200).send("Blog post deleted successfully");
});

app.post("/blog/:id/comments", (req, res) => {
  const { id } = req.params;
  const { user_id, comment } = req.body;

  const blogs = readJsonFile("database/blog.json");
  const blog = blogs.find((b) => b.id == id);

  if (!blog) return res.status(404).send("Blog post not found");

  const newComment = { user_id, comment };
  blog.comments.push(newComment);
  writeJsonFile("database/blog.json", blogs);

  res.status(201).send("Comment added successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
