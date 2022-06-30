const router = require("express").Router();
const Authenticate = require("../middlewares/authenticate");
const Customer = require("../models/Customer");
const Project = require("../models/Project");

router.post("/projects/:id/customers", Authenticate, async (req, res, next) => {
    const {
        user,
        body: { name, email },
        params: { id },
    } = req;

    const project = await Project.findOne({ id, user });
    const customer = await Customer.create({ project, name, email });

    res.send({
        message: `Added new customer to the project: ${project.name}`,
        data: { customer },
    });
});

router.get("/projects/:id/customers", Authenticate, async (req, res, next) => {
    const {
        user,
        params: { id },
    } = req;

    const project = await Project.findOne({ id, user });
    const customers = await Customer.find({ project });

    res.send({
        data: { customers },
    });
});

module.exports = router;
