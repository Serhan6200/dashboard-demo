const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 9000,
  nodeEnv: process.env.NODE_ENV || "development",
};
