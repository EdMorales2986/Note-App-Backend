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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    lname: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true,
    },
    alias: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    notes: {
        type: [String],
    },
});
// Register Password Encryption
// This will run before any document.save()
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // if password is not being modified it will skip
        if (!user.isModified("password")) {
            return next();
        }
        // Process to cipher/encrypt a password (Hashing)
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
        next();
    });
});
// Login Password Validator
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = mongoose_1.default.model("users", userSchema);
