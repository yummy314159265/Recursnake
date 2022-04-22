const startDivEl = document.querySelector('#start');
const startTextEl = document.querySelector('#start-text');
const gameOverEl = document.querySelector('#game-over');
const scoreEl = document.querySelector('#score');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let gameTimer;

const left = 'left';
const right = 'right';
const up = 'up';
const down = 'down';

// TODO egg.x and egg.y must be changed and create egg.center

class Snakepart {
    constructor (startx, starty) {
        this.startx = startx;
        this.starty = starty;
        this.previousx = startx;
        this.previousy = starty;
    }

    static width = 20;
    static height = 20;
    static snakeparts = [];

    draw () {
        ctx.fillRect(this.startx, this.starty, Snakepart.width, Snakepart.height); 
    }

    erase () {
        ctx.clearRect(this.startx, this.starty, Snakepart.width, Snakepart.height)
    }

    setPreviousPosition () {
        this.previousx = this.startx;
        this.previousy = this.starty;
    }

    static destroyAll () {
        Snakepart.snakeparts = [];
    }

    static move () {
        for(let i = 0; i < Snakepart.snakeparts.length; i++) {
            Snakepart.snakeparts[i].erase();
            Snakepart.snakeparts[i].setPreviousPosition();

            if (i === 0) {
                Snakepart.snakeparts[i].startx = snake.previousx;
                Snakepart.snakeparts[i].starty = snake.previousy;
            } else {
                Snakepart.snakeparts[i].startx = Snakepart.snakeparts[i-1].previousx;
                Snakepart.snakeparts[i].starty = Snakepart.snakeparts[i-1].previousy;
            }

            Snakepart.snakeparts[i].draw();
        }
    }
}

const game = {
    width: 500,
    height: 500,
    paused: false,
    speed: 2000/60,
    started: false,
    score: 0,
    
    pause: function () {
        if (game.paused) {
            if (!game.started) {
                game.start();
            }
            game.run(); 
            startDivEl.style.display = 'none';
            game.paused = false;
        } else {
            clearInterval(gameTimer);
            startDivEl.style.display = 'block';
            game.paused = true;
        }
    },

    run: function () {
        gameTimer = setInterval(game.loop, game.speed);
    },

    drawEgg: function () {
        ctx.beginPath();
        ctx.arc(egg.centerx, egg.centery, egg.radius, 0, 2* Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    },

    checkBadSpawn: function () {
        if (egg.x === snake.startx && egg.y === snake.starty) {
            console.log('bad spawn at ' + egg.x, egg.y)
            game.createEgg();
        }

        if (snake.length > 1) {
            if (egg.x === Snakepart.snakeparts[Snakepart.snakeparts.length -1].previousx && egg.y === Snakepart.snakeparts[Snakepart.snakeparts.length -1].previousy) {
                console.log('bad spawn at ' + egg.x, egg.y)
                game.createEgg();
            }
        }

        for (const snakepart of Snakepart.snakeparts) {
            if (egg.x === snakepart.startx && egg.y === snakepart.starty) {
                console.log('bad spawn at ' + egg.x, egg.y)
                game.createEgg();
            }
        }
    },

    createEgg: function () {
        egg.x = Math.floor(Math.random() * ((game.width-20)/egg.width)) * egg.width;
        egg.y = Math.floor(Math.random() * ((game.height-20)/egg.height)) * egg.height;
        egg.centerx = egg.x+(egg.width/2)
        egg.centery = egg.y+(egg.height/2)
        game.checkBadSpawn();
        game.drawEgg();
        console.log('egg spawned at ' + egg.x, egg.y)
    },

    removeEgg: function () {
        egg.x = -50;
        egg.y = -50;
    },

    over: function () {
        clearInterval(gameTimer);
        scoreEl.textContent = `Score: ${game.score}`
        gameOverEl.style.display = "block";
        startTextEl.textContent = 'press space to start';
        game.started = false;
    },

    checkState: function () {
        if (snake.isEating()) {
            console.log('egg eaten');

            snake.length++;
            game.score++;
    
            game.removeEgg();

            snake.createNewPart();
            
            setTimeout(game.createEgg, 1000);
        }

        if (snake.hasCollided()) {
            game.over();
        }
    },

    loop: function () {
        snake.move(snake.direction);
        Snakepart.move();

        game.checkState();
    },

    eraseAll: function () {
        ctx.clearRect(0, 0, game.width, game.height);
    },

    start: function () {
        startDivEl.style.display = 'none';
        startTextEl.textContent = 'paused';
        game.started = true;
        snake.startx = 0;
        snake.starty = 0;
        snake.length = 1;
        game.score = 0;
        snake.direction = down;
        scoreEl.textContent = ``
        gameOverEl.style.display = 'none';
        Snakepart.destroyAll();
        game.eraseAll();
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
        return (snake.startx === egg.x && snake.starty === egg.y) 
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
    
    getPreviousPosition: function () {
        return [snake.previousx, snake.previousy]
    },

    createNewPart: function () {

        let newPart;

        if (snake.length === 2) {
            newPart = new Snakepart(snake.previousx, snake.previousy);
        } else {
            newPart = new Snakepart(Snakepart.snakeparts[Snakepart.snakeparts.length-1].previousx, Snakepart.snakeparts[Snakepart.snakeparts.length-1].previousy);
        }

        Snakepart.snakeparts.push(newPart);
    },

    oppositeDir: function (dir) {
        switch (dir) {
            case down:
                return up;
            case up:
                return down;
            case left:
                return right;
            case right:
                return left;
        }
    },

    hasCollided: function () {
        for (const snakepart of Snakepart.snakeparts) {
            if (snake.startx === snakepart.startx && snake.starty === snakepart.starty) {
                return true;    
            }
        }

        return false;
    },

    catchBadReverse: function () {
        switch (snake.direction) {
            case down:
                if (snake.starty < game.height-20) { 
                    snake.starty += 40;
                } else {
                    snake.starty = 0;
                }
                break;
    
            case up:
                if (snake.starty >= 20) { 
                    snake.starty -= 40;
                } else {
                    snake.starty = game.height-20;
                }
                break;
    
            case right:
                if (snake.startx < game.width-20) { 
                    snake.startx += 40;
                } else {
                    snake.startx = 0;
                }
                break;
    
            case left:
                if (snake.startx >= 20) { 
                    snake.startx -= 40;
                } else {
                    snake.startx = game.width-20;
                }
        }
    },

    move: function (dir) {

        snake.erase();
        let previousPos = snake.getPreviousPosition();
        snake.setPreviousPosition();

        switch (dir) {
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

        if (snake.startx === previousPos[0] &&  snake.starty === previousPos[1]) {
            snake.direction = snake.oppositeDir(dir);
            snake.catchBadReverse();
        }

        snake.draw();
    }
}

const egg = {
    radius: snake.width/3,
    height: snake.height,
    width: snake.width
}

canvas.addEventListener('keydown', (event) => {

    event.preventDefault();
    const opposite = snake.oppositeDir(snake.direction);

    if (event.code === "Space") {
        gameOverEl.style.display = 'none';
        game.pause();
    }

    if (event.code === 'KeyA' && left !== opposite) {
        snake.direction = left;
    }

    if (event.code === 'KeyW' && up !== opposite) {
        snake.direction = up;
    }

    if (event.code === 'KeyD' && right !== opposite) {
        snake.direction = right;
    }

    if (event.code === 'KeyS' && down !== opposite) {
        snake.direction = down;
    }

})

const init = () => {
    game.pause();
}

init();