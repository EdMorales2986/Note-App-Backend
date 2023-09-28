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
exports.signIn = exports.signUp = void 0;
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, `${process.env.JWTSECRET}`, { expiresIn: 864000 });
}
//SECTION - Auth Route Functionality
//ANCHOR - Sign Up functions
const signUp = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Please send your email and password" });
        }
        const user = yield users_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.sendStatus(400).json({ msg: "The user already exists" });
        }
        const newUser = new users_1.default(req.body);
        yield newUser.save();
        return res.status(200).json(newUser);
    });
};
exports.signUp = signUp;
//ANCHOR - Sign In functions
const signIn = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Please send your email and password" });
        }
        const user = yield users_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(200).json({ token: createToken(user) });
        }
        return res
            .status(400)
            .json({ msg: "Either the password or the email are wrong, check again" });
    });
};
exports.signIn = signIn;
//!SECTION
