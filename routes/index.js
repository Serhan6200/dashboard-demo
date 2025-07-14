const express = require("express");
const testRoute = require("./test.route");
const statusRoute = require("./status.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/status",
    route: statusRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
