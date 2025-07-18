const express = require("express");
const { testController } = require("../controllers");
const asyncHandler = require("../middlewares/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(testController.getTest));

module.exports = router;
