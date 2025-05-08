"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import {TColorPicker} from "./ColorPicker.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { TMenu } from "./menu.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Board:              { x: 320, y:   0, width: 441, height: 640, count: 1 },
  ButtonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 2 },
  ButtonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 2 },
  ButtonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 2 },
  PanelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  ColorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  ColorHint:          { x:   0, y: 250, width:  19, height:  18, count: 3 },
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

//Add all you game objects here
export const GameProps = {
  Board: null,
  snapTo: {
    positions: MastermindBoard.ColorAnswer.Row1,
    distance: 20
  }, 
  ColorPickers: null,
  ComputerAnswers: [],
  RoundIndicator: null,
  Menu: null,
  PlayerAnswers: [null, null, null, null],
  AnswerHintRow: MastermindBoard.AnswerHint.Row1,
}

GameProps.ColorPickers= [
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Black", 0),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Blue", 1), 
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Brown", 2),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Green", 3),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Orange", 4),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Red", 5),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "White", 6),
  new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Yellow", 7),
]

//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

export function newGame() {
// vi må fjerne alle farger fra colorPickers, her ligger også playerAnswers
for (let i = 0; i < GameProps.ColorPickers.length; i++) {
  const colorPicker = GameProps.ColorPickers[i];
  spcvs.removeSpriteButton(colorPicker);
  }
  // Tilbakestill tilstand
  GameProps.ComputerAnswers = [];
  GameProps.PlayerAnswers = [null, null, null, null];
  GameProps.snapTo.positions = MastermindBoard.ColorAnswer.Row1.map(p => ({ x: p.x, y: p.y }));
  GameProps.AnswerHintRow = MastermindBoard.AnswerHint.Row1;
  

  // Flytt rundeindikator til start
  moveRoundIndicator();

  // Fjern tidligere hint
  GameProps.Menu.resetHints();
  GameProps.Menu.resetRoundNumber();
  GameProps.ColorPickers= [
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Black", 0),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Blue", 1), 
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Brown", 2),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Green", 3),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Orange", 4),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Red", 5),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "White", 6),
    new TColorPicker(spcvs, SpriteInfoList.ColorPicker, "Yellow", 7),
  ]
    for (let i = 0; i < GameProps.ColorPickers.length; i++) {
    const colorPicker = GameProps.ColorPickers[i];
    colorPicker.draw();
    }
    //GameProps.snapTo.positions = MastermindBoard.ColorAnswer.Row1;
    // VAR EGT FORLØKKA, men det er ikke noe som heter det
  generateComputerAnswer();
}

function drawGame(){
  spcvs.clearCanvas();
  //Draw all game objects here, remember to think about the draw order (layers in PhotoShop for example!)
  GameProps.Board.draw();
  GameProps.RoundIndicator.draw();

  for (let i = 0; i < GameProps.ComputerAnswers.length; i++) {
    const computerAnswer = GameProps.ComputerAnswers[i];
    computerAnswer.draw();
    }

  GameProps.Menu.draw();

  for (let i = 0; i < GameProps.ColorPickers.length; i++) {
    const colorPicker = GameProps.ColorPickers[i];
    colorPicker.draw();
    }

  requestAnimationFrame(drawGame);
}

function generateComputerAnswer(){
  for (let i = 0; i < 4; i++) {
    const colorIndex = Math.floor(Math.random() * SpriteInfoList.ColorPicker.count);
    const pos = MastermindBoard.ComputerAnswer[i];
    const sprite = new libSprite.TSprite(spcvs, SpriteInfoList.ColorPicker, pos);
    sprite.index = colorIndex;
    GameProps.ComputerAnswers.push(sprite);
  }
  
}

 export function moveRoundIndicator(){
  const pos = GameProps.snapTo.positions[0];
  GameProps.RoundIndicator.x = pos.x - 84;
  GameProps.RoundIndicator.y = pos.y + 7;
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Board.width;
  cvs.height = SpriteInfoList.Board.height;
  spcvs.updateBoundsRect();
  let pos = new lib2D.TPoint(0, 0);
  GameProps.Board = new libSprite.TSprite(spcvs, SpriteInfoList.Board, new lib2D.TPoint(0, 0));
  pos = GameProps.snapTo.positions[0];
  GameProps.RoundIndicator = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, pos);
  GameProps.RoundIndicator.index = 2;
 
  moveRoundIndicator();
 
  GameProps.Menu = new TMenu(spcvs);

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}


//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------


spcvs.loadSpriteSheet("./Media/SpriteSheet.png", loadGame);
window.addEventListener("resize", spcvs.updateBoundsRect.bind(spcvs));