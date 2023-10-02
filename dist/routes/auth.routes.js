"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
router.get("/signup", function (req, res) {
    res.send("signup");
});
router.post("/signup", users_controllers_1.signUp);
router.get("/signin", function (req, res) {
    res.send("signin");
});
router.post("/signin", users_controllers_1.signIn, function (req, res) {
    res.redirect(`/notes`);
});
router.get("/notes", function (req, res) {
    res.send("Logged In");
});
exports.default = router;
