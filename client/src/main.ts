import { con } from "./sockethandler";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// setting canvas height and width in pixels
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const playerSize = 80;
// playerImage.src = "/game_assets/PNG/Hulls_Color_A/Hull_04.png";

// Define types for Player and GameState
interface Player {
  playerId: number;
  playerName: string;
  tankHull: HTMLImageElement;
  tankGun: HTMLImageElement;
  tankTrack: HTMLImageElement;
  tankTrack_2: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  color: string;
  hull: number;
  moving: boolean;
  track: Number; // example ["A",2]
}

interface GameState {
  map: {
    mapImage: HTMLImageElement;
    x: number;
    y: number;
  };
  players: Player[];
}

// Initial game state
const gameState: GameState = {
  map: {
    mapImage: new Image(),
    x: 0,
    y: 0,
  },
  players: [
    {
      playerId: 1,
      playerName: "player",
      tankHull: new Image(),
      tankGun: new Image(),
      tankTrack: new Image(),
      tankTrack_2: new Image(),
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: 0,
      color: "B",
      hull: 2,
      track: 2,
      moving: false,
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
    const tankTrack_2 = new Image();
    tankHull.src = `${
      import.meta.env.VITE_BASE_API_URL
    }/game_assets/PNG/Hulls_Color_${player.color}/Hull_0${player.hull}.png`;
    tankGun.src = `${
      import.meta.env.VITE_BASE_API_URL
    }/game_assets/PNG/Weapon_Color_${player.color}_256X256/Gun_0${
      player.hull
    }.png`;
    tankTrack.src = `${
      import.meta.env.VITE_BASE_API_URL
    }/game_assets/PNG/Tracks/Track_${player.track}_A.png`;
    tankTrack_2.src = `${
      import.meta.env.VITE_BASE_API_URL
    }/game_assets/PNG/Tracks/Track_${player.track}_B.png`;
    gameState.map.mapImage.src = `${
      import.meta.env.VITE_BASE_API_URL
    }/game_assets/map.png`;

    return new Promise<void>((resolve, reject) => {
      const images = [tankHull, tankGun, tankTrack, tankTrack_2];
      images.forEach((image) => image.decode());
      Promise.all(images.map((image) => image.decode()))
        .then(() => {
          player.tankHull = tankHull;
          player.tankGun = tankGun;
          player.tankTrack = tankTrack;
          player.tankTrack_2 = tankTrack_2;
          resolve();
        })
        .catch(reject);
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
let lastAnimationFrame = 0;
const frameInterval = 2;
let currentTrackImage = 1;

const drawMap = (): void => {
  ctx.drawImage(gameState.map.mapImage, gameState.map.x, gameState.map.y);
};

const drawPlayer = (player: Player): void => {
  if (player.tankHull && player.tankTrack) {
    lastAnimationFrame += 1;

    if (lastAnimationFrame > frameInterval && player.moving) {
      currentTrackImage = currentTrackImage === 0 ? 1 : 0;
      lastAnimationFrame = 0;
    }
    if (currentTrackImage === 0) {
      ctx.drawImage(
        player.tankTrack,
        player.x + playerSize / 5,
        player.y,
        playerSize / 4,
        playerSize
      );
      ctx.drawImage(
        player.tankTrack,
        player.x + playerSize / 1.8,
        player.y,
        playerSize / 4,
        playerSize
      );
    } else if (currentTrackImage === 1) {
      ctx.drawImage(
        player.tankTrack_2,
        player.x + playerSize / 5,
        player.y,
        playerSize / 4,
        playerSize
      );
      ctx.drawImage(
        player.tankTrack_2,
        player.x + playerSize / 1.8,
        player.y,
        playerSize / 4,
        playerSize
      );
    }

    ctx.drawImage(player.tankHull, player.x, player.y, playerSize, playerSize);
    ctx.save();

    ctx.translate(player.x + playerSize / 2, player.y + playerSize / 1.6);
    ctx.rotate((player.angle * Math.PI) / 180);

    ctx.drawImage(player.tankGun, -40, -40, playerSize, playerSize);
    ctx.translate(0, 0);
    ctx.restore();
  } else {
    console.error(`playerImage not found for player: ${player.playerName}`);
  }
};

const drawAllThePlayers = (): void => {
  gameState.players.forEach(drawPlayer);
};

// create illusion of player movement by moving the background with wasd controls
document.addEventListener("keydown", (event: KeyboardEvent): void => {
  const movementStep = 5;

  const player = gameState.players[0]; // Assuming we're moving the first player
  const map = gameState.map;
  switch (event.key) {
    case "w":
      player.moving = true;
      map.y += movementStep;
      //send tank location on map
      con.send(
        JSON.stringify({
          x: 1,
          y: 2,
        })
      );

      break;
    case "s":
      player.moving = true;
      map.y -= movementStep;
      break;
    case "a":
      player.moving = true;
      map.x += movementStep;
      break;
    case "d":
      player.moving = true;
      map.x -= movementStep;
      break;
    case "e":
      player.angle += 5;
      break;
    case "q":
      player.angle -= 5;
      break;
  }
});

document.addEventListener("keyup", () => {
  const player = gameState.players[0]; // Assuming we're moving the first player
  player.moving = false;
});
preloadPlayerImages();
// Main game loop
const gameLoop = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // drawAllThePlayers();
  drawMap();
  drawAllThePlayers();

  setTimeout(gameLoop, 1000 / 10); // Run at 10 FPS
};

// Start the game loop
gameLoop();
