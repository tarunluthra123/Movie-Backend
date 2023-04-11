const UserService = require("../services/user");
const { serializeUser, refreshAccessToken } = require("../utils/jwt");

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        error: "Email or password missing",
      });
    }

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const valid = await UserService.comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({
        error: "Password does not match",
      });
    }

		const userJson = serializeUser(user);
    return res.status(200).json(userJson);
  }

  async create(req, res) {
		const { email, name, password } = req.body;
		if (!email || !password || !name) {
			return res.status(400).send({ error: "Fields missing" });
		}

		if (await UserService.getUserByEmail(email)) {
			return res.status(400).send({ error: "Email already taken" });
		}

		const user = await UserService.createUser(req.body);
		const userJson = serializeUser(user);
		return res.status(201).send(userJson);
  }

  refresh(req, res) {
    const { refresh: refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send({ error: "No refresh token" });
    }

    const { error, details, access } = refreshAccessToken(refreshToken);
    if (error) {
      return res.status(400).send({ error, details });
    }

    res.status(200).send({ access, details });
  }
}

module.exports = new UserController();
