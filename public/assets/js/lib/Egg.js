class Egg {
    constructor (width, height, gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.radius = this.width/3;
        this.x = Math.floor(Math.random() * ((this.gameWidth-20)/this.width)) * this.width;
        this.y = Math.floor(Math.random() * ((this.gameHeight-20)/this.height)) * this.height;
        this.centerX = this.x+(this.width/2);
        this.centerY = this.y+(this.height/2);
        this.name = 'Egg';
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2* Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    }

    erase (ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    remove () {
        this.x = -50;
        this.y = -50;
    }

    checkBadSpawn (objs) {

        let badSpawn = false;
        
        objs.forEach(obj => {
            console.log(`checking egg spawn at ${obj.x}, ${obj.y}`)
            if (this.x === obj.x && this.y === obj.y) {
                console.log(`bad spawn at ${this.x} ${this.y}`);
                badSpawn = true;
            }
        })

        return badSpawn;
    }
}

export { Egg };