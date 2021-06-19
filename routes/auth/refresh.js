const { refreshAccessToken } = require("../../utils/jwt");
const router = require("express").Router();

router.post("/", (req, res) => {
    const { refresh } = req.body;
    if (!refresh) {
        res.status(400).send({ error: "No refresh token" });
    }

    const { error, detail, access } = refreshAccessToken(refresh);
    if (error) {
        return res.status(400).send({ error, detail });
    }

    res.status(200).send({ access, detail });
});

module.exports = router;
