import mongoose from "mongoose";
const chalk = require("chalk");
const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log(chalk.blue("[    connected to DB    ]")))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectToDb;
