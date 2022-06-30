const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.DB_CONNECTION_URL, () =>
        console.log("Connected to DB!")
    );
};

module.exports = { connect };
