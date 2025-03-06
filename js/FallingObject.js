class FallingObject {
    constructor(gameScreen, leftPosition, imgSrc, width, height, speedTop, accelerationTop, speedLeft, accelerationLeft, type, scoreValue) {
        this.gameScreen = gameScreen;
        this.leftPosition = leftPosition;
        this.topPosition = 0;
        this.width = width;
        this.height = height;
        this.speedTop = speedTop;
        this.speedLeft =speedLeft;
        this.accelerationTop = accelerationTop;
        this.accelerationLeft = accelerationLeft;
        this.type = type;
        this.scoreValue = scoreValue;
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.leftPosition}px`;
        this.element.style.top = `${this.topPosition}px`;
        gameScreen.appendChild(this.element);

    }

    move() {
        // Increase speedTop based on accelerationTop, speedLeft, accelerationLeft
        this.speedTop += this.accelerationTop
        this.topPosition += this.speedTop;
        this.speedLeft += this.accelerationLeft;
        this.leftPosition += this.speedLeft;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.leftPosition}px`;
        this.element.style.top = `${this.topPosition}px`;
    }

    didCollide(otherObject) {
        const rect1 = this.element.getBoundingClientRect();
        const rect2 = otherObject.element.getBoundingClientRect();

        if (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
          ) {
            return true;
          } else {
            return false;
          }
    }
}