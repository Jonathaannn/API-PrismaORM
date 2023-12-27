const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkIdUser = async (idUser) => {
  try {
    const dataUser = await prisma.user.findUnique({ where: { id: idUser } });
    if (!dataUser) {
      return false;
    }
    return true;
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const checkEmailUser = async (emailUser) => {
  try {
    const dataUser = await prisma.user.findUnique({
      where: { email: emailUser },
    });
    if (!dataUser) {
      return false;
    }
    return true;
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

const checkIdPost = async (idPost) => {
  try {
    const dataUser = await prisma.post.findUnique({ where: { id: idPost } });
    if (!dataUser) {
      return false;
    }
    return true;
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    res.status(500).json({ Error: "Erro interno no servidor!" });
  }
};

module.exports = { checkIdUser, checkEmailUser, checkIdPost };
