import { movePlayer, playerAim } from "./playerControll";
import { GameState, Player } from "./types/player";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const playerSize = 80;
// playerImage.src = "/game_assets/PNG/Hulls_Color_A/Hull_04.png";
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
      direaction: Math.PI / 4,
      tankCenterOfRotation: { x: 0, y: 0 },
      turetCenterOfRotation: { x: 0, y: 0 },
      velocity: 5,
      hull: 2,
      track: 2,
      moving: false,
      pressedKeys: [],
    },
  ],
};

movePlayer(gameState);

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
    await Promise.all(promises);
    console.log("All player images preloaded");
    gameLoop();
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
    alert("playerImage not found for player: " + player.playerName);
    console.error(`playerImage not found for player: ${player.playerName}`);
    return;
  }

  ctx.save();
  ctx.translate(player.x + playerSize / 2, player.y + playerSize / 2);

  ctx.rotate(player.direaction);

  lastAnimationFrame += 1;
  if (lastAnimationFrame > frameInterval && player.moving) {
    currentTrackImage = currentTrackImage === 0 ? 1 : 0;
    lastAnimationFrame = 0;
  }

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

  ctx.drawImage(
    player.tankHull,
    -playerSize / 2,
    -playerSize / 2,
    playerSize,
    playerSize
  );

  playerAim(
    {
      x: player.x + playerSize / 2,
      y: player.y + playerSize / 1.6,
    },
    (turetAngle) => {
      player.angle = turetAngle;
    }
  );

  ctx.rotate(player.angle + Math.PI / 2);

  ctx.drawImage(
    player.tankGun,
    -(playerSize / 2),
    -(playerSize / 1.75),
    playerSize,
    playerSize
  );

  // ctx.restore();
  ctx.restore();
};

const drawAllThePlayers = (): void => {
  gameState.players.forEach(drawPlayer);
};

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
