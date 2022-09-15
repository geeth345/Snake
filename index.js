const board = document.getElementById("game");
const board_ctx = board.getContext("2d");

// colours
bgColour = "grey";
snakeColour = "purple";
deathColour = "red";

// the width and height of the play area (grid squares)
const width = 50;
const height = 50;
const unitWidth = board.width / width;
const unitHeight = board.height / height;


// keycodes for directions
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

// snake defined as an array of coordinates
let snake = [
    {x: 7, y: 10},
    {x: 8, y: 10},
    {x: 9, y: 10},
    {x: 10, y: 10},
    {x: 11, y: 10}
]

// current movement direction stored as interger
var direction = 1;

// player's moves are stored as a queue, allowing for more natural controls
let moveQueue = [];

// current game state
var alive = true;


function clear() {
    board_ctx.fillStyle = bgColour;
    board_ctx.fillRect(0, 0, board.width, board.height);
    
}

function renderSnake() {
    snake.forEach(unit => {
        renderSnakeUnit(unit, snakeColour);
    });
}

function renderSnakeUnit(unit, colour) {
    let X = (unit.x / width) * board.width;
    let Y = (unit.y / height) * board.height;
    board_ctx.fillStyle = colour;
    board_ctx.fillRect(X, Y, unitWidth, unitHeight);
}

function renderDeath() {
    snake.forEach(unit => {
        renderSnakeUnit(unit, deathColour);
    });
}

// snake advances by adding a new unit to the front of the snake and removing the last one
function advanceSnake() {
    if (moveQueue.length > 0) {
        var key = moveQueue.shift();
        if (key === UP && (direction % 2) != 0) {
            direction = 0;
        } else if (key === RIGHT && (direction % 2) == 0) {
            direction = 1;
        } else if (key === DOWN && (direction % 2) != 0) {
            direction = 2;
        } else if (key === LEFT && (direction % 2) == 0) {
            direction = 3;
        } 
    }
    start = newStartOfSnake();
    if (start.x < 0 || start.y < 0 || start.x >= width || start.y >= height || start in snake) {
        alive = false;
    }
    if (alive) {
        snake.push(start);
        snake.shift();
    }
}

function newStartOfSnake() {
    x = snake[snake.length - 1].x;
    y = snake[snake.length - 1].y;
    if (direction == 0) {
        return {x: x, y: y - 1};
    } else if (direction == 1) {
        return {x: x + 1, y: y};
    } else if (direction == 2) {
        return {x: x, y: y + 1};
    } else if (direction == 3) {
        return {x: x - 1, y: y};
    }
}

// handle when a user input is received
function handleKeyPress(event) {
    const key = event.keyCode;
    // process keycodes: if the key pressed is a move, add it to the queue
    if (key >= 37 && key <= 40 && moveQueue.length <= 2) {
        moveQueue.push(key);
    }
}

// add the listener to call the key press handling function
document.addEventListener("keydown", handleKeyPress);

clear();
renderSnake();
main();

function main() {
    // movement phase 
    advanceSnake();

    // drawing phase
    clear();
    if (alive) {
        renderSnake();
        setTimeout(() => { main(); }, 100); // delay
    } else {
        renderDeath();
    }

}