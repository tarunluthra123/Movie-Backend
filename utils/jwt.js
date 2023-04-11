const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessTokenPair(user) {
	if (user.password) {
		delete user.password;
	}
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
		const user = {
			id: decoded.id,
			name: decoded.name,
			email: decoded.email,
		}
		const newAccessToken = jwt.sign(user, config.JWT_ACCESS_SECRET, {
			expiresIn: config.accessTokenLife,
		});
		return { error: null, access: newAccessToken, details: "Success" };
	} catch (err) {
		console.log(err);
		return { error: "Invalid refresh token", details: err, access: null };
	}
}


function serializeUser(user) {
	const { access, refresh } = generateAccessTokenPair(user);
	return {
		access,
		refresh,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	};
}

module.exports = {
	generateAccessTokenPair,
	refreshAccessToken,
	serializeUser,
};
