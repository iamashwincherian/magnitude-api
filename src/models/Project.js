const mongoose = require("mongoose");
const User = require("./User");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User,
    },
});

module.exports = mongoose.model("project", ProjectSchema);
