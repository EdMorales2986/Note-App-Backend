"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//SECTION - Mongoose
//ANCHOR - Config Mongoose
mongoose_1.default.connect(`${process.env.URI}`, { dbName: "PochiSQL" });
const connection = mongoose_1.default.connection;
//ANCHOR - Msg: Connection Stablished
connection.once("open", function () {
    console.log(`MongoDB Connection Stablished`);
});
//ANCHOR - Msg: Terminate on failed connection with MongoDB
connection.on("error", function (error) {
    console.log(error);
    process.exit(0);
});
//!SECTION
