const router = require("express").Router();
const User = require("../models/User");

// Fetch the entire watchlist
router.get("/", async (req, res) => {
    const _id = req.user._id;
    try {
        const user = await User.findOne({ _id });
        const watchlist = user.watchlist;
        res.status(200).send({ watchlist, details: "Success" });
    } catch (error) {
        res.status(404).send({ error: "User not found", details: error });
    }
});

// Add a new movie to the watchlist
router.post("/", async (req, res) => {
    const { tmdb_id, media } = req.body;

    if (!tmdb_id || !media) {
        return res.status(400).send({ msg: "Id or media type missing" });
    }

    const item = { tmdb_id, media };

    const _id = req.user._id;
    try {
        await User.updateOne({ _id }, { $push: { watchlist: item } });
        res.status(201).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

// Delele the movie from the watchlist, if it exists
router.patch("/", async (req, res) => {
    const { tmdb_id, media } = req.body;
    const item = { tmdb_id, media };

    const _id = req.user._id;
    try {
        await User.updateOne({ _id }, { $pull: { watchlist: item } });
        res.status(200).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

module.exports = router;
