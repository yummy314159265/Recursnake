const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let rectTimer;

const left = 'left';
const right = 'right';
const up = 'up';
const down = 'down';

const game = {
    width: 500,
    height: 500,
    paused: false,
    speed: 150
}

const snake = {
    length: 1,
    startx: 0,
    starty: 0,
    direction: down,
    width: 20,
    height: 20,
    isEating: function () { 
        return (snake.startx < pellet.x && pellet.x < snake.startx + snake.width && snake.starty < pellet.y && pellet.y < snake.starty + snake.height) 
    }
}

const pellet = {
    radius: snake.width/3
}

const createPellet = () => {
    pellet.x = (Math.floor(Math.random() * (game.width/snake.width)) * snake.width) + snake.width/2;
    pellet.y = (Math.floor(Math.random() * (game.height/snake.height)) * snake.height) + snake.height/2;

    ctx.beginPath();
    ctx.arc(pellet.x, pellet.y, pellet.radius, 0, 2* Math.PI);
    ctx.stroke();
}

const pause = () => {
    if (game.paused) {
        clearInterval(rectTimer);
        game.paused = false;
    } else {
        unpause(); 
        game.paused = true;
    }
}

const moveRectangle = (dir) => {
    
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

const unpause = () => {

    rectTimer = setInterval(() => {
        ctx.clearRect(snake.startx, snake.starty, snake.width, snake.height)
        
        moveRectangle(snake.direction); 
        
        if (snake.isEating()) {
            console.log('pellet eaten');
            createPellet();
        }

        ctx.fillRect(snake.startx, snake.starty, snake.width, snake.height);
    }, game.speed);

}

canvas.addEventListener('keydown', (event) => {

    event.preventDefault();

    if (event.code === "Space") {
        pause();
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
    ctx.fillRect(snake.startx, snake.starty, snake.width, snake.height); 
    createPellet();
}

init();