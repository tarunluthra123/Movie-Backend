const bcrypt = require('bcrypt');
const Users = require('../models/User');

class UserService {
  static async getUserByEmail(email) {
    const user = await Users().where('email', email).first();
    return user;
  }

  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

	static async createUser(user) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		await Users().insert(user);
		return this.getUserByEmail(user.email);
	}
}

module.exports = UserService;