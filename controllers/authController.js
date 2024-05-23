const authService = require("../services/authService");
const { verifyToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const me = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided." });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    const { user } = await authService.me(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { register, login, me };
