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
  const emailExist = await services.checkEmailUser(email);
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
    if (!dataUser.profile) {
      await prisma.user.update({
        where: { email: email },
        data: { profile: { create: { bio: profile } } },
      });
      return res.status(201).json({ Message: "Perfil criado com sucesso!" });
    }
    await prisma.user.update({
      where: { email: email },
      data: { profile: { update: { bio: profile } } },
    });
    return res.status(201).json({ Message: "Perfil atulizado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const updateProfile = async (req, res) => {
  const idUser = parseInt(req.params.id);
  if (!idUser) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const idExist = await services.checkIdUser(idUser);
  if (!idExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
  }
  const { profile } = req.body;
  if (!profile) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" });
  }
  try {
    await prisma.user.update({
      where: { id: idUser },
      data: { profile: { update: { bio: profile } } },
    });
    return res.status(201).json({ Message: "Perfil atualizado com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const deleteProfile = async (req, res) => {
  const idUser = parseInt(req.params.id);
  if (!idUser) {
    return res.status(400).json({ Error: "ID fornecido não é válido!" });
  }
  const idExist = await services.checkIdUser(idUser);
  if (!idExist) {
    return res
      .status(404)
      .json({ Warning: "ID fornecido não pertence a nenhum Usuário!" });
  }
  try {
    await prisma.user.update({
      where: { id: idUser },
      data: { profile: { delete: true } },
    });
    return res.status(201).json({ Message: "Perfil excluído com sucesso!" });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = { createProfile, updateProfile, deleteProfile };
