const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
app.use(cors());
app.use(jwtMiddleware);
app.use(authError);

// Router middlewares
app.use("/api", router);
app.use("/api/auth", authRouter);

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
