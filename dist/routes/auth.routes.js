"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const notes_controllers_1 = require("../controllers/notes.controllers");
const router = (0, express_1.Router)();
// Routes for before you login in the app
router.get("/signup", function (req, res) {
    res.send("signup");
});
router.post("/signup", users_controllers_1.signUp);
router.get("/signin", function (req, res) {
    res.send("signin");
});
router.post("/signin", users_controllers_1.signIn);
// Routes for after you login in the app
router.get("/signin/:user", 
// passport.authenticate("jwt", { session: false }),
notes_controllers_1.displayNote);
router.post("/signin/:user/delete", 
// passport.authenticate("jwt", { session: false }),
users_controllers_1.deleteUser);
router.post("/signin/:user/update", 
// passport.authenticate("jwt", { session: false }),
users_controllers_1.updateInfo);
exports.default = router;
