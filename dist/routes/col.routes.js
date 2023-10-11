"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const col_controllers_1 = require("../controllers/col.controllers");
const router = (0, express_1.Router)();
router.post("/signin/:user/cols/create", col_controllers_1.createCol);
router.post("/signin/:user/cols/update/:id", col_controllers_1.updateCol);
router.post("/signin/:user/cols/delete/:id", col_controllers_1.deleteCol);
exports.default = router;
