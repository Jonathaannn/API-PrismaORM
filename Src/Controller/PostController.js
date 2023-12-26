const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { email, title, content } = req.body;
  if (!email || !title || !content) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  try {
    await prisma.user.update({
      where: { email: email },
      data: { posts: { create: { title: title, content: content } } },
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const readAllPost = async (req, res) => {
  try {
    const data = await prisma.post.findMany({});
    res.status(201).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const readPost = async (req, res) => {
  const idAuth = req.params;
  if (!idAuth) {
    return res.status(400).json({ Error: "ID fornecido não é válido" });
  }
  try {
    const data = await prisma.post.findMany({ where: { authorId: idAuth } });
    if (!data) {
      return res
        .status(404)
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
    return res.status(201).json({ Error: "ID fornecido não é válido!" });
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
