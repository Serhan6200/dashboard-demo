const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: "3mb" }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// HTTP logs
app.use(morgan("short"));

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "pageNotFound"));
});

// global error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `✅ Server running on http://localhost:${config.port} [${config.nodeEnv}]`
  );
});
