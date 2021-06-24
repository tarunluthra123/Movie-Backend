const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    watchlist: [
        {
            tmdb_id: Number,
            media: String,
        },
    ],
    favourites: [
        {
            tmdb_id: Number,
            media: String,
        },
    ],
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
