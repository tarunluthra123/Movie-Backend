const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authTokenMiddleware = require("./middlewares/authToken");
const jwtMiddleware = require("./middlewares/jwt");

const router = require("./routes");

const config = require("./config");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(jwtMiddleware);
app.use(authTokenMiddleware);

// Router middlewares
app.use("/api", router);

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log("Server started on port : ", PORT);
});
