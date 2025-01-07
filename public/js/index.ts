const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// playerImage.src = "/game_assets/PNG/Hulls_Color_A/Hull_04.png";

// Define types for Player and GameState
interface Player {
  playerId: number;
  playerName: string;
  tankHull: HTMLImageElement;
  tankGun: HTMLImageElement;
  tankTrack: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  color: string;
  hull: number;
}

interface GameState {
  players: Player[];
}

// Initial game state
const gameState: GameState = {
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

const preloadPlayerImages = async (): Promise<void> => {
  const promises = gameState.players.map((player) => {
    const tankGun = new Image();
    const tankHull = new Image();
    const tankTrack = new Image();
    tankHull.src = `/game_assets/PNG/Hulls_Color_${player.color}/Hull_0${player.hull}.png`;
    tankGun.src = `/game_assets/PNG/Weapon_Color_${player.color}_256X256/Gun_0${player.hull}.png`;
    return new Promise<void>((resolve, reject) => {
      tankHull.onload = () => {
        player.tankHull = tankHull; // Store the preloaded image in the player object
        resolve();
      };
      tankGun.onload = () => {
        player.tankGun = tankGun; // Store the preloaded image in the player object
        resolve();
      };
      tankHull.onerror = () => {
        console.error(`Image not found for path: ${tankHull.src}`);
        reject(new Error(`Image not found: ${tankHull.src}`));
      };

      tankGun.onerror = () => {
        console.error(`Image not found for path: ${tankGun.src}`);
        reject(new Error(`Image not found: ${tankGun.src}`));
      };
    });
  });

  try {
    await Promise.all(promises); // Wait until all images are loaded
    console.log("All player images preloaded");
    gameLoop(); // Start the game loop after images are preloaded
  } catch (error) {
    console.error("Failed to preload images", error);
  }
};

const drawPlayer = (player: Player): void => {
  if (player.tankHull) {
    ctx.drawImage(player.tankHull, player.x, player.y, 200, 200);
    ctx.save();

    ctx.translate(player.x + 100, player.y + 120);
    ctx.rotate((player.angle * Math.PI) / 180);

    ctx.drawImage(player.tankGun, -100, -100, 200, 200);
    ctx.translate(0, 0);
    ctx.restore();
  } else {
    console.error(`playerImage not found for player: ${player.playerName}`);
  }
};

const drawAllThePlayers = (): void => {
  gameState.players.forEach(drawPlayer);
};

// Move a player based on keypress
document.addEventListener("keydown", (event: KeyboardEvent): void => {
  const movementStep = 5;
  const player = gameState.players[0]; // Assuming we're moving the first player

  if (event.key === "ArrowUp" && player.y > 0) {
    player.y -= movementStep;
  } else if (
    event.key === "ArrowDown" &&
    player.y < canvas.height - movementStep
  ) {
    player.y += movementStep;
  } else if (event.key === "ArrowLeft" && player.x > 0) {
    player.x -= movementStep;
  } else if (
    event.key === "ArrowRight" &&
    player.x < canvas.width - movementStep
  ) {
    player.x += movementStep;
  } else if (event.key === "e") {
    player.angle += 5;
  } else if (event.key === "q") {
    player.angle -= 5;
  }
});
preloadPlayerImages();
// Main game loop
const gameLoop = (): void => {
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
