import { Snake } from './Snake.js'

class Player extends Snake {
    constructor (x, y, gameWidth, gameHeight, width, height) {
        super(x, y, gameWidth, gameHeight, width, height);
        this.length = 1;
        this.direction = 'down';
    };

    grow () {
        this.length++;
    }

    isEating (egg) {
        return (this.x === egg.x && this.y === egg.y);
    }

    hasCollided (x, y) {
        if (this.x === x && this.y === y) {
            return true;
        }

        return false;
    }

    setDirection (dir) {
        this.direction = dir;
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
        if (this.x === this.preX && this.y === this.preY) {
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