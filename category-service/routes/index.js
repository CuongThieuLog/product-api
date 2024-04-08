const express = require("express");

const categoryRoute = require("./category.routes");

const router = express.Router();

router.use("/category/", categoryRoute);

module.exports = router;
