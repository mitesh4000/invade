import { playerAim } from "./playerControll";
import { con } from "./sockethandler";
import { GameState, Player } from "./types/player";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// setting canvas height and width in pixels
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const playerSize = 80;
// playerImage.src = "/game_assets/PNG/Hulls_Color_A/Hull_04.png";

// Define types for Player and GameState

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
      direaction: 0,
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
  if (!player.tankHull || !player.tankTrack) {
    console.error(`playerImage not found for player: ${player.playerName}`);
    return;
  }

  ctx.save();
  // Center translation for entire tank
  ctx.translate(player.x + playerSize / 2, player.y + playerSize / 2);

  // Rotate entire tank
  ctx.rotate(player.direaction);

  // Animate tracks
  lastAnimationFrame += 1;
  if (lastAnimationFrame > frameInterval && player.moving) {
    currentTrackImage = currentTrackImage === 0 ? 1 : 0;
    lastAnimationFrame = 0;
  }

  // Draw tracks
  const trackImage =
    currentTrackImage === 0 ? player.tankTrack : player.tankTrack_2;
  ctx.drawImage(
    trackImage,
    -playerSize / 2 + playerSize / 6.5,
    -playerSize / 2,
    playerSize / 4,
    playerSize
  );
  ctx.drawImage(
    trackImage,
    -playerSize / 2 + playerSize / 1.8,
    -playerSize / 2,
    playerSize / 4,
    playerSize
  );

  // Draw hull
  ctx.drawImage(
    player.tankHull,
    -playerSize / 2,
    -playerSize / 2,
    playerSize,
    playerSize
  );

  // Turret positioning and rotation
  ctx.save();
  ctx.translate(0, 0);

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  playerAim(
    {
      x: player.x + playerSize / 2,
      y: player.y + playerSize / 1.6,
    },
    (turetAngle) => {
      player.angle = turetAngle;
    }
  );

  // Rotate turret
  ctx.rotate(player.angle + Math.PI / 2);

  // Draw gun
  ctx.drawImage(
    player.tankGun,
    -(playerSize / 2),
    -(playerSize / 1.75),
    playerSize,
    playerSize
  );

  ctx.restore();
  ctx.restore();
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
      player.moving = true;
      player.direaction += 0.01;
      break;
    case "q":
      player.moving = true;
      player.direaction -= 0.01;
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
