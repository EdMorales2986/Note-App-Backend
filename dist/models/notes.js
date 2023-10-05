"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true, lowercase: true, trim: true },
    content: { type: String, require: true, lowercase: true, trim: true },
    owner: { type: String, require: true, trim: true },
    col: { type: String, lowercase: true, trim: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("notes", noteSchema);
