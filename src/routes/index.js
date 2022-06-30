const router = require("express").Router();

const authRoutes = require("./auth");
const projectRoutes = require("./project");
const userRoutes = require("./user");
const customerRoutes = require("./customer");
const eventRoutes = require("./event");

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/", customerRoutes);
router.use("/", eventRoutes);

module.exports = router;
