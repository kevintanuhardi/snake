const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')

let result = 0;
let invadersIntervalId
let currentShooterIndex = 202;
const gridWidth = 15;
const gridCount = 225;
const invaderDimensions = {
	height: 3,
	width: 10
}
let goingRight = true;
let currentInvaderIndex = 0;

let invaderIndex = [];
// position to currentInvaderIndex
let invaderRemoved = [];

for (let i = 0; i < gridCount; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

function drawInvader() {
	for (let i = 0; i < invaderDimensions.height; i++) {
		for(let j = 0; j < invaderDimensions.width; j++) {
			// console.log('inv', invaderRemoved);
			
			invaderIndex.push(currentInvaderIndex + (i * gridWidth) + j )
		}
	}
	for(let i = 0; i < invaderIndex.length; i++) {
		if (invaderRemoved.indexOf(i) !== - 1) continue;
		squares[invaderIndex[i]].classList.add('invader')
	}
}

drawInvader()

function removeInvader() {
	for(let i = 0; i < invaderIndex.length; i++) {
		squares[invaderIndex[i]].classList.remove('invader')
	}
	invaderIndex = []
}

function moveInvaders() {
	const isOnLeftWall = currentInvaderIndex % gridWidth === 0
	const isOnRightWall = (currentInvaderIndex + invaderDimensions.width - 1) % gridWidth === gridWidth - 1
	removeInvader()
	if (isOnLeftWall) console.log(isOnLeftWall, 'leftWall');
	if (isOnRightWall) console.log(isOnRightWall, 'rightwall');
	

	if ((isOnLeftWall && !goingRight) || (isOnRightWall && goingRight)) {
		//move the invaders down
		goingRight = !goingRight
		currentInvaderIndex += gridWidth
	} else if (goingRight) {
		currentInvaderIndex += 1
	} else {
		currentInvaderIndex -= 1	
	}

	if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersIntervalId)
  }

	if(currentInvaderIndex + (3 * gridWidth) > (squares.length)) {
		resultDisplay.innerHTML = 'GAME OVER'
		clearInterval(invadersIntervalId)
	}

  if (invaderRemoved.length === invaderDimensions.width * invaderDimensions.height) {
    resultDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersIntervalId)
  }

	drawInvader()
}

invadersIntervalId = setInterval(moveInvaders, 600)


squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
	squares[currentShooterIndex].classList.remove('shooter')
	switch (e.code) {
		case "ArrowLeft":
			if (currentShooterIndex % gridWidth !== 0) currentShooterIndex -= 1
			break;
		case "ArrowRight":
			if (currentShooterIndex % gridWidth !== gridWidth -1) currentShooterIndex += 1
			break;
	
		default:
			break;
	}
	squares[currentShooterIndex].classList.add('shooter')
}

function shoot(e) {
	let laserId
	let currentLaserIndex = currentShooterIndex
	// console.log(currentLaserIndex, 'curlas')
	function moveLaser() {
		squares[currentLaserIndex].classList.remove('laser')
		currentLaserIndex -= gridWidth
		if (!squares[currentLaserIndex]) {
			clearInterval(laserId)
			return null
		}
		squares[currentLaserIndex].classList.add('laser')

		if (squares[currentLaserIndex].classList.contains('invader')) {
			result += 1
			resultDisplay.innerHTML = result
			squares[currentLaserIndex].classList.remove('invader')
			squares[currentLaserIndex].classList.remove('laser')
			console.log(currentLaserIndex)
			squares[currentLaserIndex].classList.add('boom')
			clearInterval(laserId)
			setTimeout(() => {
				squares[currentLaserIndex].classList.remove('boom')	
			}, 300);

			// invaderRemoved.push(currentLaserIndex - currentInvaderIndex)
			invaderRemoved.push(invaderIndex.indexOf(currentLaserIndex))
		}
	} 
	switch (e.code) {
		case 'Space':
			laserId = setInterval(moveLaser, 100)
			break;
	
		default:
			break;
	}
}

document.addEventListener('keydown', moveShooter)
document.addEventListener('keydown', shoot)
