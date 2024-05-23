const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connect = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

module.exports = { prisma, connect };
