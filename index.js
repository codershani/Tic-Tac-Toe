const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

// initial variables
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Let's make a function to initialize the initial Game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize the css of boxes again
        box.classList = 'box';
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
} 

initGame();

// function to Swap turn of players
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else if (currentPlayer === "O") {
        currentPlayer = "X";
    }
    // UI Update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Game Over function
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // check each position must be non-empty and should have same value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]]))) {
                
            // check who is the winner X/O
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            // If we found a winner stop playing
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
    
            // Now we know X/O is a winner so update the UI with Winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    
    });

    // Now we got a winner
    if (answer != "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
    }
    
    // we know NO winner found, Let's check whether there is a tie
    let filCount = 0;
    gameGrid.forEach((box) => {
        if (box != "") {
            filCount++;
        }
    })
    if (filCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add('active');
    }
}

// Function to handle Clicks of players
function handleClick (index) {
    // console.log(index);
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap turn of players
        swapTurn();
        // check game is overed or not
        checkGameOver();
    }
}

// Event Listener to handle the boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});


newGameBtn.addEventListener("click", initGame);