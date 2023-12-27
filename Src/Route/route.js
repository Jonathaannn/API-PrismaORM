const { Router } = require("express");
const route = Router();
const user = require("../Controller/UserController");
const profile = require("../Controller/ProfileController");
const post = require("../Controller/PostController");

// Rotas de controle do Usuário
route.post("/users", user.createUser);
route.get("/users", user.readUsers);
route.get("/users/:id", user.findUserById);
route.patch("/users/:id", user.updateUser);
route.delete("/users/:id", user.deleteUser);

// Rotas de controle de Profile
route.post("/profile", profile.createProfile);
route.patch("/profile/:id", profile.updateProfile);
route.delete("/profile/:id", profile.deleteProfile);

// Rotas de controle do Post
route.post("/post", post.createPost);
route.get("/post", post.readAllPosts);
route.get("/post/me/:id", post.readPostsByUser);
route.get("/post/:id", post.findPostById);
route.patch("/post/:id", post.updatePost);
route.delete("/post/:id", post.deletePost);
route.delete("/post/all/:id", post.readAllPosts);

module.exports = route;
