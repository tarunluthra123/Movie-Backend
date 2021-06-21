const jwtMiddleware = require("express-jwt");
const config = require("../config");
const JWT_ACCESS_SECRET = config.JWT_ACCESS_SECRET;

module.exports = jwtMiddleware({
    secret: JWT_ACCESS_SECRET,
    algorithms: ["HS256"],
}).unless({
    path: [/api\/auth*/, "/api/ping"],
});
