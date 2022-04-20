const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let gameTimer;

const left = 'left';
const right = 'right';
const up = 'up';
const down = 'down';

class Snakepart {
    constructor (startx, starty) {
        this.startx = startx;
        this.starty = starty;
    }

    static width = 20;
    static height = 20;

    draw() {
        ctx.fillRect(this.startx, this.starty, Snakepart.width, Snakepart.height); 
    }
}

const game = {
    width: 500,
    height: 500,
    paused: false,
    speed: (1750/60),
    started: false,
    score: 0,
    
    pause: function () {
        if (game.paused) {
            if (!game.started) {
                game.start();
            }
            game.run(); 
            game.paused = false;
        } else {
            clearInterval(gameTimer);
            game.paused = true;
        }
    },

    run: function () {
        gameTimer = setInterval(game.loop, game.speed);
    },

    createEgg: function () {
        egg.x = (Math.floor(Math.random() * (game.width/snake.width)) * snake.width) + snake.width/2;
        egg.y = (Math.floor(Math.random() * (game.height/snake.height)) * snake.height) + snake.height/2;
    
        ctx.beginPath();
        ctx.arc(egg.x, egg.y, egg.radius, 0, 2* Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();

        egg.count = 1;
    },

    loop: function () {
        snake.erase();
        snake.setPreviousPosition();
        snake.move(snake.direction);

        if (snake.isEating()) {
            console.log('egg eaten');
            egg.count--;

            let newPart = new Snakepart(snake.previousx, snake.previousy);
            newPart.draw();
            
            if (egg.count === 0) {
                setTimeout(game.createEgg, 1000);
            }
        }
        
        snake.draw();
    },

    start: function () {
        game.started = true;
        snake.draw()
        game.createEgg();
        
    }
}

const snake = {
    length: 1,
    startx: 0,
    starty: 0,
    previousx: 0,
    previousy: 0,
    direction: down,
    width: 20,
    height: 20,
    
    isEating: function () { 
        snake.length++;
        game.score++;

        return (snake.startx < egg.x && egg.x < snake.startx + snake.width && snake.starty < egg.y && egg.y < snake.starty + snake.height) 
    },

    draw: function () {
        ctx.fillRect(snake.startx, snake.starty, snake.width, snake.height); 
    },

    erase: function () {
        ctx.clearRect(snake.startx, snake.starty, snake.width, snake.height)
    },

    setPreviousPosition: function () {
        snake.previousx = snake.startx;
        snake.previousy = snake.starty;
    },

    move: function (dir) {

        switch(dir) {
            case down:
                if (snake.starty < game.height-20) { 
                    snake.starty += 20;
                } else {
                    snake.starty = 0;
                }
                break;
    
            case up:
                if (snake.starty >= 20) { 
                    snake.starty -= 20;
                } else {
                    snake.starty = game.height-20;
                }
                break;
    
            case right:
                if (snake.startx < game.width-20) { 
                    snake.startx += 20;
                } else {
                    snake.startx = 0;
                }
                break;
    
            case left:
                if (snake.startx >= 20) { 
                    snake.startx -= 20;
                } else {
                    snake.startx = game.width-20;
                }
        }
    }
}

const egg = {
    radius: snake.width/3
}

canvas.addEventListener('keydown', (event) => {

    event.preventDefault();

    if (event.code === "Space") {
        game.pause();
    }

    if (event.code === 'KeyA') {
        snake.direction = left;
    }

    if (event.code === 'KeyW') {
        snake.direction = up;
    }

    if (event.code === 'KeyD') {
        snake.direction = right;
    }

    if (event.code === 'KeyS') {
        snake.direction = down;
    }

})

const init = () => {
    game.pause();
}

init();