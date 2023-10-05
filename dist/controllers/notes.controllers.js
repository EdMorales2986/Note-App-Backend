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
exports.deleteNote = exports.updateNote = exports.createNote = exports.displayNote = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const users_1 = __importDefault(require("../models/users"));
const displayNote = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const notesUser = await notes.aggregate([{ $sort: { updatedAt : -1 } }]);
        // const notesUser = await notes.aggregate([{ $sort: { createdAt : -1 } }]);
        const notesUser = yield notes_1.default.aggregate([{ $sort: { col: -1 } }]);
        res.json(notesUser);
        next();
    });
};
exports.displayNote = displayNote;
const createNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.title || !req.body.content || !req.body.owner) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        if (req.body.owner != req.params.user) {
            return res.status(400).json({ msg: "Dangerous Maneuver" });
        }
        const user = yield users_1.default.findOne({ alias: req.params.user });
        if (user) {
            const newNote = new notes_1.default(req.body);
            yield newNote.save();
            user.notes.push(newNote._id);
            yield user.save();
            return res.status(200).json(newNote);
            // return res.redirect(`/signin/${req.params.user}`);
        }
        return res.status(400).json({ msg: "Something went wrong" });
    });
};
exports.createNote = createNote;
const updateNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.title || !req.body.content || !req.body.content) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const note = yield notes_1.default.findById(req.params.id);
        if (note) {
            note.title = req.body.title;
            note.content = req.body.content;
            note.col = req.body.col;
            yield note.save();
            return res.status(200).json({ msg: "note modified" });
            // return res.redirect(`/signin/${req.params.user}`);
        }
        return res.status(400).json({ msg: "Something went wrong" });
    });
};
exports.updateNote = updateNote;
const deleteNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield notes_1.default.findById(req.params.id);
        if (note) {
            yield notes_1.default.deleteOne({ _id: req.params.id });
            yield users_1.default.findOneAndUpdate({ alias: req.params.user }, { $pull: { notes: req.params.id } });
            return res.status(200).json(note);
        }
        return res
            .status(400)
            .json({ msg: "Encountered and error during this process" });
    });
};
exports.deleteNote = deleteNote;
