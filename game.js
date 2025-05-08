const game = document.getElementById("game");
const ship = document.getElementById("ship");
const crashSound = document.getElementById("crash-sound");
const collectSound = document.getElementById("collect-sound");
const scoreDisplay = document.getElementById("score");

let shipX = 180;
let score = 0;
let speed = 2;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && shipX > 0) shipX -= 20;
  if (e.key === "ArrowRight" && shipX < 360) shipX += 20;
  ship.style.left = shipX + "px";
});

function spawnAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.className = "asteroid";
  asteroid.style.left = Math.floor(Math.random() * 360) + "px";
  asteroid.style.top = "-40px";
  game.appendChild(asteroid);

  let y = -40;

  function fall() {
    y += speed;
    asteroid.style.top = y + "px";

    if (detectCollision(asteroid)) {
      crashSound.play();
      alert("💥 اصطدمت! نقاطك: " + score);
      location.reload();
    }

    if (y < 600) {
      requestAnimationFrame(fall);
    } else {
      asteroid.remove();
      setTimeout(spawnAsteroid, Math.random() * 1000 + 500);
    }
  }

  fall();
}

function spawnStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.floor(Math.random() * 360) + "px";
  star.style.top = "-40px";
  game.appendChild(star);

  let y = -40;

  function fall() {
    y += speed;
    star.style.top = y + "px";

    if (detectCollision(star)) {
      score += 5;
      collectSound.play();
      scoreDisplay.textContent = "النقاط: " + score;
      star.remove();
      return;
    }

    if (y < 600) {
      requestAnimationFrame(fall);
    } else {
      star.remove();
      setTimeout(spawnStar, Math.random() * 5000 + 3000);
    }
  }

  fall();
}

function detectCollision(obj) {
  const shipRect = ship.getBoundingClientRect();
  const objRect = obj.getBoundingClientRect();

  return !(
    shipRect.top > objRect.bottom ||
    shipRect.bottom < objRect.top ||
    shipRect.left > objRect.right ||
    shipRect.right < objRect.left
  );
}

function gameLoop() {
  setInterval(() => {
    score++;
    scoreDisplay.textContent = "النقاط: " + score;

    if (score % 10 === 0) speed += 0.3;
  }, 1000);

  spawnAsteroid();
  setTimeout(spawnStar, 2000);
}

gameLoop();
