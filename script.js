let bird = document.querySelector(".bird");
let pipe = document.querySelector(".pipe");
let dx = -1;
let dy = 0;
let bird_x = 1;
let pipe_x = 230;
let bird_y = 100;
let jump = 5;
let gamePaused = false;

gravity = 0.1;

function reset() {
  dx = -1;
  dy = -5;
  bird_x = 1;
  pipe_x = 230;
  bird_y = 100;
  jump = 5;
}

function gameOver() {
  gamePaused = true;
}
function detectCollision() {
  //
  if (bird_x > pipe_x - 64 && bird_y < 190) {
    gameOver();
  } else {
  }
}
function render() {
  if (bird_y < 0) {
    bird_y = 0;
  }
  if (bird_y > 430) {
    bird_y = 0;
    dy = 0;
    bird_x = 0;
    gameOver();

    //Also make game over
  }
  if (pipe_x < -30) {
    pipe_x = 230;
  }
  detectCollision();
  if (!gamePaused) {
    dy += gravity;
    bird_y += dy;
    pipe_x += dx;
  } else {
    document.body.classList.add("paused");
  }

  pipe.style.marginLeft = pipe_x + "px";
  bird.style.marginLeft = bird_x + "px";
  bird.style.marginTop = bird_y + "px";
  bird.style.transform = `rotate(${dy * 10}deg)`;
}

setInterval(() => {
  render();
}, 10);

document.addEventListener("keyup", e => {
  if (e.key == "Enter") {
    dy = -jump;
  }
});
