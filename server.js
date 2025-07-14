const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const config = require("./config/config");
const morgan = require("morgan");
const routes = require("./routes");

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
app.use(morgan("dev"));

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/api", routes);

app.listen(config.port, () => {
  console.log(
    `✅ Server running on http://localhost:${config.port} [${config.nodeEnv}]`
  );
});
