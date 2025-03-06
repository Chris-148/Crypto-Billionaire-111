class Libra extends FallingObject{
    constructor (gameScreen, leftPosition){
        let maxSpeedLeft = 0;
        let randomSpeedLeft = (Math.random() < 0.5? -1 : 1) * (Math.floor(Math.random() * maxSpeedLeft));
        super (gameScreen, leftPosition, "images/Libra.webp", 50, 50, 2, 0.1, randomSpeedLeft, 0, "libra", -1000000)
        //console.log(this.gameScreen.offsetWidth);
    }
}