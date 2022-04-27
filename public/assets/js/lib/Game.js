import { Player } from './Player.js';
import { Egg } from './Egg.js';
import { Snake } from './Snake.js';
// import * as fs from 'fs/promises';
// import settings from path.join(__dirname, '..', 'settings.json');

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
    }

    run () {
        this.gameTimer = setInterval(() =>  {
            this.loop()           
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
            clearInterval(this.gameTimer);
        }
    }

    gameOver () {
        clearInterval(this.gameTimer);
        Snake.clearSnakeparts();
        this.clearObjects();
        this.restart();
        this.clearScreen();
        this.clearScore();
    }

    filterObj (filteredObj) {
        return this.gameObjects.filter(obj => !(obj instanceof filteredObj));
    }

    checkState () {
        if(this.player.isEating(this.egg)){
            this.gameObjects = this.filterObj(Egg);
            this.playerScored();

            this.egg = new Egg(Player.width, Player.height, this.width, this.height);

            while (this.egg.checkBadSpawn()) {
                this.egg = new Egg(Player.width, Player.height, this.width, this.height);
            };

            this.gameObjects.push(this.egg);

            if (Snake.snakeparts.length === 0) {
                this.gameObjects.push(new Snake(Player.preX, Player.preY, this.width, this.height));
            } else {
                let preX = Snake.snakeparts[Snake.snakeparts.length-1].preX;
                let preY = Snake.snakeparts[Snake.snakeparts.length-1].preY;
                this.gameObjects.push(new Snake(preX, preY, this.width, this.height));
            }
        }

        Snake.snakeparts.forEach(snakepart => {
            if (this.player.hasCollided(snakepart.x, snakepart.y)){
                this.gameOver();
            }
        })
    }

    setPlayerDirection (dir) {
        this.player.direction = dir;
    }

    restart () {
        this.started = false;
    }

    loop () {
        this.gameObjects.forEach(obj => {

            if (obj instanceof Snake || obj instanceof Player) {
                obj.setPreviousPosition();
            }

            obj.erase(this.ctx);

            if(obj instanceof Snake || obj instanceof Player) {
                obj.move();
            }

            obj.draw(this.ctx);
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

    start () {
        this.started = true;
        this.player = new Player(0, 0, this.width, this.height);
        this.egg = new Egg(Player.width, Player.height, this.width, this.height);
        this.gameObjects.push(this.player);
        this.gameObjects.push(this.egg);
        this.run();
    }
}

export { Game }