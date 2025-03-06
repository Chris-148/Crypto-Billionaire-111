class Bitcoin extends FallingObject{
    constructor (gameScreen, leftPosition){
        let maxSpeedLeft = 0;
        let randomSpeedLeft = (Math.random() < 0.5? -1 : 1) * (Math.floor(Math.random() * maxSpeedLeft));
        super (gameScreen, leftPosition, "../images/Bitcoin.png", 60, 60, 4, 0, randomSpeedLeft, 0, "bitcoin", 1000000)
        //console.log(this.gameScreen.offsetWidth);
    }
}