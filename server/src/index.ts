import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import greetingsRouts from "./routes/greetings.routes";
import connectToDb from "./utils/connectToDb";
import checkEnvironmentVariables from "./utils/envVariablesCheck";

const chalk = require("chalk");
dotenv.config();
const app = express();
const server = http.createServer(app);

checkEnvironmentVariables();
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const base_url = process.env.BASE_API_URL;
app.use(`${base_url}/greetings`, greetingsRouts);

const wss = new WebSocketServer({ server });

// const gameState: any = {
//   players: [
//     {
//       playerId: 1,
//       playerName: "player",
//       tankHull: new Image(),
//       tankGun: new Image(),
//       tankTrack: new Image(),
//       tankTrack_2: new Image(),
//       x: canvas.width / 2,
//       y: canvas.height / 2,
//       angle: 0,
//       color: "B",
//       hull: 2,
//       track: 2,
//       moving: false,
//     },
//   ],
// };
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function incoming(message, isBinary) {
    console.log(message);
    try {
      // Handle string or buffer message
      const messageStr = message.toString();
      const decodedMsg = JSON.parse(messageStr);
      console.log("Decoded message:", decodedMsg);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });
  //log the client unique id
  console.log(`Client connected`);
  ws.send("Hello Message from server");
});

server.listen(process.env.PORT, () => {
  console.log(
    chalk.greenBright(
      `[    Server is Running on port ${chalk.red(process.env.PORT)} ]`
    )
  );
});
