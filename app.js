document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  const width = 400;
  console.log(width);
  const height = 600;
  let startPoint = 100;
  let doodlerBottomSpace = startPoint;
  let endGame = false;
  const numOfPlatforms = 5;
  let platforms = [];
  let upTimerId = null;
  let downTimerId = null;
  let leftTimerId = null;
  let rightTimerId = null;
  let isJumping = false;
  let isMovingLeft = false;
  let isMovingRight = false;
  let score = 0;

  class Platform {
    constructor(bottomLevel) {
      this.bottom = bottomLevel;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      this.left = Math.random() * 320;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodle");
    doodlerLeftSpace = platforms[0].left + 15;

    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }

  function createPlatform() {
    for (let i = 0; i < numOfPlatforms; i++) {
      let bottomLevel = 100 + (height / numOfPlatforms) * i;
      let platform = new Platform(bottomLevel);
      platforms.push(platform);
    }
  }
  function movePlatform() {
    if (doodlerBottomSpace > 150) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;

        platform.visual.style.bottom = platform.bottom + "px";

        if(platform.bottom <=10){
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform');
          platforms.shift();

          let newPlatform = new Platform(height);
          platforms.push(newPlatform);
          score++;
        }
      });
    }
  }

  function jump() {
    isJumping = true;
    clearInterval(downTimerId);
    console.log("startPoint", startPoint);
    upTimerId = setInterval(() => {
      if (doodlerBottomSpace < startPoint + 250) {
        doodlerBottomSpace += 20;
        doodler.style.bottom = doodlerBottomSpace + "px";
      } else {
        fall();
      }
    }, 50);
  }
  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 10;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 50 >= platform.left &&
          doodlerLeftSpace <= platform.left + 80 &&
          !isJumping
        ) {
          console.log("landed");
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 50);
  }

  function moveLeft() {
    console.log("moving left");
    if(isMovingRight){
      clearInterval(rightTimerId);
      isMovingRight = false;
    }
    isMovingLeft = true;
    clearInterval(leftTimerId)
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 7;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveRight();
      }
    }, 50);
  }
  function moveRight() {
    if(isMovingLeft){
      clearInterval(leftTimerId);
      isMovingLeft=false;
    }
 
    isMovingRight = true;
    clearInterval(rightTimerId)
    rightTimerId = setInterval(() => {
      if (doodlerLeftSpace <= 350) {
        doodlerLeftSpace += 7;
        doodler.style.left = doodlerLeftSpace + "px";
      } else {
        moveLeft();
      }
    }, 50);
  }

  function control(e) {
    if (e.key == "ArrowUp") {
 
      moveStraight()
    } else if (e.key == "ArrowLeft") {
      moveLeft();
    } else if (e.key == "ArrowRight") {
      moveRight();
    }
  }
  function moveStraight(){
    isMovingLeft = false;
    isMovingRight = false;
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)

  }

  function gameOver() {
    
    endGame = true;
    while(grid.firstChild){
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }


  function start() {
    if (!endGame) {

      createPlatform();

      setInterval(movePlatform, 50);
      createDoodler();
      jump();
      document.addEventListener("keyup", control);
    }
  }

  start();
});
