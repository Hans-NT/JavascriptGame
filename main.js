/*
    Name: Hansaint Noto
    Student ID: 922380300
    Github ID: Hans-NT
*/
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const timeEl = document.querySelector('.time span')
const restartButton = document.getElementById("restart")
const startButton = document.getElementById("start")

let score = 0
let time = 15 // set initial time to 15 seconds
let gameRunning = true // track if game is still running


//Declaring and making the background music in the game.
const backgroundMusic = new Audio('music.mp3');
backgroundMusic.volume = 0.2
const sound = new Audio("assets/smash.mp3")


/*
  The game begins
*/
function run() {
  if (!gameRunning) return // stop running if game is over
  restartButton.style.display = 'none';

  //Will start the music the moment the player begins.
  backgroundMusic.loop = true;
  backgroundMusic.play();

  const i = Math.floor(Math.random() * holes.length)
  const hole = holes[i]
  let timer = null

  const img = document.createElement('img')
  img.classList.add('mole')
  img.src = 'assets/mole.png'
  //This is an event that when the mole is clicked, it makes the mole hit sound
  img.addEventListener('click', () => {
    score += 10
    sound.play()
    scoreEl.textContent = score
    img.src = 'assets/mole-whacked.png'
    clearTimeout(timer)
    setTimeout(() => {
      hole.removeChild(img)
      run()
    }, 200) //The animation for when the mole gets hit 
  })

  hole.appendChild(img)
  //Removes the mole after a certain amount of time
  timer = setTimeout(() => {
    hole.removeChild(img)
    run()
  }, 1000) //How long the mole stays in place 4000 = 4 seconds
}

// Countdown timer function
function countdown() {
  if (!gameRunning) return // stop counting down if game is over
  time -= 1 // decrement time by 1
  timeEl.textContent = time // update time display

  if (time <= 0) {
    time = 0 // set time to 0 when time is up
    timeEl.textContent = time // update time display
    gameRunning = false // set game to over
    alert('GAME OVER! Your final score is ' + score + '!') // show game over message
    restartButton.style.display = 'block'; // Displays restart button after the game ends
    holes.forEach((hole) => {  // Remove all moles from board
      while (hole.firstChild) {
        hole.removeChild(hole.firstChild);
      }
    });
  }
  setTimeout(countdown, 1000) // This is the countdown timer speed
}

// start the game and countdown timer
startButton.addEventListener("click", () => {
  run()
  startButton.style.display = 'none';
  countdown()
});

//Restart Button
// Add event listener to restart button
restartButton.addEventListener("click", () => {
  // Reset score and time
  score = 0
  time = 15 // set initial time to 15 seconds
  gameRunning = true // track if game is still running
  restartButton.style.display = 'none';
  
  // Update score display
  scoreEl.textContent = score;

  //Start the game again
  run();
  countdown();
});

/*
  This set of code allows the hammer icon to follow the mouse cursor with it's x & y positions
*/
window.addEventListener('mousemove', e => {
  cursor.style.top = e.pageY + 'px'
  cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
  cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
  cursor.classList.remove('active')
})