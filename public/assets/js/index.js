import { Game } from './lib/Game.js'
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const getSettings = async () => {
    return JSON.parse(localStorage.getItem('canvasSettings')) || { width: 500, height: 500 };
}

const setSettings = (newWidth, newHeight) => {
    const newSettings = {
        width: newWidth,
        height: newHeight
    };

    localStorage.setItem('canvasSettings', newSettings);

    canvas.width = newWidth;
    canvas.height = newHeight;
}

document.addEventListener('DOMContentLoaded', async () => {
    const { width, height } = await getSettings();
    canvas.width = width;
    canvas.height = height;

    const game = new Game(width, height, ctx);

    canvas.addEventListener('keydown', (event) => {
        
        event.preventDefault();
        
        if (event.code === "Space") {
            if (game.started) {
                game.pauseToggle();
            } else {
                game.start();
            }
        }

        const opposite = game.player.oppositeDirection(game.player.direction)

        if (event.code === "KeyW" && 'up' !== opposite) {
            game.setPlayerDirection('up');
        }

        if (event.code === "KeyS" && 'down' !== opposite) {
            game.setPlayerDirection('down');
        }

        if (event.code === "KeyA" && 'left' !== opposite) {
            game.setPlayerDirection('left');
        }

        if (event.code === "KeyD" && 'right' !== opposite) {
            game.setPlayerDirection('right');
        }
    })
})