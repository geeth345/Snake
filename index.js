const board = document.getElementById("game");
const board_ctx = board.getContext("2d");

// colours
bg_colour = 'grey'
snake_colour = 'purple'

// the width and height of the play area (grid squares)
const width = 20;
const height = 20;

// object constructor to represent coordinates
function Coord(X, Y) {
    this.x = X;
    this.y = Y;
}

// snake defined as an array of coordinates
let snake = [
    {x: 9, y: 10},
    {x: 10, y: 10},
    {x: 11, y: 10}
]

// current movement direction stored as interger
var direction = 1;

function clear() {
    board_ctx.fillStyle = bg_colour;
    board_ctx.fillRect(0, 0, board.width, board.height);
    
}

function renderSnake() {
    snake.forEach(renderSnakeUnit);

}

function renderSnakeUnit(unit) {
    let X = (unit.x / width) * board.width;
    let Y = (unit.y / height) * board.height;
    board_ctx.fillStyle = snake_colour;
    board_ctx.fillRect(X, Y, 20, 20);
}

// snake advances by adding a new unit to the front of the snake and removing the last one
function advanceSnake() {
    snake.push(newStartOfSnake())
    snake.shift();
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

    // keycodes for directions
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const LEFT = 37;

    // process keycodes
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

// add the listener to call the key press handling function
document.addEventListener("keydown", handleKeyPress);

clear();
renderSnake();
main();

function main() {
    clear();
    renderSnake();
    advanceSnake();
    setTimeout(() => { main(); }, 200);
}
