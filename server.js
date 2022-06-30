const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Error handling
app.use((err, req, res, next) => {
    if (!err) next();
    const status = err.statusCode || 500;
    let payload = { message: err.message };
    if (process.env.DEBUG === "true")
        payload = { ...payload, stack: err.stack };
    res.status(status).send(payload);
});

app.listen(PORT, () => {
    console.log(`Server started running on http://localhost:${PORT}`);
});
