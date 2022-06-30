const router = require("express").Router();
const Authenticate = require("../middlewares/authenticate");
const User = require("../models/User");

const generateUniqueApiKey = async (user) => {
    // Creates random 4 digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newApiKey = user.username.slice(0, 4) + randomNum;

    // Generate key again if it already exists
    const existingUser = await User.findOne({ apiKey: newApiKey });
    if (existingUser) generateUniqueApiKey(user);

    return newApiKey;
};

router.post("/generate-apikey", Authenticate, async (req, res) => {
    const { user } = req;
    const apiKey = await generateUniqueApiKey(user);

    // Update api key
    user.apiKey = apiKey;
    user.save();

    res.send({
        data: { apiKey },
    });
});

module.exports = router;
