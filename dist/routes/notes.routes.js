"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_controllers_1 = require("../controllers/notes.controllers");
const router = (0, express_1.Router)();
router.post("/signin/:user/notes/create", 
//passport.authenticate("jwt", { session: false }),
notes_controllers_1.createNote);
router.post("/signin/:user/notes/update/:id", notes_controllers_1.updateNote);
router.post("/signin/:user/notes/delete/:id", notes_controllers_1.deleteNote);
exports.default = router;
