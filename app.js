const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')

let result = 0;
let snakeIntervalId
let currentShooterIndex = 202;
const gridWidth = 15;
const gridCount = 225;
let snakeHeadCurrentPosition = 105
const snakeInitialLength = 2
let snakePosition = [107, 106]
let direction = 'right'

for (let i = 0; i < gridCount; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

function drawSnake() {
	for(let i = 0; i < snakePosition.length; i++) {
		squares[snakePosition[i]].classList.add('snake')
	}
}

drawSnake()

function moveSnake() {
	const tailPosition = snakePosition[snakePosition.length-1]
	const headPosition = snakePosition[0]
	let newHeadPosition

	switch (direction) {
		case 'right':
			if(headPosition % gridWidth === gridWidth - 1) {
				newHeadPosition = Math.floor(headPosition / gridWidth) * gridWidth
			} else {
				newHeadPosition = snakePosition[0] + 1
			}
			break;
		case 'left':
			if(headPosition % gridWidth === 0) {
				newHeadPosition = ((Math.floor(headPosition / gridWidth) + 1) * gridWidth) - 1
			} else {
				newHeadPosition = snakePosition[0] - 1
			}
			break;
		case 'up':
			if(headPosition < gridWidth) {
				newHeadPosition = headPosition + (gridWidth * (gridWidth -1))
			} else {
				newHeadPosition = snakePosition[0] - gridWidth 
			}
			break;
		case 'down':
			if(headPosition >= (gridWidth * (gridWidth -1))) {
				newHeadPosition = headPosition - (gridWidth * (gridWidth -1))
			} else {
				newHeadPosition = snakePosition[0] + gridWidth 
			}
			break;
	
		default:
			break;
	}

	if(squares[newHeadPosition].classList.contains('snake')) {
		resultDisplay.innerHTML = 'GAME OVER'
		clearInterval(snakeIntervalId)
		return null
	}
	if(squares[newHeadPosition].classList.contains('food')) {	
		squares[newHeadPosition].classList.remove('food')
		drawFood()
		result++
		resultDisplay.innerHTML = result
	} else {
		squares[tailPosition].classList.remove('snake')
		snakePosition.splice(-1, 1)

	}

	
	snakePosition.splice(0, 0, newHeadPosition)
	squares[snakePosition[0]].classList.add('snake')
}
moveSnake()

snakeIntervalId = setInterval(moveSnake, 300)

function changeDirection(e) {
	switch (e.code) {
				case "ArrowLeft":
					if(direction !== 'right') direction = 'left'
					break;
				case "ArrowRight":
					if(direction !== 'left') direction = 'right'
					break;
				case "ArrowUp":
					if(direction !== 'down') direction = 'up'
					break;
				case "ArrowDown":
					if(direction !== 'up') direction = 'down'
					break;

				default:
					break;
			}
}

function drawFood() {
	let foodPosition
	do {
		foodPosition = Math.floor(Math.random() * (gridCount - 1))
	} while (snakePosition.indexOf(foodPosition) !== -1) 
	squares[foodPosition].classList.add('food')
}

drawFood()

document.addEventListener('keydown', changeDirection)


// function moveShooter(e) {
// 	squares[currentShooterIndex].classList.remove('shooter')
// 	switch (e.code) {
// 		case "ArrowLeft":
// 			if (currentShooterIndex % gridWidth !== 0) currentShooterIndex -= 1
// 			break;
// 		case "ArrowRight":
// 			if (currentShooterIndex % gridWidth !== gridWidth -1) currentShooterIndex += 1
// 			break;
	
// 		default:
// 			break;
// 	}
// 	squares[currentShooterIndex].classList.add('shooter')
// }


// document.addEventListener('keydown', moveShooter)

