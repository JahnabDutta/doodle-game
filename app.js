document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  const doodlerLeftSpace = 50;
  const width = 400;
  console.log(width);
  const height = 600;
  const doodlerBottomSpace = 200;
  const endGame = false;
  const numOfPlatforms = 5;
  const platforms = [];

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
  function movePlatform(){
      if(doodlerBottomSpace>200){
          platforms.forEach((platform)=>{
              platform.bottom -=4;
    
              platform.visual.style.bottom = platform.bottom + 'px';
          })
      }
  }

  function start() {
    if (!endGame) {
      createPlatform();
      setInterval(movePlatform,50);
    }
  }
  createDoodler();
  start();
});
