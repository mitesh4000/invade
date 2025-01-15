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

function movePlayer(callback: (x: number, y: number) => void): void {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "w") {
      callback(0, -1);
    }
    if (event.key === "s") {
      callback(0, 1);
    }
    if (event.key === "a") {
      callback(-1, 0);
    }
    if (event.key === "d") {
      callback(1, 0);
    }
  });
}

export { movePlayer, playerAim };
