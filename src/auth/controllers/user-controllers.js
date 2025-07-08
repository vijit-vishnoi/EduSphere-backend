const UserService = require('../services/user-service');
const userService = new UserService();

const register = async (req, res) => {
  try {
    const {token,user} = await userService.register(req.body);
    res.status(201).json({ token, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req.body);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


module.exports = { register, login };
