class Weapon {
    constructor(type = "basic") {
        this.type = type;
        this.setProperties(type);
    }

    setProperties(type) {
        switch (type) {
            case "basic":
                this.color = "yellow";
                this.speed = 2;
                this.size = 10;
                break;
            case "laser":
                this.color = "red";
                this.speed = 3;
                this.size = 15;
                break;
            case "spread":
                this.color = "green";
                this.speed = 2;
                this.size = 40;
                break;
            default:
                this.color = "yellow";
                this.speed = 8;
                this.size = 10;
        }
    }

    upgrade(type) {
        this.type = type;
        this.setProperties(type);
    }
}
