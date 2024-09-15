const { prisma } = require("../utils/db");

const getAllShops = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  try {
    const shops = await prisma.shop.findMany({
      skip: skip,
      take: take,
    });

    const totalShops = await prisma.shop.count();
    const totalPages = Math.ceil(totalShops / pageSize);

    return {
      data: shops,
      meta: {
        totalShops,
        totalPages,
        currentPage: page,
        pageSize: pageSize,
      },
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShops,
};
