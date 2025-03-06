class Player {
    constructor (
        gameScreen, 
        leftPosition, 
        topPosition, 
        playerWidth, 
        playerHeight,
        playerImgSrc
    ) {
        this.gameScreen = gameScreen; 
        this.leftPosition = leftPosition; 
        this.topPosition = topPosition;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight ; 
        this.directionX = 0;
        this.directionY = 0;
        this.currentWeapon = new Weapon();  // Default weapon is "basic"
        this.projectiles = [];
        this.isShooting = false;

        this.element = document.createElement("img");
        this.element.src = playerImgSrc;
        this.element.style.position = "absolute";
        this.element.style.left = `${leftPosition}px`;
        this.element.style.top = `${topPosition}px`;
        this.element.style.height = `${playerHeight}px`;
        this.element.style.width = `${playerWidth}px`;
        
        gameScreen.append(this.element);
        }
        
        move(){
            this.leftPosition += this.directionX;
            this.topPosition += this.directionY;

              // Ensure that we stay in the screen on the left side
            if (this.leftPosition < 10) {
                this.leftPosition = 10;
            }
            
            if (this.topPosition < 10) {
                this.topPosition = 10;
            }

            if (this.leftPosition > this.gameScreen.offsetWidth - this.playerWidth -10){
                this.leftPosition = this.gameScreen.offsetWidth - this.playerWidth -10
            }
            
            if (this.topPosition > this.gameScreen.offsetHeight - this.playerHeight - 10) {
                this.topPosition = this.gameScreen.offsetHeight - this.playerHeight - 10
            }

        }
        updatePosition(){
            this.element.style.left = `${this.leftPosition}px`; 
            this.element.style.top = `${this.topPosition}px`;
        }


        didCollide(obstacle) {
            const playerRect = this.element.getBoundingClientRect();
            const obstacleRect = obstacle.element.getBoundingClientRect();
            
            if (
                playerRect.left < obstacleRect.right &&
                playerRect.right > obstacleRect.left &&
                playerRect.top < obstacleRect.bottom &&
                playerRect.bottom > obstacleRect.top
              ) {
                return true;
              } else {
                return false;
              }
        }

        shoot() {
            const projectile = new Projectile(
                this.gameScreen,
                this.leftPosition + this.playerWidth / 2,
                this.topPosition,
                0,  // X direction
                -1,  // Y direction (upwards)
                this.currentWeapon, // Pass the current weapon
                this.isShooting = true
            );
            this.projectiles.push(projectile);
           
        }
    
        upgradeWeapon(newType) {
            this.currentWeapon.upgrade(newType);
        }
    }
