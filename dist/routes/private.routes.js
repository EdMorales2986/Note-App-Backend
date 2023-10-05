"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
// this is leftover from the tutorial and for random testing purposes
const router = (0, express_1.Router)();
router.get("/private", passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    res.send("success");
});
exports.default = router;
