const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessTokenPair(user) {
    const accessToken = jwt.sign(user, config.JWT_ACCESS_SECRET, {
        expiresIn: config.accessTokenLife,
    });
    const refreshToken = jwt.sign(user, config.JWT_REFRESH_SECRET, {
        expiresIn: config.refreshTokenLife,
    });
    return {
        access: accessToken,
        refresh: refreshToken,
    };
}

module.exports = {
    generateAccessTokenPair,
};
