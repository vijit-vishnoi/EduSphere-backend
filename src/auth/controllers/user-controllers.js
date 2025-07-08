const UserService = require('../services/user-service');
const userService = new UserService();

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
