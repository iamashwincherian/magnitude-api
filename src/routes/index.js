const router = require("express").Router();

const authRoutes = require("./auth");
const projectRoutes = require("./project");
const userRoutes = require("./user");
const customerRoutes = require("./customer");

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/", customerRoutes);

module.exports = router;
