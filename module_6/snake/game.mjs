"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import { TMenu } from "./menu.mjs";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier;
let hndUpdateGame = null;
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 }, 
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const GameProps = {
  gameBoard: null,
  gameStatus: EGameStatus.Idle,
  snake: null,
  bait: null,
  menu: null,
  totalScore: 0,
  baitSpawnTime: null,
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  if (hndUpdateGame) clearInterval(hndUpdateGame); // Clear the previous game interval
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 4; // Reset game speed
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  GameProps.totalScore = 0; // Reset total score
  GameProps.menu.updateTotalScore(0); // Update the score on the menu 
}

export function baitIsEaten() {
  console.log("Bait eaten!");
  // Increase game speed
 // REAKSJONSTID SCORE?
  const timeUsed = Date.now() - GameProps.baitSpawnTime; // Calculate the time used to eat the bait
  const timeUsedInSec = Math.floor(timeUsed / 1000); // Convert to seconds
  const score = Math.max (0,10 - timeUsedInSec); // Calculate the score based on time used
  GameProps.menu.updateTotalScore(score); // Update the score on the menu

// Calculate the bonus score based on time used
  const bonus = GameProps.menu.addRemainingSeconds();
  GameProps.totalScore += bonus;
  GameProps.menu.updateTotalScore(GameProps.totalScore); // Update the score on the menu
  
  GameProps.snake.addSnakePart(); // Add a new part to the snake
  GameProps.bait.update(); // Move the bait to a new position
  increaseGameSpeed();
}


//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

 GameProps.gameStatus = EGameStatus.Idle; // change game status to Idle

  /* Create the game menu here */ 
  GameProps.menu = new TMenu(spcvs);
  GameProps.menu.setPlayTrigger(() => {
    newGame(); // Starter nytt spill
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
  })// Knappen skal starte spillet
  GameProps.menu.setHomeTrigger(() => {
    GameProps.gameBoard = null; // Clear the game board
    GameProps.snake = null; // Fjerne Slange
    GameProps.bait = null; // Fjerne eple
    GameProps.gameStatus = EGameStatus.Idle; // Sett spillstatus til Idle
  });
  GameProps.menu.setRestartTrigger(() => {
    newGame(); //Starter nytt spill
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
  });
  GameProps.menu.setResumeTrigger(() => {
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Restart the game update interval
  });
  
requestAnimationFrame(drawGame); // Start the game loop
hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
console.log("Game canvas is rendering!");
console.log("Game canvas is updating!");
  //newGame(); // Call this function from the menu to start a new game, remove this line when the menu is ready
}

function drawGame() {
  // Clear the canvas
  spcvs.clearCanvas();
  switch (GameProps.gameStatus) {
    case EGameStatus.Idle:
      GameProps.menu.draw();
      break;
    case EGameStatus.Playing:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.Pause:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.GameOver:
      GameProps.menu.draw();
  }
  
  requestAnimationFrame(drawGame);
}
  

function updateGame() {
  // Update game logic here
  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
      if (!GameProps.snake.update()) {
        GameProps.gameStatus = EGameStatus.GameOver;
        console.log("Game over!");
      }
      break;
  }
}

function increaseGameSpeed() {
  /* Increase game speed logic here */
  gameSpeed += 0.5;
  clearInterval(hndUpdateGame); // Clear the previous game interval
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
    console.log("Increase game speed!");
 }


//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
      console.log("Space key pressed!");
      /* Pause the game logic here */
      if (GameProps.gameStatus === EGameStatus.Playing) {
        GameProps.gameStatus = EGameStatus.Pause;
        clearInterval(hndUpdateGame); // Stop the game update interval
        console.log("Game paused!");
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        GameProps.gameStatus = EGameStatus.Playing;
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Restart the game update interval
        console.log("Game resumed!");
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);




