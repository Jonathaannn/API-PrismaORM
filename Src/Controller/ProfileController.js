const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const services = require("../Services/Index");

const createProfile = async (req, res) => {
  const { email, profile } = req.body;
  if (!email || !profile) {
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
    const dataUser = await prisma.user.findUnique({
      where: { email: email },
      include: { profile },
    });
    if (dataUser.profile === null) {
      await prisma.user.update({
        where: { email: email },
        data: { profile: { create: profile } },
      });
      return res.status(201).json({ Message: "Profile criado com sucesso!" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: { profile: { update: profile } },
      });
      return res
        .status(201)
        .json({ Message: "Profile atulizado com sucesso!" });
    }
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updateProfile = async (req, res) => {
  const { email, profile } = req.body;
  if (!email || !profile) {
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
      data: { profile: { update: profile } },
    });
    return res
      .status(201)
      .json({ Message: "Profile atualizado com sucesso! com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteProfile = async (req, res) => {
  const { email } = req.body;
  if (!email) {
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
      data: { profile: null },
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = { createProfile, updateProfile, deleteProfile };
