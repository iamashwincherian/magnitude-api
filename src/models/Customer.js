const mongoose = require("mongoose");
const Project = require("./Project");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Project,
    },
});

module.exports = mongoose.model("customer", CustomerSchema);
