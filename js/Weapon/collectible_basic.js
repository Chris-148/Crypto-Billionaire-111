class CollectibleBasic extends FallingObject {
    constructor(gameScreen, leftPosition) {
        let maxSpeedLeft = 0;
        let randomSpeedLeft = (Math.random() < 0.5? -1 : 1) * (Math.floor(Math.random() * maxSpeedLeft));
        super(gameScreen, leftPosition,  "images/collectibleBasic.webp", 60, 60, 3, 0, 0, 0, "basic" , 0);
    }
}
