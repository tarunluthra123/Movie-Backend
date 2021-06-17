const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { generateAccessTokenPair } = require("../../utils/jwt");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: "Username or password missing" });
    }

    if (await User.findOne({ username })) {
        return res.status(400).send({ error: "Username already taken" });
    }

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        await user.save();
    } catch (error) {
        return res.status(400).send({ error });
    }

    const { access, refresh } = generateAccessTokenPair(user.toJSON());
    return res.status(201).send({
        access,
        refresh,
        user: { watch: user.watch, mymovies: user.mymovies, name: user.name },
    });
});

module.exports = router;
