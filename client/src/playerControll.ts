import { GameState } from "./types/player";
type Point = { x: number; y: number };

function playerAim(
  turetCenter: Point,
  callback: (angle: number) => void
): void {
  window.addEventListener("mousemove", (event: MouseEvent) => {
    const deltaX = event.clientX - turetCenter.x;
    const deltaY = event.clientY - turetCenter.y;
    const angleInRad = Math.atan2(deltaY, deltaX);
    callback(angleInRad);
  });
}

function movePlayer(gameState: GameState): void {
  const player = gameState.players[0];
  const map = gameState.map;

  let pressedKeys = player.pressedKeys;

  const keyDownHandler = (event: KeyboardEvent): void => {
    if (!pressedKeys.includes(event.key)) {
      pressedKeys.push(event.key);
    }
  };

  const keyUpHandler = (event: KeyboardEvent): void => {
    const index = pressedKeys.indexOf(event.key);
    if (index > -1) {
      pressedKeys.splice(index, 1);
    }
  };

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function move() {
    if (pressedKeys.includes("w")) {
      player.moving = true;
      // Forward movement calculation
      player.x += Math.cos(player.direaction) * player.velocity;
      player.y += Math.sin(player.direaction) * player.velocity;
      console.log("Player position", player.x, player.y);
    }
    if (pressedKeys.includes("s")) {
      player.moving = true;
      // Backward movement calculation
      player.x -= Math.cos(player.direaction) * player.velocity;
      player.y -= Math.sin(player.direaction) * player.velocity;
    }
    if (pressedKeys.includes("d")) {
      player.moving = true;
      player.direaction += 0.05;
    }
    if (pressedKeys.includes("a")) {
      player.moving = true;
      player.direaction -= 0.05;
    }

    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);
}

export { movePlayer, playerAim };
