const UserService = require('../services/user-service');
const userService = new UserService();

const register = async (req, res) => {
  try {
    const { token, user } = await userService.register(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};



module.exports = { register, login };
