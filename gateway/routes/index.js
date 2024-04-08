const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");

const router = express.Router();

router.use("/", authRoutes);
router.use("/", userRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
