const express = require("express");
const { statusController } = require("../controllers");
const asyncHandler = require("../middlewares/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(statusController.getStatus));

module.exports = router;
