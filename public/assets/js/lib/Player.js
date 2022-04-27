class Player {
    constructor (x, y, gameWidth, gameHeight) {
        this.x = x;
        this.y = y;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.length = 1;
        this.direction = 'down';
    };

    static width = 20;
    static height = 20;

    static preX = this.x;
    static preY = this.y;

    isEating (egg) {
        return (this.x === egg.x && this.y === egg.y);
    }

    erase (ctx) {
        ctx.clearRect(this.x, this.y, Player.width, Player.height);
    }

    draw (ctx) {
        ctx.fillRect(this.x, this.y, Player.width, Player.height);
    }

    setPreviousPosition () {
        Player.preX = this.x;
        Player.preY = this.y;
    }

    hasCollided (x, y) {
        if (this.x === x && this.y === y) {
            return true;
        }

        return false;
    }

    oppositeDirection () {
        switch (this.direction) {
            case 'down':
                return 'up';
            case 'up':
                return 'down';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
        }
    }

    catchBadReverse () {
        if (this.x === Player.preX && this.y === Player.preY) {
            this.direction = this.oppositeDirection()

            switch (this.direction) {
                case 'down':
                    if (this.y < this.gameHeight-20) { 
                        this.y += 40;
                    } else {
                        this.y = 0;
                    }
                    break;
        
                case 'up':
                    if (this.y >= 20) { 
                        this.y -= 40;
                    } else {
                        this.y = this.gameHeight-20;
                    }
                    break;
        
                case 'right':
                    if (this.x < this.gameWidth-20) { 
                        this.x += 40;
                    } else {
                        this.x = 0;
                    }
                    break;
        
                case 'left':
                    if (this.x >= 20) { 
                        this.x -= 40;
                    } else {
                        this.x = this.gameWidth-20;
                    }
            }
        }
    }

    move () {
        switch (this.direction) {
            case 'down':
                if (this.y < this.gameHeight-20) { 
                    this.y += 20;
                } else {
                    this.y = 0;
                }
                break;
    
            case 'up':
                if (this.y >= 20) { 
                    this.y -= 20;
                } else {
                    this.y = this.gameHeight-20;
                }
                break;
    
            case 'right':
                if (this.x < this.gameWidth-20) { 
                    this.x += 20;
                } else {
                    this.x = 0;
                }
                break;
    
            case 'left':
                if (this.x >= 20) { 
                    this.x -= 20;
                } else {
                    this.x = this.gameWidth-20;
                }
        }

        this.catchBadReverse();
    }
}

export { Player };