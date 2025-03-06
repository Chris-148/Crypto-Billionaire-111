class Game {
//DOM Variables
constructor(){
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.playerDetailsScreen = document.getElementById("player-details")
    this.gameEndScreen = document.getElementById("game-end");
    this.gameStats = document.getElementById("game-stats");
    this.liveCountElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score-number");
    this.player =  new Player(
        this.gameScreen,
        200,
        400,
        35,
        50,
        "images/Cryptonaut.png"
    )
    this.player.currentWeapon = new Weapon ();
    this.obstacles = [];
    this.height = 500; // why does it work that i can pass gameScreen to player and obstacle and its set to width+height;
    this.width = 600;
    this.score = 0;
    this.lives = 3; 
    this.gameIsOver = false; 
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000/60);  
    this.pepeRespawnRate = 0; 
    this.counterPepe = 0;
    this.counterBitcoin = 0;
    this.counterLibra = 0;
    this.counterBasicWeapon = 0;
    this.counterLaserWeapon = 0;
    this.counterShotgunWeapon = 0;
    //story Message
    this.storyMessage = {
        0: `Dude, you are on a mission to become a legendary HODLer! 💎🤲
        It’s simple: collect all Bitcoins 🪙 and avoid all shitcoins 💩.
        The crypto market is wild, but with diamond hands, you might just make it!`,
        3000000: `Omg. 🐸 Pepe Coin has spawned! 🚀 The hype is real, and if you couldn't resist, you'll be watching your portfolio crash! 📉 Use the arrow keys to dodge the curse of Pepe Coin!`, 
        5000000: `Use the space key to blast away shitcoins before they trash your gains! 💥`,
        7000000: `🦅 President Milei just dropped Libra Coin! 🚨 If you want to avoid 90% of your portfolio getting wiped out, shoot 💥 or evade! 🌀 The stakes are high—choose wisely! 📉`,
        10000000: "Legendary performance bro, your cracked 10M USD!!! 🌟"
    };
    // Track which messages have been displayed
    this.storyDisplayed = {
        0: false,
        3000000: false,
        5000000: false,
        7000000: false,
        10000000: false
    };
    this.storyBox = document.getElementById('storyBox');
    this.storyText = document.getElementById('storyText');
    this.storyTimeout = 3000;

}

start(){

    // Hide the startScreen and show the game Screen    
    this.startScreen.style.display = "none";
    this.playerDetailsScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameStats.style.display = "block";

    
    // Set width and height of the screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    
    
    // Start the screen
    this.gameIntervalId = setInterval(()=>{
        this.gameLoop()
    }, this.gameLoopFrequency)
    

}

gameLoop (){
    
    // // spawning pepe coins
    console.log(`score is ${this.score}`)
    this.counterPepe++
    // change respawn rate to make game more difficult
    if (this.score > 1000000 && this.score <= 3000000){
        this.pepeRespawnRate = 300;
    } else if (this.score>3000000  && this.score <= 5000000){
        this.pepeRespawnRate = 200;
    } else if (this.score>5000000  && this.score <= 8000000){
        this.pepeRespawnRate = 100;}
        else if (this.score> 7000000){
            this.pepeRespawnRate = 25;}

    // spawning Pepe coins
    if(this.counterPepe % Math.floor(this.pepeRespawnRate*(Math.random())) === 0) {
        this.spawnObstacle(Pepe);
        console.log(this.pepeRespawnRate)
    }   

    // // spawning bitcoin
    this.counterBitcoin++
    if(this.counterBitcoin % Math.floor(1000*(Math.random())) === 0) {
        this.spawnObstacle(Bitcoin);
    }

    if (this.score > 5000000) {
    // set minimum score to spawning libra coins
    this.counterLibra++
    if(this.counterLibra % Math.floor(1000*(Math.random())) === 0) {
        this.spawnObstacle(Libra);
    }   
  
    //spawning basic weapon
     this.counterBasicWeapon++
     if(this.counterBasicWeapon % Math.floor(1000*(Math.random())) === 0) {
         this.spawnObstacle(CollectibleBasic);
     }   
        
    //spawning laser weapon
    this.counterLaserWeapon++
    if(this.counterLaserWeapon % Math.floor(3000*(Math.random())) === 0) {
        this.spawnObstacle(CollectibleLaser);
    }   

    //shotgun weapon
    this.counterShotgunWeapon++
    if(this.counterShotgunWeapon % Math.floor(5000*(Math.random())) === 0) {
        this.spawnObstacle(CollectibleSpread);
        console.log(`shotgun spawned`)
    }   
    }

    this.update();

    if(this.gameIsOver === true) {
        clearInterval(this.gameIntervalId);
    };

}

endGame(){
     this.gameScreen.style.display = "none";
     this.gameEndScreen.style.display = "flex";
     this.playerDetailsScreen.style.display = "none";
     this.gameIsOver = true;
}

update() {
    this.player.move();
    this.player.updatePosition();
    this.checkShowStory()
    

//Obstacle movement
    for (let i = 0; i < this.obstacles.length; i++){

    // move all the obstacles
    this.obstacles[i].move()
    this.obstacles[i].updatePosition()
    
    //remove obstacles from screen when they moved below the game screen 
    if(this.obstacles[i].topPosition > this.gameScreen.offsetHeight - this.obstacles[i].height -30){
        this.obstacles[i].element.remove();
        this.obstacles.splice(i,1);
        i--
    }

    //Obstacle collision of player with obstacle

        if (this.obstacles[i] && this.player.didCollide(this.obstacles[i])) {
            // Logic when collecting objects that harm you!
            console.log("obstacle collision");
            if (this.obstacles[i].type === "pepe" || this.obstacles[i].type === "libra") {
                this.lives--;
                this.liveCount
                this.liveCountElement.innerText = `${this.lives}`;
                //Portfolio value
                this.score += this.obstacles[i].scoreValue;
                this.scoreElement.innerText = this.score.toLocaleString();
                this.obstacles[i].element.remove();
                this.obstacles.splice(i,1);
                i--
                }

             //Logic when collecting bitcoins
            if (this.obstacles[i] && (this.obstacles[i].type === "bitcoin")) {
            // console.log(`Collided with: ${this.obstacles[i].type}`);  // Log the type
            this.score += this.obstacles[i].scoreValue;
            this.scoreElement.innerText = this.score.toLocaleString();
            this.obstacles[i].element.remove();
            this.obstacles.splice(i,1);
                i--
            }
                
                
             //Logic when collecting bitcoins
            if (this.obstacles[i] && (this.obstacles[i].type === "basic" || this.obstacles[i].type === "laser"|| this.obstacles[i].type === "spread")) {
                // console.log(`Collided with: ${this.obstacles[i].type}`);  // Log the type
                this.player.upgradeWeapon(this.obstacles[i].type); 
                this.player.currentWeapon.upgrade(this.obstacles[i].type);
                console.log(`this player weapon type ${this.player.currentWeapon}`);
                this.obstacles[i].element.remove();
                this.obstacles.splice(i,1);
                i--
            }

        }

 
        
        // Move projectiles

        for (let i = 0; i < this.player.projectiles.length; i++) {
            const projectile = this.player.projectiles[i];
            projectile.move();

            // Remove projectile if it goes off-screen
            if (projectile.top < 0) {
                projectile.destroy();
                this.player.projectiles.splice(i, 1);  // Use player's projectiles array
                i--;
            } else {
                // Check collision with obstacles
                for (let j = 0; j < this.obstacles.length; j++) {
                    const obstacle = this.obstacles[j];
                    if (projectile.didCollide(obstacle)) {
                        obstacle.element.remove();
                        this.obstacles.splice(j, 1);
                        projectile.destroy();
                        this.player.projectiles.splice(i, 1);  // Remove from player's array
                        i--;
                        break;
                    }
                }
            }
        }
    }

    //Obstacle collision amongst each other
        this.obstacles.forEach((element, index)=>{
            for (let i = 0; i<this.obstacles.length; i++){
                // with index check if the object collided with itself!
                if(index !== i && element.didCollide(this.obstacles[i])) {
                    element.speedLeft = -1 * element.speedLeft;
                    element.accelerationLeft = -1 * element.accelerationLeft;
                }
            }
        })
        

    if(this.lives === 0) {
        this.endGame();
    }
}

spawnObstacle(Class) {
    const maxAttempts = 10;  // Limit attempts to find a free spot
    let spawnX, isOverlapping, attempts = 0;

    do {
        isOverlapping = false;
        spawnX = Math.floor(Math.random() * (this.width - 50));  // Adjust 50 based on obstacle width
        // Create a temporary obstacle to check its position
        let tempObstacle = new Class(this.gameScreen, spawnX);

        // Check for overlap with existing obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            const existingObstacle = this.obstacles[i];
            const rect1 = tempObstacle.element.getBoundingClientRect();
            const rect2 = existingObstacle.element.getBoundingClientRect();

            if (
                rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top
            ) {
                isOverlapping = true;  // Mark as overlapping
                tempObstacle.element.remove();  // Remove temp obstacle
                // tempObstacle = 0; check if this is the problem
                break;  // Stop checking further
            }
        }

        if (!isOverlapping) {
            this.obstacles.push(tempObstacle);  // Add if no overlap
        } else {
            attempts++;  // Count the failed attempt
        }

    } while (isOverlapping && attempts < maxAttempts);
}


// Function to check score and trigger story box
checkShowStory() {
    for (let scoreThreshold in this.storyMessage) {
        if (this.score >= scoreThreshold && !this.storyDisplayed[scoreThreshold]) {
            this.showStory(this.storyMessage[scoreThreshold]);
            this.storyDisplayed[scoreThreshold] = true;  // Mark message as displayed
        }
    }
}

// Function to display story box
showStory(message) {

    this.storyText.textContent = message;
    this.storyBox.classList.add('visible');
    console.log(this.storyText.textContent);
    clearTimeout(this.storyTimeout);
    this.storyTimeout = setTimeout(() => {
        this.storyBox.classList.remove('visible');
    }, 4000); // Story box disappears after 3 seconds
}

// Example function to update score and check for story triggers
// updateScore(newScore) {
//     this.score = newScore;
//     checkScore();
// }


// reset game logic
reset() {
    //stop game loop
    clearInterval(this.gameIntervalId);
    //erase player
    if(this.player) {
        this.player.element.remove();
    }
    //erase obstacles
    this.obstacles.forEach((obstacle)=>{obstacle.element.remove()});
    this.player.projectiles.forEach((projectile)=>{projectile.element.remove()})
    this.player.projectiles = [];  // Clear the array
    //reset all other stats
    // this.obstacles = [];
    // this.score = 0;
    // this.lives = 3;
    // this.counter = 0;
    // this.gameIsOver = false;
    // this.liveCountElement.innterText = `${this.lives}`;
    }
}

