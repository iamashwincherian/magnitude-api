const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started running on http://localhost:${PORT}`);
});
