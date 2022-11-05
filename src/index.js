import "./css/styles.css";
import githubImage from "./images/github_logo.png";
import bombImage from "./images/bomb.png";
import splashImage from "./images/splash.png";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

// Create header element
const header = document.createElement("header");
header.classList.add("header");
header.textContent = "BATTLESHIP";
document.body.appendChild(header);

// Create game instructions div element
const instructionsDiv = document.createElement("div");
instructionsDiv.classList.add("instructions");
document.body.appendChild(instructionsDiv);

// Create instructions button container 1 for game buttons
const buttonContainer1 = document.createElement("div");
buttonContainer1.classList.add("button-container");
instructionsDiv.appendChild(buttonContainer1);

// Create new game button
const newGameButton = document.createElement("button");
newGameButton.classList.add("new-game-button");
newGameButton.textContent = "NEW GAME";
buttonContainer1.appendChild(newGameButton);
newGameButton.addEventListener("click", () => {
  if (confirm("Reset And Start A New Game?")) {
    game();
  }
});

// Create versus button
const versusButton = document.createElement("button");
versusButton.classList.add("versus-button");
buttonContainer1.appendChild(versusButton);

// Create start game button
const startGameButton = document.createElement("button");
startGameButton.classList.add("start-game-button");
startGameButton.textContent = "START";
buttonContainer1.appendChild(startGameButton);

// Create game instructions text div
const instructionsTextDiv = document.createElement("div");
instructionsTextDiv.classList.add("instructions-text");
instructionsDiv.appendChild(instructionsTextDiv);

// Create instructions button container 2 for ship placement buttons
const buttonContainer2 = document.createElement("div");
buttonContainer2.classList.add("button-container");
instructionsDiv.appendChild(buttonContainer2);

// Create rotate ship placement button
const rotateShipButton = document.createElement("button");
rotateShipButton.classList.add("rotate-ship-button");
rotateShipButton.textContent = "ROTATE SHIP";
buttonContainer2.appendChild(rotateShipButton);

// Create next player button
const nextPlayerButton = document.createElement("button");
nextPlayerButton.classList.add("next-player-button");
nextPlayerButton.textContent = "NEXT PLAYER";
buttonContainer2.appendChild(nextPlayerButton);

// Create main div element
const mainDiv = document.createElement("div");
mainDiv.classList.add("main");
document.body.appendChild(mainDiv);

// Create container 1 div element
const gridContainerDiv1 = document.createElement("div");
gridContainerDiv1.classList.add("container");
gridContainerDiv1.classList.add("container-1");
mainDiv.appendChild(gridContainerDiv1);

// Create player 1 title div element
const playerTitleDiv1 = document.createElement("div");
playerTitleDiv1.classList.add("player-text");
playerTitleDiv1.textContent = "PLAYER 1";
gridContainerDiv1.appendChild(playerTitleDiv1);

// Create grid 1 div element
const gridDiv1 = document.createElement("div");
gridDiv1.classList.add("grid");
gridDiv1.classList.add("grid-1");
gridContainerDiv1.appendChild(gridDiv1);

// Create player 1 title div element
const playerTextDiv1 = document.createElement("div");
playerTextDiv1.classList.add("player-text");
playerTextDiv1.textContent = "HUMAN";
gridContainerDiv1.appendChild(playerTextDiv1);

// Create container 2 div element
const gridContainerDiv2 = document.createElement("div");
gridContainerDiv2.classList.add("container");
gridContainerDiv2.classList.add("container-2");
mainDiv.appendChild(gridContainerDiv2);

// Create player 2 title div element
const playerTitleDiv2 = document.createElement("div");
playerTitleDiv2.classList.add("player-text");
playerTitleDiv2.textContent = "PLAYER 2";
gridContainerDiv2.appendChild(playerTitleDiv2);

// Create grid 2 div element
const gridDiv2 = document.createElement("div");
gridDiv2.classList.add("grid");
gridDiv2.classList.add("grid-2");
gridContainerDiv2.appendChild(gridDiv2);

// Create player 2 title div element
const playerTextDiv2 = document.createElement("div");
playerTextDiv2.classList.add("player-text");
playerTextDiv2.textContent = "COMPUTER";
gridContainerDiv2.appendChild(playerTextDiv2);

// Create footer element
const footer = document.createElement("footer");
footer.classList.add("footer");
document.body.appendChild(footer);

// Footer text element
const footerTextDiv = document.createElement("div");
footerTextDiv.textContent = "The Odin Project - joemattar";
footer.appendChild(footerTextDiv);

// Footer a element
const footerA = document.createElement("a");
footerA.href = "https://github.com/joemattar";
footerA.target = "_blank";
footer.appendChild(footerA);

// Footer img element
const footerImg = document.createElement("img");
footerImg.src = githubImage;
footerA.appendChild(footerImg);

// Create player 1 as human
const player1 = Player();
// Set player 1 name
player1.changeName("PLAYER 1");
// Declare player 2 as human
const player2 = Player();
// Set player 2 name
player2.changeName("PLAYER 2");
// Change player 2 type to ai
player2.changeType();

// Add event listener to versus button
versusButton.addEventListener("click", () => {
  if (player2.getType() === "ai") {
    versusButton.value = "human";
    versusButton.textContent = "P.v.P";
    playerTextDiv2.textContent = "HUMAN";
    player2.changeType();
  } else if (player2.getType() === "human") {
    versusButton.value = "ai";
    versusButton.textContent = "P.v.AI.";
    playerTextDiv2.textContent = "COMPUTER";
    player2.changeType();
  }
  console.log(
    "player 1 is:",
    player1.getType(),
    "player 2 is:",
    player2.getType()
  );
});

// Function to manage the game
function game() {
  // Create grid 1 square divs
  createGrid(gridDiv1);
  // Create grid 2 square divs
  createGrid(gridDiv2);

  // Create player 1's gameboard
  const gameboard1 = Gameboard();
  // Create player 2's gameboard
  const gameboard2 = Gameboard();

  // Declare game and play variables
  let currentPlayer = player1;
  let currentGameBoard = gameboard1;
  let nextGameBoard = gameboard2;
  let currentGridClass = "grid-1";
  let nextGridClass = "grid-2";
  let currentShipIndex = 0;
  let currentShip = currentGameBoard.ships[currentShipIndex];
  let currentGridDiv;
  let row;
  let column;
  let shipPlacementPhase = false;
  let shipPlacementInterphase = false;
  let shootingPhase = false;
  let shootingInterphase = false;

  // Initialize starting disabled state of buttons
  playerTextDiv2.textContent = "COMPUTER";
  versusButton.textContent = "P.v.AI.";
  versusButton.value = "ai";
  versusButton.disabled = false;
  startGameButton.disabled = false;
  rotateShipButton.disabled = true;
  nextPlayerButton.disabled = true;
  versusButton.classList.add("focus");
  startGameButton.classList.add("focus");

  instructionsTextDiv.classList.remove("game-over");
  instructionsDiv.classList.remove("game-over");

  // Add event listener to start game button
  startGameButton.addEventListener("click", () => {
    versusButton.disabled = true;
    startGameButton.disabled = true;
    rotateShipButton.disabled = false;
    shipPlacementPhase = true;
    instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR ${currentShip.type.toUpperCase()} - LENGTH ${
      currentShip.length
    }`;
    versusButton.classList.remove("focus");
    startGameButton.classList.remove("focus");
  });

  // Set instructions text initial text content
  instructionsTextDiv.textContent =
    "PLAYER 1 CHOOSE YOUR OPPONENT TYPE AI/HUMAN";

  // Add event listener to rotate ship button
  rotateShipButton.addEventListener("click", () => {
    currentShip.changeOrientation();
  });

  // Add event listener to next player button
  nextPlayerButton.addEventListener("click", () => {
    // Interphase after player 1 placed ships --> passing to player 2 for ship placement
    if (
      shipPlacementInterphase === true &&
      gameboard2.allShipsPlaced() === false
    ) {
      shipPlacementPhase = true;
      shipPlacementInterphase = false;
      rotateShipButton.disabled = false;
      nextPlayerButton.disabled = true;
      instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR ${currentShip.type.toUpperCase()} - LENGTH ${
        currentShip.length
      }`;
    }
    // Interphase after Player 2 placed ships --> passing back to player 1 for shooting phase
    if (
      shipPlacementInterphase === true &&
      gameboard2.allShipsPlaced() === true
    ) {
      shipPlacementInterphase = false;
      shootingPhase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = true;
      unhideShips("grid-1", gameboard1);
      instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR SHOT`;
    }
    // Interphase after a player made a shot
    if (shootingInterphase === true) {
      shootingInterphase = false;
      shootingPhase = true;
      nextPlayerButton.disabled = true;
      unhideShips(currentGridClass, currentGameBoard);
      // UNHIDE OPPONENT SUNK SHIPS
      unhideSunkShips(nextGridClass, nextGameBoard);
      instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR SHOT`;
    }
  });

  // Function to fill grid
  function createGrid(gridDiv) {
    gridDiv.textContent = "";
    for (let i = 10; i >= 1; i -= 1) {
      // Create row div
      const newGridRowDiv = document.createElement("div");
      newGridRowDiv.classList.add("grid-row");
      gridDiv.appendChild(newGridRowDiv);
      for (let j = 1; j <= 10; j += 1) {
        // Create square div
        const newGridSquareDiv = document.createElement("div");
        newGridSquareDiv.classList.add("square");
        newGridSquareDiv.dataset.row = i;
        newGridSquareDiv.dataset.column = j;
        newGridRowDiv.appendChild(newGridSquareDiv);
        // Add event listener on mouse enter to display the ship possible placement
        newGridSquareDiv.addEventListener("mouseenter", onMouseEnterSquareDiv);
        // Add event listener in mouse leave to remove all related classes
        newGridSquareDiv.addEventListener("mouseleave", onMouseLeaveSquareDiv);
        // Add event listener on mouse click over a square
        newGridSquareDiv.addEventListener("click", onMouseClickSquareDiv);
      }
    }
  }

  // Function to manage a mouse entering a square div
  function onMouseEnterSquareDiv(e) {
    // Triggers during Ship Placement phase
    if (shipPlacementPhase === true && currentPlayer.getType() === "human") {
      if (isWithinGridAndDoesNotOverlapEvent(e) === true) {
        for (let activeDiv of getShipSquareDivsOnEvent(e)) {
          activeDiv.classList.add("ship-hover-placeable");
        }
      } else if (isWithinGridAndDoesNotOverlapEvent(e) === false) {
        for (let activeDiv of getShipSquareDivsOnEvent(e)) {
          activeDiv.classList.add("ship-hover-not-placeable");
        }
      }
    }
    // Triggers during shooting phase
    if (
      shootingPhase === true &&
      currentPlayer.getType() === "human" &&
      isWithinOpponentGrid(e) === true
    ) {
      e.target.classList.add("ship-hover-shooting");
    }
  }

  // Function to manage a mouse leaving a square div
  function onMouseLeaveSquareDiv(e) {
    // Triggers during all phases
    for (let activeDiv of getShipSquareDivsOnEvent(e)) {
      activeDiv.classList.remove("ship-hover-not-placeable");
      activeDiv.classList.remove("ship-hover-placeable");
      e.target.classList.remove("ship-hover-shooting");
    }
  }

  // Function to manage a mouse clicking a square div
  function onMouseClickSquareDiv(e) {
    // Triggers during ship placement phase
    if (
      shipPlacementPhase === true &&
      currentPlayer.getType() === "human" &&
      isWithinGridAndDoesNotOverlapEvent(e) === true
    ) {
      if (currentGameBoard.allShipsPlaced() === false) {
        row = getGridSquareDivRow(e.target);
        column = getGridSquareDivColumn(e.target);
        // Ship placement Backend
        placeShipsBackend(row, column);
        // Ship placement front end
        for (let activeDiv of getShipSquareDivsOnEvent(e)) {
          activeDiv.classList.add("ship-placed");
          activeDiv.classList.remove("ship-hover-not-placeable");
          activeDiv.classList.remove("ship-hover-placeable");
          e.target.classList.remove("ship-hover-shooting");
        }
        // If player placement not complete, increment ship index
        if (currentGameBoard.allShipsPlaced() === false) {
          currentShipIndex += 1;
          currentShip = currentGameBoard.ships[currentShipIndex];
          instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR ${currentShip.type.toUpperCase()} - LENGTH ${
            currentShip.length
          }`;
        } else if (currentGameBoard.allShipsPlaced() === true) {
          switchCurrentPlayer();
          // If player 1 ships placed, trigger ship placement interphase
          checkThenTriggerShipPlacementInterphase();
          if (currentPlayer.getType() === "ai") {
            // AI ship placement
            instructionsTextDiv.textContent = "AI SHIP PLACEMENT";
            placeShipsRandomly();
            hideShips(currentGridClass, currentGameBoard);
            switchCurrentPlayer();
          }
        }
      }
    }

    // If all ships placed, trigger shooting phase
    checkThenTriggerShootingPhase();

    // Triggers during shooting phase
    if (
      shootingPhase === true &&
      currentPlayer.getType() === "human" &&
      isWithinOpponentGrid(e) === true
    ) {
      // Shooting phase code
      if (shootEvent(e) === true) {
        unhideSunkShips(nextGridClass, nextGameBoard);
        switchCurrentPlayer();
        // If in shooting phase, triggers if player 2 is human after player 1 shoots
        checkThenTriggerShootingInterphase();
        if (currentPlayer.getType() === "ai") {
          while (shootAi() === false) {
            continue;
          }
          switchCurrentPlayer();
        }
      }
    }

    // If any gameboard has all ship sunk, trigger end game
    checkThenTriggerEndgame();
  }

  // Function to fetch a grid square div row
  function getGridSquareDivRow(squareDiv) {
    return Number(squareDiv.dataset.row);
  }

  // Function to fetch a grid square div column
  function getGridSquareDivColumn(squareDiv) {
    return Number(squareDiv.dataset.column);
  }

  // Function to select the ship square divs from an event
  function getShipSquareDivsOnEvent(e) {
    row = getGridSquareDivRow(e.target);
    column = getGridSquareDivColumn(e.target);
    const shipSquareDivs = getShipSquareDivs(row, column);
    return shipSquareDivs;
  }

  // Function to select the ship square divs given row and column
  function getShipSquareDivs(row, column) {
    const shipSquareDivs = [];
    if (currentShip.getOrientation() === "horizontal") {
      for (
        let i = column;
        i <= Math.min(10, column + currentShip.length - 1);
        i += 1
      ) {
        shipSquareDivs.push(
          document.querySelector(
            `.${currentGridClass} [data-row="${row}"][data-column="${i}"]`
          )
        );
      }
    } else if (currentShip.getOrientation() === "vertical") {
      for (
        let i = row;
        i >= Math.max(1, row - currentShip.length + 1);
        i -= 1
      ) {
        shipSquareDivs.push(
          document.querySelector(
            `.${currentGridClass} [data-row="${i}"][data-column="${column}"]`
          )
        );
      }
    }
    return shipSquareDivs;
  }

  // Function that returns true when a ship is within grid and doesnt overlap from event
  function isWithinGridAndDoesNotOverlapEvent(e) {
    currentGridDiv = e.target.parentNode.parentNode;
    row = getGridSquareDivRow(e.target);
    column = getGridSquareDivColumn(e.target);
    if (
      shipPlacementPhase === true &&
      currentGridDiv.classList.contains(currentGridClass) === true &&
      currentPlayer.getType() === "human"
    ) {
      if (isWithinGridAndDoesNoOverlap(row, column) === true) {
        return true;
      } else {
        return false;
      }
    }
    return null;
  }

  // Function that returns true when a ship is within grid and doesnt overlap given row and column
  function isWithinGridAndDoesNoOverlap(row, column) {
    if (
      currentGameBoard.isWithinGrid(
        row,
        column,
        currentShip.length,
        currentShip.getOrientation()
      ) === true &&
      currentGameBoard.doesNotOverlap(
        row,
        column,
        currentShip.length,
        currentShip.getOrientation()
      ) === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Function that randomly places one set of ships
  function placeShipsRandomly() {
    while (currentGameBoard.allShipsPlaced() === false) {
      row = Math.floor(Math.random() * 10) + 1;
      column = Math.floor(Math.random() * 10) + 1;
      let x = Math.floor(Math.random() * 2) + 1;
      if (x % 2 === 0) {
        currentShip.changeOrientation();
      }
      if (isWithinGridAndDoesNoOverlap(row, column)) {
        // Ship placement Backend
        placeShipsBackend(row, column);
        // Ship placement front end
        for (let activeDiv of getShipSquareDivs(row, column)) {
          activeDiv.classList.add("ship-placed");
        }
        currentShipIndex += 1;
        currentShip = currentGameBoard.ships[currentShipIndex];
      }
    }
  }

  // Function that updates ship placement in the Ship factory and the Gameboard grid Square factory
  function placeShipsBackend(row, column) {
    // Update corresponding gameboard grid object squares
    currentGameBoard.placeShip(
      row,
      column,
      currentShip.length,
      currentShip.getOrientation(),
      currentShip.type
    );
    // Update corresponding ship object place variable
    currentShip.place();
  }

  // Function to check and trigger ship placement interphase (skipsinterphase if player 2 is ai)
  function checkThenTriggerShipPlacementInterphase() {
    // When player 1 places last ship --> triggers ship placement interphase
    if (
      gameboard1.allShipsPlaced() === true &&
      gameboard2.allShipsPlaced() === false &&
      currentShipIndex === 0 &&
      shipPlacementPhase === true &&
      player2.getType() === "human"
    ) {
      shipPlacementPhase = false;
      shipPlacementInterphase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-1", gameboard1);
      instructionsTextDiv.textContent = `PASS COMPUTER TO ${currentPlayer.getName()}`;
    }
    // When player 2 places last ship --> triggers ship placement interphase
    if (
      gameboard1.allShipsPlaced() === true &&
      gameboard2.allShipsPlaced() === true &&
      shipPlacementPhase === true &&
      player2.getType() === "human"
    ) {
      shipPlacementPhase = false;
      shipPlacementInterphase = true;
      rotateShipButton.disabled = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-2", gameboard2);
      instructionsTextDiv.textContent = `PASS COMPUTER TO ${currentPlayer.getName()}`;
    }
  }

  // Function to hide a grid's unsunk ship segments given grid class (ie "grid-1")
  function hideShips(gridClass, gameboard) {
    for (let shipLocation of gameboard.shipsLocation) {
      let i = shipLocation[0];
      let j = shipLocation[1];
      const selectedSquareDiv = document.querySelector(
        `.${gridClass} [data-row="${i}"][data-column="${j}"]`
      );
      selectedSquareDiv.classList.remove("ship-placed");
    }
  }

  // Function to unhide a grid's ship segments given grid class (ie "grid-1")
  function unhideShips(gridClass, gameboard) {
    for (let shipLocation of gameboard.shipsLocation) {
      let i = shipLocation[0];
      let j = shipLocation[1];
      const selectedSquareDiv = document.querySelector(
        `.${gridClass} [data-row="${i}"][data-column="${j}"]`
      );
      selectedSquareDiv.classList.add("ship-placed");
    }
  }

  // Function to unhide a grid's ship segments given grid class (ie "grid-1")
  function unhideSunkShips(gridClass, gameboard) {
    for (let shipLocation of gameboard.shipsLocation) {
      let row = shipLocation[0];
      let column = shipLocation[1];
      const selectedSquareDiv = document.querySelector(
        `.${gridClass} [data-row="${row}"][data-column="${column}"]`
      );
      const selectedShipType =
        gameboard.grid[`square-${row}-${column}`].getShipSegmentType();
      for (let ship of gameboard.ships) {
        if (ship.type === selectedShipType && ship.isSunk() === true) {
          selectedSquareDiv.classList.add("ship-placed");
        }
      }
    }
  }

  // Function to switch player current status
  function switchCurrentPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentGameBoard = gameboard2;
      nextGameBoard = gameboard1;
      currentGridClass = "grid-2";
      nextGridClass = "grid-1";
    } else {
      currentPlayer = player1;
      currentGameBoard = gameboard1;
      nextGameBoard = gameboard2;
      currentGridClass = "grid-1";
      nextGridClass = "grid-2";
    }
    // Logic during ship placement phase
    if (shipPlacementPhase === true) {
      currentShipIndex = 0;
      currentShip = currentGameBoard.ships[currentShipIndex];
      instructionsTextDiv.textContent = `${currentPlayer.getName()} PLACE YOUR ${currentShip.type.toUpperCase()} - LENGTH ${
        currentShip.length
      }`;
    }
  }

  // Function to check and trigger shooting phase
  function checkThenTriggerShootingPhase() {
    if (
      gameboard1.allShipsPlaced() === true &&
      gameboard2.allShipsPlaced() === true &&
      shipPlacementPhase === true &&
      player2.getType() === "ai"
    ) {
      shipPlacementPhase = false;
      rotateShipButton.disabled = true;
      shootingPhase = true;
      instructionsTextDiv.textContent = "SHOOTING PHASE - PLACE YOUR SHOT";
    }
  }

  // Function to check and trigger shooting interphase
  function checkThenTriggerShootingInterphase() {
    if (shootingPhase === true && player2.getType() === "human") {
      shootingPhase = false;
      shootingInterphase = true;
      nextPlayerButton.disabled = false;
      hideShips("grid-1", gameboard1);
      unhideSunkShips("grid-1", gameboard1);
      hideShips("grid-2", gameboard2);
      unhideSunkShips("grid-2", gameboard2);
      instructionsTextDiv.textContent = `PASS COMPUTER TO ${currentPlayer.getName()}`;
    }
  }

  // Function to return true if mouse is over the opponent grid
  function isWithinOpponentGrid(e) {
    if (currentPlayer.getType() === "human") {
      if (
        e.target.parentNode.parentNode.classList.contains(nextGridClass) ===
        true
      ) {
        return true;
      }
      return false;
    }
  }

  // Function to manage shooting logic from event
  function shootEvent(e) {
    if (e.target.classList.contains("square") === true) {
      row = getGridSquareDivRow(e.target);
      column = getGridSquareDivColumn(e.target);
      return shoot(row, column);
    }
    return false;
  }

  // Function to manage AI shooting algorithm
  function shootAi() {
    let [row, column] = nextGameBoard.huntTarget();
    return shoot(row, column);
  }

  // Function to manage shooting logic given row and column
  function shoot(row, column) {
    // Find the target square div and append to it an img element
    const targetSquareDiv = document.querySelector(
      `.${nextGridClass} [data-row="${row}"][data-column="${column}"]`
    );
    const targetImg = document.createElement("img");
    targetSquareDiv.appendChild(targetImg);
    // If grid square is not shot yet
    if (nextGameBoard.grid[`square-${row}-${column}`].isShot() === false) {
      if (
        // if grid square contains a ship segment
        nextGameBoard.grid[`square-${row}-${column}`].containsShipSegment() ===
        true
      ) {
        // Place shot on gameboard grid square
        nextGameBoard.grid[`square-${row}-${column}`].placeShot();
        // Assign BOMB PICTURE TO target img
        targetImg.src = bombImage;
        // Mark corresponding gameboard ship as hit
        let targetShipType =
          nextGameBoard.grid[`square-${row}-${column}`].getShipSegmentType();
        for (let ship of nextGameBoard.ships) {
          if (ship.type === targetShipType) {
            ship.hit();
          }
        }
      } else if (
        // if grid square does not contain ship segment
        nextGameBoard.grid[`square-${row}-${column}`].containsShipSegment() ===
        false
      ) {
        // Place shot on gameboard grid square
        nextGameBoard.grid[`square-${row}-${column}`].placeShot();
        // Assign WATER SPLASH PICTURE TO target img
        targetImg.src = splashImage;
      }
      // After the shot is made return true
      return true;
    }
    // If the shot cannot be made return false
    return false;
  }

  // Function to check and trigger endgame
  function checkThenTriggerEndgame() {
    if (
      gameboard1.allShipsSunk() === true ||
      gameboard2.allShipsSunk() === true
    ) {
      shootingPhase = false;
      shootingInterphase = false;
      instructionsTextDiv.classList.add("game-over");
      instructionsDiv.classList.add("game-over");
      unhideShips(currentGridClass, currentGameBoard);
      unhideShips(nextGridClass, nextGameBoard);
      if (gameboard1.allShipsSunk() === true) {
        instructionsTextDiv.textContent = "GAME OVER! THE WINNER IS PLAYER 2";
      }
      if (gameboard2.allShipsSunk() === true) {
        instructionsTextDiv.textContent = "GAME OVER! THE WINNER IS PLAYER 1";
      }
    }
  }
}

game();
