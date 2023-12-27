const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const services = require("../Services/Index");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (name === "" || email === "") {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  const emailExist = services.checkEmailUser(email);
  if (emailExist) {
    return res.status(400).json({ Warning: "Email já foi cadastrado!" });
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

const readUsers = async (req, res) => {
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
  const idExist = services.checkIdUser(idUser);
  if (!idExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
  }
  try {
    const data = await prisma.user.findUnique({
      where: { id: idUser },
      include: { posts: true, profile: true },
    });
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
  const idExist = services.checkIdUser(idUser);
  if (!idExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
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
  const idExist = services.checkIdUser(idUser);
  if (!idExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
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

module.exports = {
  createUser,
  readUsers,
  findUserById,
  updateUser,
  deleteUser,
};
