const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwtMiddleware = require("express-jwt");
require("dotenv").config();

const router = require("./routes");
const authRouter = require("./routes/auth");
const config = require("./config");

const app = express();

const PORT = config.PORT;
const JWT_ACCESS_SECRET = config.JWT_ACCESS_SECRET;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    jwtMiddleware({ secret: JWT_ACCESS_SECRET, algorithms: ["HS256"] }).unless({
        path: [/\/auth*/, "/hello"],
    })
);
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Invalid Auth Token" });
    }
});
app.use("/", router);
app.use("/auth", authRouter);

// Protected route
app.get("/ping", (req, res) => {
    return res.send({
        status: "Healthy",
        user: req.user,
    });
});

// Unprotected route
app.get("/hello", (req, res) => {
    return res.send({ msg: "Hello" });
});

mongoose.connect(
    config.MONGO_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => {
        console.log("DB connected");
    }
);

mongoose.connection.on("error", () => {
    console.error("Could not connect to database");
});

app.listen(PORT, () => {
    console.log("Server started on port : ", PORT);
});
