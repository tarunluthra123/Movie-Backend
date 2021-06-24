const { refreshAccessToken } = require("../../utils/jwt");
const router = require("express").Router();

router.post("/", (req, res) => {
    const { refresh } = req.body;
    if (!refresh) {
        return res.status(400).send({ error: "No refresh token" });
    }

    const { error, details, access } = refreshAccessToken(refresh);
    if (error) {
        return res.status(400).send({ error, details });
    }

    res.status(200).send({ access, details });
});

module.exports = router;
