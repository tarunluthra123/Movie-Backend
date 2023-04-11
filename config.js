require("dotenv").config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret123";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret123";

const accessTokenLife = "30 min";
const refreshTokenLife = "1 day";

const DB_URL = process.env.DB_URL;

const PORT = process.env.PORT || 5555;

module.exports = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    accessTokenLife,
    refreshTokenLife,
    DB_URL,
    PORT,
};
