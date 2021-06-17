const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret123";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secret123";

const accessTokenLife = "15min";
const refreshTokenLife = "1 day";

const MONGO_URL =
    process.env.MONGO_URL || "mongodb://localhost:27017/movie_project_db";

const PORT = process.env.PORT || 5000;

module.exports = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    accessTokenLife,
    refreshTokenLife,
    MONGO_URL,
    PORT,
};
