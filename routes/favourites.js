const router = require("express").Router();
const User = require("../models/User");

// Fetch the entire favourites
router.get("/", async (req, res) => {
    const _id = req.user._id;
    try {
        const user = await User.findOne({ _id });
        const favourites = user.favourites;
        res.status(200).send({ favourites, details: "Success" });
    } catch (error) {
        res.status(404).send({ error: "User not found", details: error });
    }
});

// Add a new movie to the favourites
router.post("/", async (req, res) => {
    const { tmdb_id, media } = req.body;

    const _id = req.user._id;
    try {
        await User.updateOne(
            { _id },
            { $push: { favourites: { media, tmdb_id } } }
        );
        res.status(201).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

// Delele the movie from the favourites, if it exists
router.patch("/", async (req, res) => {
    const { tmdb_id, media } = req.body;
    const item = { tmdb_id, media };

    const _id = req.user._id;
    try {
        await User.updateOne({ _id }, { $pull: { favourites: item } });
        res.status(200).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

module.exports = router;
