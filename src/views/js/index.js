const hero = document.getElementById("tank");
const game_window = document.getElementById("game-window");
const gun = document.getElementById("gun");

let x = game_window.offsetWidth / 2;
let y = game_window.offsetHeight / 2;
let gun_angle = 0;

hero.style.left = x + "px";
hero.style.top = y + "px";

const shoot = () => {
  console.log("bullet shot started============|");
  const bullet = document.createElement("div");
  bullet.id = "bullet";
  bullet.style.width = "10px";
  bullet.style.height = "20px";
  bullet.style.backgroundColor = "yellow";
  bullet.style.position = "absolute";

  const heroRect = hero.getBoundingClientRect();
  console.log("🚀 ~ shoot ~ heroPosition:", heroRect);
  bullet.style.top = 0;
  bullet.style.left = heroRect.width / 2 + "px";

  hero.appendChild(bullet);

  let bulletTop = 0;
  const intervalId = setInterval(() => {
    bulletTop -= 10;
    console.log("🚀 ~ intervalId ~ bulletTop:", bulletTop);
    if (bulletTop < -100) {
      clearInterval(intervalId);
      hero.removeChild(bullet);
    }
  }, 10);

  console.log("=========finished");
};

const moveLeft = (element) => {
  x -= 5;
  element.style.left = x + "px";
  console.log("🚀 ~ move left", x);
};

const moveRight = (element) => {
  x += 5;
  element.style.left = x + "px";
  console.log("🚀 ~ move right", x);
};

const moveUp = (element) => {
  y -= 5;
  element.style.top = y + "px";
  console.log("🚀 ~ moved up", y);
};

const moveDown = (element) => {
  y += 5;
  element.style.top = y + "px";
  console.log("🚀 ~ moved down ", y);
};

const changeGunAngle = (clockWise, degree) => {
  if (clockWise) {
    gun_angle += degree;
    gun.style.rotate = gun_angle + "deg";
    console.log("🚀 ~ changeGunAngle ~ gun_angle:", gun_angle);
  } else {
    gun_angle -= degree;
    gun.style.rotate = gun_angle + "deg";
    console.log("🚀 ~ changeGunAngle ~ gun_angle:", gun_angle);
  }
};

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      moveUp(hero);
      break;

    case "s":
      moveDown(hero);
      break;

    case "a":
      moveLeft(hero);
      break;

    case "d":
      moveRight(hero);
      break;

    case "e":
      shoot();
      break;
    case "ArrowUp":
      changeGunAngle(true, 5);
      break;

    case "ArrowDown":
      changeGunAngle(false, 5);
      break;
  }
});
