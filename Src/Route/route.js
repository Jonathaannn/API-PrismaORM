const { Router } = require("express");
const route = Router();
const user = require("../Controller/UserController");
const profile = require("../Controller/ProfileController");
const post = require("../Controller/PostController");

// Rotas de controle do Usuário
route.post("/user", user.createUser);
route.get("/user", user.readUsers);
route.get("/user/:id", user.findUserById);
route.patch("/user/:id", user.updateUser);
route.delete("/user/:id", user.deleteUser);

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
route.patch("/post/publish/:id", post.publishPost);
route.delete("/post/:id", post.deletePost);
route.delete("/post/all/:id", post.deleteAllPostsByUser);

module.exports = route;
