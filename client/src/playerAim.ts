function playerAim(turetCenter: { x: number; y: number }): number {
  var angle = 0;
  window.addEventListener("mousemove", (event) => {
    // console.log("turet center", turetCenter.x, turetCenter.y);
    // console.log("mouse", event.clientX, event.clientY);
    const deltaX = event.clientX - turetCenter.x; // Difference in X
    const deltaY = event.clientX - turetCenter.y; // Difference in Y

    const angleInRad = Math.atan2(deltaY, deltaX); // Angle to mouse
    angle = angleInRad * (180 / Math.PI);
  });
  return angle;
}

export default playerAim;
