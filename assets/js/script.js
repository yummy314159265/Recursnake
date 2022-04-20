const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

let startx = 0;
let starty = 0;
let timer;
let pauseToggle = false;
let speed = 250;
let rectTimer;
let left = 'left';
let right = 'right';
let up = 'up';
let down = 'down';
let direction = down;
let pelletPosition;
const width = 20;
const height = 20;
const gameWidth = 500;
const gameHeight = 500;

const createPellet = () => {
    let posx = (Math.floor(Math.random() * (gameWidth/width)) * width) + width/2;
    let posy = (Math.floor(Math.random() * (gameHeight/height)) * height) + height/2;

    ctx.beginPath();
    ctx.arc(posx, posy, width/3, 0, 2* Math.PI);
    ctx.stroke();

    pelletPosition = {
        x: posx,
        y: posy
    }
}

const pause = () => {
    if (pauseToggle) {
        clearInterval(rectTimer);
        pauseToggle = false;
    } else {
        unpause(); 
        pauseToggle = true;
    }
}

const moveRectangle = (dir) => {
    
    switch(dir) {
        case down:
            if (starty < gameHeight-20) { 
                starty += 20;
            } else {
                starty = 0;
            }
            break;

        case up:
            if (starty >= 20) { 
                starty -= 20;
            } else {
                starty = gameHeight-20;
            }
            break;

        case right:
            if (startx < gameWidth-20) { 
                startx += 20;
            } else {
                startx = 0;
            }
            break;

        case left:
            if (startx >= 20) { 
                startx -= 20;
            } else {
                startx = gameWidth-20;
            }
    }

    if (startx < pelletPosition.x && pelletPosition.x < startx + width && starty < pelletPosition.y && pelletPosition.y < starty + width) {
        console.log('eaten');
        createPellet();
    }
}

const unpause = () => {

    rectTimer = setInterval(() => {
        ctx.clearRect(startx, starty, width, height)
        
        moveRectangle(direction); 

        ctx.fillRect(startx, starty, width, height);
    }, speed);

}

canvas.addEventListener('keydown', (event) => {

    event.preventDefault();


    if (event.code === "Space") {
        pause();
    }

    if (event.code === 'KeyA') {
        direction = left;
    }

    if (event.code === 'KeyW') {
        direction = up;
    }

    if (event.code === 'KeyD') {
        direction = right;
    }

    if (event.code === 'KeyS') {
        direction = down;
    }

})

const init = () => {
    ctx.fillRect(startx, starty, width, height); 
    createPellet();
}

init();