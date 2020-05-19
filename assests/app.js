// Variables
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const width = 10;
let nextRandom = 0;
let timerId;

// The tetrominoes
const lTetromino = [
	[ 1, width + 1, width * 2 + 1, 2 ],
	[ width, width + 1, width + 2, width * 2 + 2 ],
	[ 1, width + 1, width * 2 + 1, width * 2 ],
	[ width, width * 2, width * 2 + 1, width * 2 + 2 ]
];

const zTetromino = [
	[ 0, width, width + 1, width * 2 + 1 ],
	[ width + 1, width + 2, width * 2, width * 2 + 1 ],
	[ 0, width, width + 1, width * 2 + 1 ],
	[ width + 1, width + 2, width * 2, width * 2 + 1 ]
];

const tTetromino = [
	[ 1, width, width + 1, width + 2 ],
	[ 1, width + 1, width + 2, width * 2 + 1 ],
	[ width, width + 1, width + 2, width * 2 + 1 ],
	[ 1, width, width + 1, width * 2 + 1 ]
];

const oTetromino = [
	[ 0, 1, width, width + 1 ],
	[ 0, 1, width, width + 1 ],
	[ 0, 1, width, width + 1 ],
	[ 0, 1, width, width + 1 ]
];

const iTetromino = [
	[ 1, width + 1, width * 2 + 1, width * 3 + 1 ],
	[ width, width + 1, width + 2, width + 3 ],
	[ 1, width + 1, width * 2 + 1, width * 3 + 1 ],
	[ width, width + 1, width + 2, width + 3 ]
];

const theTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino ];

let currentPosition = 4;
let currentRotation = 0;

// Select the tetrominoes at random
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

// Draw the tetrominoes
function draw() {
	current.forEach((index) => {
		squares[currentPosition + index].classList.add('tetromino');
	});
}

// Undraw the tetrominoes
function undraw() {
	current.forEach((index) => {
		squares[currentPosition + index].classList.remove('tetromino');
	});
}

// Make the tetrominoes move down the grid
//timerId = setInterval(moveDown, 1000);

// assign functions to keycodes
function control(e) {
	if (e.keyCode === 37) {
		moveLeft();
	} else if (e.keyCode === 38) {
		// rotate
		rotate();
	} else if (e.keyCode === 39) {
		// move Right
		moveRight();
	} else if (e.keyCode === 40) {
		// move down but faster
		moveDown();
	}
}

document.addEventListener('keyup', control);

// moveDown function
function moveDown() {
	undraw();
	currentPosition += width;
	draw();
	freeze();
}

// freeze function
function freeze() {
	if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
		current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
		// Start a new tetromino falling
		random = nextRandom;
		nextRandom = Math.floor(Math.random() * theTetrominoes.length);
		current = theTetrominoes[random][currentRotation];
		currentPosition = 4;
		draw();
		displayShape();
	}
}

// move the tetromino left unless it is at the edge or there is a blockage
function moveLeft() {
	undraw();

	const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

	if (!isAtLeftEdge) currentPosition -= 1;

	if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
		currentPosition += 1;
	}

	draw();
}

// move the terromino rigth unless it is at the edge or there is a blockage
function moveRight() {
	undraw();

	const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

	if (!isAtRightEdge) currentPosition += 1;

	if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
		currentPosition -= 1;
	}

	draw();
}

// rotate the tetromino
function rotate() {
	undraw();

	currentRotation++;

	if (currentRotation === current.length) {
		currentRotation = 0;
	}

	current = theTetrominoes[random][currentRotation];

	draw();
}

// show up-next tetromino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

//the tetrominos without rotations
const upNextTetrominoes = [
	// L tetromino
	[ 1, displayWidth + 1, displayWidth * 2 + 1, 2 ],
	// z tetromino
	[ 0, displayWidth, displayWidth + 1, displayWidth * 2 + 1 ],
	//T tetromino
	[ 1, displayWidth, displayWidth + 1, displayWidth + 2 ],
	//O tetromino
	[ 0, 1, displayWidth, displayWidth + 1 ],
	// I Tetromino
	[ 1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1 ]
];

// Display the up next tetromino in the mini gird
function displayShape() {
	displaySquares.forEach((square) => {
		square.classList.remove('tetromino');
	});

	upNextTetrominoes[nextRandom].forEach((index) => {
		displaySquares[displayIndex + index].classList.add('tetromino');
	});
}

// add functionality to the button
startBtn.addEventListener('click', () => {
	if (timerId) {
		clearInterval(timerId);
		timerId = null;
	} else {
		draw();
		timerId = setInterval(moveDown, 1000);
		nextRandom = Math.floor(Math.random() * theTetrominoes.length);
		displayShape();
	}
});
