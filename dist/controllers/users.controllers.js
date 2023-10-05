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
exports.updateInfo = exports.deleteUser = exports.signIn = exports.signUp = void 0;
const users_1 = __importDefault(require("../models/users"));
const notes_1 = __importDefault(require("../models/notes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, alias: user.alias }, `${process.env.JWTSECRET}`, { expiresIn: 600 });
}
// Auth Route Functionality
// Sign Up functions
// Specifying that it will return a promise of type 'Response' is not obligatory
// export const signUp = async function (req: Request,res: Response) { <-- this will work
const signUp = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.alias ||
            !req.body.password ||
            !req.body.email ||
            !req.body.name ||
            !req.body.lname) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const userAlias = yield users_1.default.findOne({ alias: req.body.alias });
        const userEmail = yield users_1.default.findOne({ email: req.body.email });
        if (userAlias || userEmail) {
            return res.status(400).json({ msg: "The user already exists" });
        }
        // We create an instance of the model 'users' which makes it a 'document' and documents are entries stored inside a collection
        const newUser = new users_1.default(req.body);
        // .save() Saves this document 'newUser' by inserting a new document into the database
        yield newUser.save();
        return res.status(200).json(newUser);
        // return res.redirect(`/signin}`);
    });
};
exports.signUp = signUp;
// Sign In functions
const signIn = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.alias || !req.body.password) {
            return res.status(400).json({ msg: "Please send your alias and password" });
        }
        const user = yield users_1.default.findOne({ alias: req.body.alias });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            // const token = createToken(user);
            return res.redirect(`/signin/${req.body.alias}`);
        }
        return res
            .status(400)
            .json({ msg: "Either the password or the alias are wrong, check again" });
    });
};
exports.signIn = signIn;
const deleteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.alias || !req.body.password) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const user = yield users_1.default.findOne({ alias: req.params.user });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (user && isMatch) {
            yield users_1.default.deleteOne({ alias: req.params.user });
            yield notes_1.default.deleteMany({ owner: req.params.User });
            return res.status(200).json({ msg: "user deleted" });
            // return res.redirect(`/signin`);
        }
        return res
            .status(400)
            .json({ msg: "Encountered and error during this process" });
    });
};
exports.deleteUser = deleteUser;
const updateInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.oldPass ||
            !req.body.newPass ||
            !req.body.email ||
            !req.body.name ||
            !req.body.lname) {
            return res.status(400).json({ msg: "Please send valid data" });
        }
        const user = yield users_1.default.findOne({ alias: req.params.user });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = yield user.comparePassword(req.body.oldPass);
        if (user && isMatch) {
            user.name = req.body.name;
            user.lname = req.body.lname;
            user.email = req.body.email;
            user.password = req.body.newPass;
            yield user.save();
            return res.redirect(`/signin/${req.params.user}`);
        }
        // {
        //   "name": "Alonso",
        //   "lname": "Rondon",
        //   "email": "AlRo@gmail.com",
        //   "oldAlias": "Ed_123",
        //   "newAlias": "Al777",
        //   "oldPass": "Wo_Xing_Shi",
        //   "newPass": "bruh"
        // }
        return res
            .status(400)
            .json({ msg: "Encountered and error during this process" });
    });
};
exports.updateInfo = updateInfo;
