window.onload = function () {
    const startButton = document.getElementById("intro-button"); // change later when player information is added
    const restartButton = document.getElementById("restart-button");
    let myNewGame;
  
    startButton.addEventListener("click", function () {
      startGame();
    });

    restartButton.addEventListener("click", ()=>{
      console.log("button clicked");
      myNewGame.gameEndScreen.style.display = "none";
      myNewGame.gameScreen.style.display = "block";
      myNewGame.reset();
      startGame();
    })
  
    
    function startGame() {
      myNewGame = new Game();
      myNewGame.start();
      console.log("start game");
    }


    // moves the cryptonaut in X and Y direction
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "ArrowUp"){
      myNewGame.player.directionY = -5;
    } else if (event.code === "ArrowDown") {
      myNewGame.player.directionY = 5; 
    } else if (event.code === "ArrowLeft") {
      myNewGame.player.directionX = -5; 
    } else if (event.code === "ArrowRight") {
      myNewGame.player.directionX = 5;
    }
  })

  // deletes movement when keys are not pressed
  window.addEventListener("keyup", (event)=> {
    if (event.code === "ArrowUp"){
      myNewGame.player.directionY = 0;
    } else if (event.code === "ArrowDown") {
      myNewGame.player.directionY = 0; 
    } else if (event.code === "ArrowLeft") {
      myNewGame.player.directionX = 0; 
    } else if (event.code === "ArrowRight") {
      myNewGame.player.directionX = 0;
    }
  })

  //add the shooting function
  window.addEventListener("keydown", (event)=>{
    if (event.code === "Space") {
      if(!myNewGame.player.isShooting){
      myNewGame.player.shoot();
      myNewGame.player.isShooting = true;
      if (myNewGame.player.currentWeapon.type === "basic"){
        setTimeout(()=>{
          myNewGame.player.isShooting = false;
        }, 500)} else if (myNewGame.player.currentWeapon.type === "laser"){
          setTimeout(()=>{
            console.log("set time out to laser")
            myNewGame.player.isShooting = false;
          }, 50)
        } else if (myNewGame.player.currentWeapon.type === "spread"){
          setTimeout(()=>{
            console.log("set time out to spread")
            myNewGame.player.isShooting = false;
          }, 500)
      }
      }
    }
  });
};