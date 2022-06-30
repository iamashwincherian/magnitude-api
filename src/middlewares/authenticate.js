const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const getUser = async (username) => await User.findOne({ username });

const Authenticate = async (req, res, next) => {
    try {
        let headerPayloadUser;
        const authHeaders = req.headers.authorization;
        const apiKeyHeader =
            req.headers["X-API-KEY"] || req.headers["x-api-key"];
        const token = authHeaders && authHeaders.split(" ")[1];
        if (token) {
            try {
                headerPayloadUser = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    throw new Error("Session Expired! Login Again");
                } else if (err instanceof jwt.JsonWebTokenError) {
                    throw new Error("Invalid token");
                }
            }
        } else if (apiKeyHeader) {
            try {
                headerPayloadUser = await User.findOne({
                    apiKey: apiKeyHeader,
                });
            } catch (err) {
                if (err instanceof mongoose.Error.DocumentNotFoundError) {
                    throw new Error("Invalid Api Key");
                }
            }
        } else if (!token && !apiKeyHeader) {
            throw new Error("User not authorized");
        }

        const user = await getUser(headerPayloadUser.username);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = Authenticate;
