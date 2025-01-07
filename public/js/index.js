var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
// Initial game state
var gameState = {
    players: [
        {
            playerId: 1,
            playerName: "player",
            tankHull: new Image(),
            tankGun: new Image(),
            tankTrack: new Image(),
            x: 20,
            y: 20,
            angle: 0,
            color: "A",
            hull: 3,
        },
        // {
        //   playerId: 2,
        //   playerName: "player2",
        //   playerImage: new Image(),
        //   x: 200,
        //   y: 20,
        //   angle: 45,
        //   color: "B",
        //   hull: 4,
        // },
        // {
        //   playerId: 3,
        //   playerName: "player3",
        //   playerImage: new Image(),
        //   x: 300,
        //   y: 20,
        //   angle: 45,
        //   color: "C",
        //   hull: 1,
        // },
        // {
        //   playerId: 4,
        //   playerName: "player4",
        //   playerImage: new Image(),
        //   x: 400,
        //   y: 20,
        //   angle: 45,
        //   color: "D",
        //   hull: 3,
        // },
    ],
};
var preloadPlayerImages = function () { return __awaiter(_this, void 0, void 0, function () {
    var promises, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promises = gameState.players.map(function (player) {
                    var tankGun = new Image();
                    var tankHull = new Image();
                    var tankTrack = new Image();
                    tankHull.src = "/game_assets/PNG/Hulls_Color_".concat(player.color, "/Hull_0").concat(player.hull, ".png");
                    tankGun.src = "/game_assets/PNG/Weapon_Color_".concat(player.color, "_256X256/Gun_0").concat(player.hull, ".png");
                    return new Promise(function (resolve, reject) {
                        tankHull.onload = function () {
                            player.tankHull = tankHull; // Store the preloaded image in the player object
                            resolve();
                        };
                        tankGun.onload = function () {
                            player.tankGun = tankGun; // Store the preloaded image in the player object
                            resolve();
                        };
                        tankHull.onerror = function () {
                            console.error("Image not found for path: ".concat(tankHull.src));
                            reject(new Error("Image not found: ".concat(tankHull.src)));
                        };
                        tankGun.onerror = function () {
                            console.error("Image not found for path: ".concat(tankGun.src));
                            reject(new Error("Image not found: ".concat(tankGun.src)));
                        };
                    });
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                _a.sent(); // Wait until all images are loaded
                console.log("All player images preloaded");
                gameLoop(); // Start the game loop after images are preloaded
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Failed to preload images", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var drawPlayer = function (player) {
    if (player.tankHull) {
        ctx.drawImage(player.tankHull, player.x, player.y, 200, 200);
        ctx.save();
        ctx.translate(player.x + 100, player.y + 120);
        ctx.rotate((player.angle * Math.PI) / 180);
        ctx.drawImage(player.tankGun, -100, -100, 200, 200);
        ctx.translate(0, 0);
        ctx.restore();
    }
    else {
        console.error("playerImage not found for player: ".concat(player.playerName));
    }
};
var drawAllThePlayers = function () {
    gameState.players.forEach(drawPlayer);
};
// Move a player based on keypress
document.addEventListener("keydown", function (event) {
    var movementStep = 5;
    var player = gameState.players[0]; // Assuming we're moving the first player
    if (event.key === "ArrowUp" && player.y > 0) {
        player.y -= movementStep;
    }
    else if (event.key === "ArrowDown" &&
        player.y < canvas.height - movementStep) {
        player.y += movementStep;
    }
    else if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= movementStep;
    }
    else if (event.key === "ArrowRight" &&
        player.x < canvas.width - movementStep) {
        player.x += movementStep;
    }
    else if (event.key === "e") {
        player.angle += 5;
    }
    else if (event.key === "q") {
        player.angle -= 5;
    }
});
preloadPlayerImages();
// Main game loop
var gameLoop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawAllThePlayers();
    drawAllThePlayers();
    setTimeout(gameLoop, 1000 / 10); // Run at 10 FPS
};
// Start the game loop
gameLoop();
