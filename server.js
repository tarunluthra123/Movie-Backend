const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authError = require("./middlewares/autherror");
const jwtMiddleware = require("./middlewares/jwt");

const router = require("./routes");
const authRouter = require("./routes/auth");

const config = require("./config");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtMiddleware);
app.use(authError);

// Router middlewares
app.use("/", router);
app.use("/auth", authRouter);

// Protected route for testing purposes
app.get("/ping", (req, res) => {
    return res.send({
        status: "Healthy",
        user: req.user,
    });
});

// Unprotected route for testing purposes
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

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log("Server started on port : ", PORT);
});
