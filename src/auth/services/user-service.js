const bcrypt = require('bcryptjs');
const ALLOWED_ROLES = ['student', 'teacher'];
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_SECRET } = process.env;

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ name, email, password, role }) {
    if (!ALLOWED_ROLES.includes(role)) {
    throw new Error('Invalid role');
  }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ name, email, password: hashed, role });

    const token = generateToken(user);
    return { token, user };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    console.log('Plain password:', password);
console.log('Stored hash from DB:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user);
    return { token, user };
  }
}

module.exports = UserService;
