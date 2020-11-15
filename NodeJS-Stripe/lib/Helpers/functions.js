"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = exports.validateUser = exports.runAsync = void 0;
const firebase_1 = require("./firebase");
// Catch async errors when awaiting promises
exports.runAsync = (callback) => {
    return (req, res, next) => callback(req, res, next).catch(next);
};
// Throws an error if the currentUser does not exist on the request
exports.validateUser = (req) => {
    const user = req["currentUser"];
    if (!user) {
        throw new Error("You must be logged in to make this request. (Authorization: Bearer <token>)");
    }
    return user;
};
// Decodes the JSON Web Token sent via the frontend app
// Makes the currentUser (firebase) data available on the body.
exports.decodeJWT = async (req, res, next) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
        const idToken = req.headers.authorization.split("Bearer ")[1];
        try {
            const decodedToken = await firebase_1.auth.verifyIdToken(idToken);
            req["currentUser"] = decodedToken;
        }
        catch (error) {
            console.log(error);
        }
    }
    next();
};
//# sourceMappingURL=functions.js.map