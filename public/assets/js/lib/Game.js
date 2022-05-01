import { Player } from './Player.js';
import { Egg } from './Egg.js';
import { Snake } from './Snake.js';

class Game {
    constructor (width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.fps = 30;
        this.paused = false;
        this.started = false;
        this.score = 0;
        this.gameObjects = [];
        this.box = {
            width: 20,
            height: 20
        }
    }

    start () {
        this.started = true;
        this.spawnPlayer (0, 0);
        this.spawnEgg();
        this.run();
    }

    run () {
        this.gameTimer = setInterval(() =>  {
            this.loop();           
        }, 1000/this.fps);
    }

    pauseToggle () {
        if (this.paused) {
            this.run();
            this.paused = false;
        } else {
            this.pause();
            this.paused = true;
        }
    }

    pause () {
        if (this.gameTimer) {
            this.stopTimer();
        }
    }

    stopTimer () {
        clearInterval(this.gameTimer);
    }

    gameOver () {
        this.stopTimer();
        this.clearObjects();
        this.restart();
        this.clearScreen();
        this.clearScore();
    }

    checkCollision (player, objArray) {
        let collided = false;
        objArray.forEach(obj => {
            console.log(obj, player)

            if (obj === player) {
                return;
            }

            if (player.hasCollided(obj.x, obj.y)) {
                collided = true;
            }
        });

        return collided;
    }

    checkState () {
        if(this.player.isEating(this.egg)){
            this.playerScored();

            this.player.grow();

            this.destroyEgg();
            setTimeout(() => this.spawnEgg(), 1000);

            this.spawnSnake();
        }

        if (this.checkCollision(this.player, Snake.parts.filter(part => part !== this.player))) {
            this.gameOver();
        }
    }

    restart () {
        this.started = false;
    }

    loop () {
        this.gameObjects.forEach(obj => {
            if (obj instanceof Player) {
                obj.setPreviousPosition();
                obj.erase(this.ctx);
                obj.move();
                obj.draw(this.ctx);
            } else if (obj instanceof Snake) {
                obj.setPreviousPosition();
                obj.erase(this.ctx);
                let index = Snake.parts.indexOf(obj)
                obj.move(Snake.parts[index-1].preX, Snake.parts[index-1].preY);
                obj.draw(this.ctx);
            } else if (obj instanceof Egg) {
                obj.erase(this.ctx);
                obj.draw(this.ctx);
            }
        });

        this.checkState();
    }

    playerScored () {
        this.score++;
    }

    clearObjects () {
        this.gameObjects = [];
    }

    clearScore () {
        this.score = 0;
    }

    clearScreen () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    removeObj (obj) {
        return this.gameObjects.filter(gameObj => gameObj !== obj);
    }

    spawnPlayer (x, y) {
        this.player = new Player(x, y, this.width, this.height, this.box.width, this.box.height);
        this.gameObjects.push(this.player);
    }

    spawnEgg () {
        this.egg = new Egg(this.box.width, this.box.height, this.width, this.height);

        while (this.egg.checkBadSpawn(Snake.parts)) {
            this.egg = new Egg(this.box.width, this.box.height, this.width, this.height);
        };

        this.gameObjects.push(this.egg);
    }

    destroyEgg () {
        this.gameObjects = this.removeObj(this.egg);
        this.egg.remove();
    }

    spawnSnake () {
        let preX = Snake.parts[Snake.parts.length-1].preX;
        let preY = Snake.parts[Snake.parts.length-1].preY;
        this.gameObjects.push(new Snake(preX, preY, this.width, this.height, this.box.width, this.box.height));
    }
}

export { Game }