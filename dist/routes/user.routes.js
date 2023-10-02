"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
router.post("/delete", users_controllers_1.deleteUser);
router.post("/update", users_controllers_1.updateInfo);
exports.default = router;
