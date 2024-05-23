const bcrypt = require("bcryptjs");
const { prisma } = require("../utils/db");
const { generateToken } = require("../utils/jwt");

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
  const token = generateToken(user);
  return { user, token };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);
  return { user, token };
};

const me = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return { user };
};

module.exports = { register, login, me };
