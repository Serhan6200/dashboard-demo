const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes");
const app = express();

app.use(cors());

app.use("/api", routes);

app.listen(config.port, () => {
  console.log(
    `✅ Server running on http://localhost:${config.port} [${config.nodeEnv}]`
  );
});
