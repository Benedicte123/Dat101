"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { THero } from "./hero.mjs";
import { TBall } from "./ball.mjs";
import { TMenu } from "./menu.mjs";
import { TBrick } from "./bricks.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Background:         { x: 1392, y:    0, width: 1187, height: 771, count:  1 },
  BrickPurple:        { x:    0, y:  717, width:  140, height:  41, count:  3 },
  BrickRed:           { x:    0, y:  778, width:  140, height:  41, count:  3 },
  BrickYellow:        { x:    0, y:  843, width:  140, height:  41, count:  3 },
  BrickBlue:          { x:    0, y:  906, width:  140, height:  41, count:  3 },
  Buttons:            { x:    0, y:  146, width:   55, height:  55, count:  4 },
  StartBtn:           { x:    0, y:   76, width:  186, height:  56, count:  5 },
  PaddleSmall:        { x:    0, y:  285, width:  158, height:  17, count:  1 },
  PaddleLarge:        { x:  159, y:  285, width:  226, height:  17, count:  1 },
  Ball:               { x:   79, y:  220, width:   30, height:  30, count:  1 },
  NumberSmall:        { x:    0, y: 1329, width:   23, height:  29, count: 10 },
  NumberLarge:        { x:    0, y: 1373, width:   50, height:  60, count: 10 },
  Menu:               { x: 1572, y:  780, width:  830, height: 671, count:  1 },
  NoOfCrushedBricks:  { x:    0, y:  217, width:   35, height:  34, count:  1 },
  
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let hndUpdateGame = null;

export const EGameStatus = { idle: 0, playing: 1, pause: 2, gameOver: 3 };

export const GameProps = {
  status: EGameStatus.idle, //For testing, normally EGameStatus.idle
  bounds : new lib2D.TRectangle({x: 26, y: 110}, SpriteInfoList.Background.width - 52, SpriteInfoList.Background.height - 195),
  background: new libSprite.TSprite(spcvs, SpriteInfoList.Background),
  hero: null,
  ball: null,
  status: EGameStatus.idle,
  menu: null,
  bricks: [
    new TBrick(spcvs, SpriteInfoList.BrickPurple, new lib2D.TPoint(75, 150)),
    new TBrick(spcvs, SpriteInfoList.BrickRed, new lib2D.TPoint(375, 150)),
    new TBrick(spcvs, SpriteInfoList.BrickYellow, new lib2D.TPoint(700, 150)),
    new TBrick(spcvs, SpriteInfoList.BrickBlue, new lib2D.TPoint(950, 150))],

  }

//--------------------------------------------------------------------------------------------------------------------
//------ Functions  
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  console.log("Game ready to load");
  cvs.width = SpriteInfoList.Background.width;
  cvs.height = SpriteInfoList.Background.height;
  spcvs.updateBoundsRect(); // The size of the canvas has changed, update the bounds rect.

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}

function windowResize() {
  spcvs.updateBoundsRect();
}

function newGame() {
  // Create dynamic game properties here:
  
  GameProps.hero = new THero(spcvs);
  GameProps.ball = new TBall(spcvs);
  GameProps.menu = new TMenu(spcvs);
  if(hndUpdateGame !== null) {
    clearInterval(hndUpdateGame);
  }
  hndUpdateGame = setInterval(updateGame, 1);
}

function drawBounds() {
  const ctx = spcvs.context; 
  const oldStrokeStyle = ctx.strokeStyle;
  const oldLineWidth = ctx.lineWidth;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.strokeRect(GameProps.bounds.x, GameProps.bounds.y, GameProps.bounds.width, GameProps.bounds.height);
  ctx.strokeStyle = oldStrokeStyle;
  ctx.lineWidth = oldLineWidth;
}

function drawGame() {
  spcvs.clearCanvas();
  GameProps.background.draw(0, 0);
  drawBounds();
  GameProps.hero.draw();
  for (let i = 0; i < GameProps.bricks.length; i++) {
    const bricks = GameProps.bricks[i].draw();
  }
  GameProps.ball.draw(); 
  //drawBricks();
  GameProps.menu.draw();
  requestAnimationFrame(drawGame);
}

/*function drawBricks() {
  for (let i = 0; i < GameProps.bricks.length; i++) {
    const bricks = GameProps.bricks[i];
    bricks.draw();
  }
}
*/

function animateGame() {

}

export function startGame() {
//GameProps.status = EGameStatus.idle;
//We must reset the game properties here:
//GameProps.bricks = [];
  GameProps.EGameStatus = EGameStatus.playing;
  // Skjul meny
  GameProps.menu.hide();
  console.log("startGame() ble kalt!");
  requestAnimationFrame(drawGame); // <- start visning
}

export function pauseGame() {
  GameProps.EGameStatus = EGameStatus.paused;
  GameProps.menu.showPause(); // viser pauseknapper
  console.log("Spillet er satt på pause");
}
export function resumeGame() {
  GameProps.eGameStatus = eGameStatus.playing;
  GameProps.menu.hide(); // skjuler pausemeny
  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game properties here:
  GameProps.ball.update();
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------

window.addEventListener("resize", windowResize);
spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
