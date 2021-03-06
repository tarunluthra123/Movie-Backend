const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { generateAccessTokenPair } = require("../../utils/jwt");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({
            error: "Username or password missing",
        });
    }

    const user = await User.findOne({ username });

    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const { access, refresh } = generateAccessTokenPair(user.toJSON());
            return res.status(200).json({
                access,
                refresh,
                user: {
                    watchlist: user.watchlist,
                    favourites: user.favourites,
                    name: user.name,
                },
            });
        } else {
            return res.status(400).json({
                error: "Password does not match",
            });
        }
    } else {
        return res.status(401).json({ error: "User does not exist" });
    }
});

exports = module.exports = router;
