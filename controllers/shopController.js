const shopService = require("../services/shopService");

const getShops = async (req, res) => {
  try {
    const shops = await shopService.getAllShops(req);
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShops,
};
