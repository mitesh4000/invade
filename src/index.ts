import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import greetingsRouts from "./routes/greetings.routes";
import connectToDb from "./utils/connectToDb";
import cronJobe from "./utils/cronJobs";
import checkEnvironmentVariables from "./utils/envVariablesCheck";

const chalk = require("chalk");
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

checkEnvironmentVariables();
connectToDb();
cronJobe();

//app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../views")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../views"));

app.use(cors());

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
app.use(`${base_url}/greetings`, greetingsRouts);

app.use((req, res, next) => {
  res.status(404).render("404");
});

server.listen(process.env.PORT, () => {
  console.log(
    chalk.greenBright(
      `[    Server is Running on port ${chalk.red(process.env.PORT)} ]`
    )
  );
});
