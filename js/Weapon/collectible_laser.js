class CollectibleLaser extends FallingObject {
    constructor(gameScreen, leftPosition) {
        let maxSpeedLeft = 0;
        let randomSpeedLeft = (Math.random() < 0.5? -1 : 1) * (Math.floor(Math.random() * maxSpeedLeft));
        super(gameScreen, leftPosition,  "../images/laser.webp", 100, 100, 3, 0, 0, 0, "laser" , 0);
    }
}
