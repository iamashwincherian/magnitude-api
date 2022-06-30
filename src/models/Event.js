const mongoose = require("mongoose");
const Customer = require("./Customer");
const Project = require("./Project");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Customer,
        required: true,
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Project,
        required: true,
    },
});

module.exports = mongoose.model("event", EventSchema);
