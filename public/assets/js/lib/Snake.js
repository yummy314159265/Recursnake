import { Player } from './Player.js'

class Snake extends Player {
    constructor (x, y, gameWidth, gameHeight) {
        super(x, y, gameWidth, gameHeight);
        Snake.snakeparts.push(this);
    }

    static snakeparts = [];

    move () {
        const indexOfThis = Snake.snakeparts.indexOf(this);

        if (indexOfThis > 0) {
            this.x = Snake.snakeparts[indexOfThis-1].preX;
            this.y = Snake.snakeparts[indexOfThis-1].preY;
        } else {
            this.x = Player.preX;
            this.y = Player.preY;
        }
    }

    setPreviousPosition () {
        this.preX = this.x;
        this.preY = this.y;
    }

    static clearSnakeparts () {
        Snake.snakeparts = [];
    }
}

export { Snake }