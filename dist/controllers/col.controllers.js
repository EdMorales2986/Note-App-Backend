"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCol = exports.updateCol = exports.createCol = exports.displayCol = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const col_1 = __importDefault(require("../models/col"));
const displayCol = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const colUser = yield col_1.default.aggregate([
            { $sort: { createdAt: -1 } },
            { $match: { owner: req.params.user } },
        ]);
        res.json(colUser);
    });
};
exports.displayCol = displayCol;
const createCol = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.name) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const newCol = new col_1.default({ name: req.body.name, owner: req.params.user });
        yield newCol.save();
        return res.status(200).json(newCol);
        // return res.redirect(`/signin/${req.params.user}`);
    });
};
exports.createCol = createCol;
const updateCol = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.name) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const col = yield col_1.default.findById(req.params.id);
        if (col) {
            let oldName = col.name;
            col.name = req.body.name;
            yield notes_1.default.updateMany({ col: oldName }, { col: req.body.name });
            yield col.save();
            return res.status(200).json({ msg: "Collection modified" });
            // return res.redirect(`/signin/${req.params.user}`);};
        }
        return res
            .status(400)
            .json({ msg: "Encountered and error during this process" });
    });
};
exports.updateCol = updateCol;
const deleteCol = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.params.id) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const col = yield col_1.default.findById(req.params.id);
        if (col) {
            let oldName = col.name;
            yield col_1.default.deleteOne({ _id: req.params.id });
            yield notes_1.default.updateMany({ col: oldName }, { col: "" });
            return res.status(200).json({ msg: "Collection deleted" });
            // return res.redirect(`/signin/${req.params.user}`);};
        }
        return res
            .status(400)
            .json({ msg: "Encountered and error during this process" });
    });
};
exports.deleteCol = deleteCol;
