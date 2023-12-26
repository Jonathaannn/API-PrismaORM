const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (name === "" || email === "") {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  try {
    await prisma.user.create({ data: { name: name, email: email } });
    res.status(201).json({ Message: "Usuário criado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const readUser = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      include: { posts: true, profile: true },
    });
    res.status(200).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const findUserById = async (req, res) => {
  const idUser = req.params.id;
  if (!idUser) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  try {
    const data = await prisma.user.findUnique({
      where: { id: idUser },
      include: { posts: true, profile: true },
    });
    if (data === undefined) {
      return res.status(404).json({ Error: "Usuário não encontrado!" });
    }
    return res.status(200).json(data);
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (name === "" || email === "") {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  const idUser = req.params.id;
  if (!idUser) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  try {
    await prisma.user.update({
      where: { id: idUser },
      data: { name: name, email: email },
    });
    return res.status(200).json({ Message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteUser = async (req, res) => {
  const idUser = req.params.id;
  if (!idUser) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  try {
    await prisma.user.delete({ where: { id: idUser } });
    return res.status(201).json({ Mssage: "Usuário deletado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = { createUser, readUser, findUserById, updateUser, deleteUser };
