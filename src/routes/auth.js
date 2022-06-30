const router = require("express").Router();
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signJWT = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_SECRET);
};

router.post("/login", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username }, { email }] });
        const isPasswordValid = await bcyrpt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Password incorrect!");
        const token = signJWT(user);
        res.send({
            message: "Successfully Logged In",
            data: {
                token,
                user,
            },
        });
    } catch (err) {
        next(err);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;
        const hashedPassword = await bcyrpt.hash(password, 10);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        const token = signJWT(user);

        res.json({
            message: "User successfully created",
            data: {
                token,
                user,
            },
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
