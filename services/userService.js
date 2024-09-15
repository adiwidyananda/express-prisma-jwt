const { prisma } = require("../utils/db");

const getAllUsers = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  try {
    const users = await prisma.user.findMany({
      skip: skip,
      take: take,
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      data: users,
      meta: {
        totalUsers,
        totalPages,
        currentPage: page,
        pageSize: pageSize,
      },
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: userData,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
