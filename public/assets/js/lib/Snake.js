class Snake {
    constructor (x, y, gameWidth, gameHeight, width, height) {
        this.x = x;
        this.y = y;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        Snake.parts.push(this);
    }

    static parts = [];

    erase (ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    draw (ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    setPreviousPosition () {
        this.preX = this.x;
        this.preY = this.y;
    }

    move (x, y) {
        this.x = x;
        this.y = y;
    }
}

export { Snake }