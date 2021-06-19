const router = require("express").Router();
const User = require("../models/User");

// Fetch the entire watchlist
router.get("/", async (req, res) => {
    const _id = req.user._id;
    try {
        const user = await User.findOne({ _id });
        const watch = user.watch;
        res.status(200).send({ watch, details: "Success" });
    } catch (error) {
        res.status(404).send({ error: "User not found", details: error });
    }
});

// Add a new movie to the watchlist
router.post("/", async (req, res) => {
    const movie_id = req.body.movie_id;

    const _id = req.user._id;
    try {
        await User.updateOne({ _id }, { $push: { watch: movie_id } });
        res.status(200).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

// Delele the movie from the watchlist, if it exists
router.patch("/", async (req, res) => {
    const movie_id = req.body.movie_id;

    const _id = req.user._id;
    try {
        await User.updateOne({ _id }, { $pull: { watch: movie_id } });
        res.status(200).send({ msg: "Success" });
    } catch (error) {
        res.status(404).send({ error: "Could not update", details: error });
    }
});

module.exports = router;
