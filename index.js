const board = document.getElementById("game");
const board_ctx = board.getContext("2d");

// colours
snakeColour = "#e9c46a";
deathColour = "#ff9241";
foodColour = "#e76f51";

// the width and height of the play area (grid squares)
const width = 20;
const height = 20;
const unitWidth = board.width / width;
const unitHeight = board.height / height;


// keycodes for directions
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

// snake defined as an array of coordinates
let snake = [
    {x: 9, y: 10},
    {x: 10, y: 10},
    {x: 11, y: 10}
]

// food defined as an array of coordinates
let food = {x: 15, y: 15}

// score 
let score = 0;
const scoreboard = document.getElementById("score");

// restart button
const restart = document.getElementById("newgame");

// current movement direction stored as interger
var direction = 1;

// player's moves are stored as a queue, allowing for more natural controls
let moveQueue = [];

// current game state
var alive = true;


function clear() {
    board_ctx.clearRect(0, 0, board.width, board.height);
}

function renderSnake() {
    snake.forEach(unit => {
        fillCoord(unit, snakeColour);
    });
}

function fillCoord(unit, colour) {
    let X = (unit.x / width) * board.width;
    let Y = (unit.y / height) * board.height;
    board_ctx.fillStyle = colour;
    board_ctx.fillRect(X, Y, unitWidth, unitHeight);
}

function renderDeath() {
    snake.forEach(unit => {
        fillCoord(unit, deathColour);
    });
}

function renderFood() {
    fillCoord(food, foodColour);
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
    if (start.x < 0 || start.y < 0 || start.x >= width || start.y >= height || snake.some((u) => u.x == start.x && u.y == start.y)) {
        alive = false;
    } 
    if (alive) {
        // checking if the coordinate the snake is moving into has food in it
        if (food.x == start.x && food.y == start.y) {
            snake.push(start);
            resetFood();
            score += 10;
            scoreboard.innerText = score;
        } else {
            snake.push(start);
            snake.shift();
        }
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

function resetFood() {
    collision = true;
    while (collision) {
        food.x = Math.floor(Math.random() * width);
        food.y = Math.floor(Math.random() * height);
        if (!(snake.some((u) => u.x == food.x && u.y == food.y))) {
            collision = false;
        }
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



function main() {
    // movement phase 
    advanceSnake();

    // drawing phase
    if (alive) {
        clear();
        renderFood();
        renderSnake();
        setTimeout(() => { main(); }, 100); // delay
    } else {
        clear();
        renderDeath();
    }

}


function startNewGame() {
    score = 0;
    alive = true;
    scoreboard.innerText = score;
    snake = [
        {x: 9, y: 10},
        {x: 10, y: 10},
        {x: 11, y: 10}
    ];
    food = {x: 15, y: 15};
    moveQueue = [];
    clear();
    renderSnake();
    main();
}

restart.addEventListener("click", function() {
    if (!alive) {
        startNewGame();
    }
})


startNewGame();