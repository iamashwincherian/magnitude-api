const router = require("express").Router();
const Authenticate = require("../middlewares/authenticate");
const Customer = require("../models/Customer");
const Event = require("../models/Event");
const Project = require("../models/Project");

router.post("/projects/:id/events", Authenticate, async (req, res, next) => {
    try {
        const {
            user,
            body: { name, customer: email },
            params: { id },
        } = req;

        const project = await Project.findOne({ id }).populate("user");
        if (!project) throw new Error("Project doesn't exists");
        if (project.user.id !== user.id) {
            throw new Error("Unauthorized User");
        }

        const customer = await Customer.findOne({ project, email });
        if (!customer) throw new Error("Customer not found");

        const event = await Event.create({ project, customer, name });

        res.send({
            message: "Triggered event",
            data: { event },
        });
    } catch (err) {
        next(err);
    }
});

router.get("/projects/:id/events", Authenticate, async (req, res, next) => {
    const {
        params: { id },
    } = req;
    const events = await Event.find({ project: id });

    res.send({
        data: { events },
    });
});

module.exports = router;
