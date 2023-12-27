const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const services = require("../Services/Index");

const createPost = async (req, res) => {
  const { email, title, content } = req.body;
  if (!email || !title || !content) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  const emailExist = services.checkEmailUser(email);
  if (!emailExist) {
    return res
      .status(404)
      .json({ Warning: "Email fornecido não pertence a nenhum Usuário!" });
  }
  try {
    await prisma.user.update({
      where: { email: email },
      data: { posts: { create: { title: title, content: content } } },
    });
    return res.status(201).json({ Message: "Post criado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const readAllPosts = async (req, res) => {
  try {
    const data = await prisma.post.findMany({});
    res.status(201).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const readPostsByUser = async (req, res) => {
  const idAuth = req.params.id;
  if (!idAuth) {
    return res.status(400).json({ Error: "ID fornecido não é válido" });
  }
  const IdExist = services.checkIdUser(idAuth);
  if (!IdExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
  }
  try {
    const data = await prisma.post.findMany({ where: { authorId: idAuth } });
    if (data.length === 0) {
      return res
        .status(201)
        .json({ Error: "O usuário ainda não tem nenhum post!" });
    }
    return res.status(201).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const findPostById = async (req, res) => {
  const idPost = req.params.id;
  if (!idPost) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const IdExist = services.checkIdUser(idPost);
  if (!IdExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Post!" });
  }
  try {
    const data = await prisma.post.findUnique({ where: { id: idPost } });
    if (!data) {
      return res
        .status(404)
        .json({ Error: "Nenhum post foi encontrado com id fornecido!" });
    }
    return res.status(201).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updatePost = async (req, res) => {
  const idPost = req.params.id;
  if (!idPost) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const IdExist = services.checkIdUser(idPost);
  if (!IdExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Post!" });
  }
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  try {
    await prisma.post.update({
      where: { id: idPost },
      data: { title: title, content: content },
    });
    return res.status(201).json({ Message: "Post atualizado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deletePost = async (req, res) => {
  const idPost = req.params.id;
  if (!idPost) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const IdExist = services.checkIdUser(idPost);
  if (!IdExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Post!" });
  }
  try {
    await prisma.post.delete({ where: { id: idPost } });
    return res.status(201).json({ Message: "Post excluído com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteAllPostsByUser = async (req, res) => {
  const idAuth = req.params.id;
  if (!idAuth) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const IdExist = services.checkIdUser(idAuth);
  if (!IdExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
  }
  try {
    await prisma.post.deleteMany({ where: { authorId: idAuth } });
    return res.status(201).json({
      Message: "Todos os Posts dos Usuário foram excluídos com sucesso!",
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = {
  createPost,
  readAllPosts,
  readPostsByUser,
  findPostById,
  updatePost,
  deletePost,
  deleteAllPostsByUser,
};
