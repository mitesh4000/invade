"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chalk = require("chalk");
const connectToDb = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => console.log(chalk.blue("[    connected to DB    ]")))
        .catch((err) => console.error("MongoDB connection error:", err));
};
exports.default = connectToDb;
