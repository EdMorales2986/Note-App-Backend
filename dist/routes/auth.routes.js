"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const notes_controllers_1 = require("../controllers/notes.controllers");
const col_controllers_1 = require("../controllers/col.controllers");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
//Not Used, More Problems Than Solutions: passport.authenticate("jwt", { session: false }),
router.post("/jwt-verify", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ state: true });
});
router.post("/signup", users_controllers_1.signUp);
router.post("/signin", users_controllers_1.signIn);
// Routes for after you login in the app
router.get("/notes/:user", notes_controllers_1.displayNote);
router.get("/cols/:user", col_controllers_1.displayCol);
router.post("/signin/:user/delete", users_controllers_1.deleteUser);
router.post("/signin/:user/update", users_controllers_1.updateInfo);
exports.default = router;
