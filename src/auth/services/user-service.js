const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_SECRET } = process.env;

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ name, email, password, role }) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    return await this.userRepository.create({ name, email, password: hashed, role });
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token, user };
  }
}

module.exports = UserService;
