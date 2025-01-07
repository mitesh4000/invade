var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var gameState = {
  player: {
    x: 20,
    y: 20,
  },
  enemy: {
    x: 10,
    y: 10,
  },
};

// move player
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowUp") {
    gameState.player.y -= 1;
  } else if (event.key === "ArrowDown") {
    gameState.player.y += 1;
  } else if (event.key === "ArrowLeft") {
    gameState.player.x -= 1;
  } else if (event.key === "ArrowRight") {
    gameState.player.x += 1;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw player
  ctx.fillStyle = "green";
  ctx.fillRect(gameState.player.x, gameState.player.y, 10, 10);

  setTimeout(gameLoop, 1000 / 10);
}

gameLoop();
