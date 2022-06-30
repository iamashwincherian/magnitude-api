const router = require("express").Router();
const Authenticate = require("../middlewares/authenticate");
const Project = require("../models/Project");

router.post("/", Authenticate, async (req, res, next) => {
    const { name } = req.body;
    const project = await Project.create({ name, user: req.user });
    res.send({
        message: "Created new project",
        data: { project },
    });
});

router.get("/", Authenticate, async (req, res, next) => {
    const projects = await Project.find({ user: req.user });
    res.send({
        data: { projects },
    });
});

module.exports = router;
