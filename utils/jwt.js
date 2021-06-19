const jwt = require("jsonwebtoken");
const config = require("../config");

function sanitizeUser(user) {
    delete user.watch;
    delete user.mymovies;
    delete user.password;
    delete user.name;
    delete user.exp;
}

function generateAccessTokenPair(user) {
    sanitizeUser(user);
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

function refreshAccessToken(refresh) {
    try {
        const decoded = jwt.verify(refresh, config.JWT_REFRESH_SECRET);
        sanitizeUser(decoded);
        const newAccessToken = jwt.sign(decoded, config.JWT_ACCESS_SECRET, {
            expiresIn: config.accessTokenLife,
        });
        return { error: null, access: newAccessToken, detail: "Success" };
    } catch (err) {
        console.log(err);
        return { error: "Invalid refresh token", detail: err, access: null };
    }
}

module.exports = {
    generateAccessTokenPair,
    refreshAccessToken,
};
