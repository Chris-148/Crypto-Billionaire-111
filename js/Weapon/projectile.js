class Projectile {
    constructor(gameScreen, left, top, directionX, directionY, weapon) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.speed = weapon.speed;
        this.size = weapon.size;
        this.directionX = directionX;
        this.directionY = directionY;

        // Create a custom HTML element for the projectile
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.backgroundColor = weapon.color;
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.borderRadius = "50%";
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX * this.speed;
        this.top += this.directionY * this.speed;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    destroy() {
        this.element.remove();
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