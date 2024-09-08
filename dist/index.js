"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const greetings_routes_1 = __importDefault(require("./routes/greetings.routes"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
const cronJobs_1 = __importDefault(require("./utils/cronJobs"));
const envVariablesCheck_1 = __importDefault(require("./utils/envVariablesCheck"));
const chalk = require("chalk");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
(0, envVariablesCheck_1.default)();
(0, connectToDb_1.default)();
(0, cronJobs_1.default)();
//app.use(morgan("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "./views")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "./views"));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.render("index");
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
//API endpoints
const base_url = process.env.BASE_API_URL;
app.use(`${base_url}/greetings`, greetings_routes_1.default);
app.use((req, res, next) => {
    res.status(404).render("404");
});
server.listen(process.env.PORT, () => {
    console.log(chalk.greenBright(`[    Server is Running on port ${chalk.red(process.env.PORT)} ]`));
});
