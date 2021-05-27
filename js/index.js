const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const music = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 9, y: 5 }];
let food = { x: 17, y: 8 };
let inputDir = { x: 0, y: 0 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
  //   console.log(ctime);
}

function isCollide(sarr) {
  if (sarr[0].x <= 0 || sarr[0].x >= 18 || sarr[0].y < 0 || sarr[0].y >= 18) {
    return true;
  }
  for (let i = 0; i < sarr.length; ++i) {
    if (i === 0) {
      continue;
    }
    if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y) {
      return true;
    }
  }
  return false;
}

let scoreBoard = document.getElementById("Score");
scoreBoard.innerHTML = `Score: ${score}`;

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    speed = 4.5;
    music.pause();
    inputDir = { x: 0, y: 0 };
    score = 0;
    scoreBoard.innerHTML = `Score: ${score}`;
    alert("Game over! Press any key to play again!!");
    snakeArr = [{ x: 9, y: 5 }];
    music.play();
  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score += 1;
    speed = speed + score * 0.25;
    scoreBoard.innerHTML = `Score: ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    let element = snakeArr[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //part2

  let board = document.getElementById("board");
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  music.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowUp");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
