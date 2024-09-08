"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-cron");
const cronJobe = () => {
    cron.schedule(process.env.CRON_SHEDULE, () => {
        console.log("Running scheduled task at midnight...");
    });
};
exports.default = cronJobe;
