class Pepe extends FallingObject{
    constructor (gameScreen, leftPosition){
        let maxSpeedLeft = 2;
        let randomSpeedLeft = (Math.random() < 0.5? -1 : 1) * (Math.floor(Math.random() * maxSpeedLeft));
        super (gameScreen, leftPosition, "images/PepeCoin.png", 20, 20, 3, 0, randomSpeedLeft, 0, "pepe", -500000)
        //console.log(this.gameScreen.offsetWidth);
    }
}