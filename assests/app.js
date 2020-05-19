// Variables
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const width = 10;

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
timerId = setInterval(moveDown, 1000);

// assign functions to keycodes
function control(e) {
	if (e.keyCode === 37) {
		moveLeft();
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
		random = Math.floor(Math.random() * theTetrominoes.length);
		current = theTetrominoes[random][currentRotation];
		currentPosition = 4;
		draw();
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
