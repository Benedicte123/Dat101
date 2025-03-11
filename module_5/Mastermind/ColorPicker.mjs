"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { GameProps } from "./Mastermind.mjs";


const ColorPickerPositions = MastermindBoard.ColorPicker;

export class TColorPicker extends libSprite.TSpriteDraggable {
    #spcvs;
    #spi;
    #color;
    #snapPos;
    #snapIndex;
    #startPos;
    constructor(spcvs, spriteInfo, color, index){
      super(spcvs, spriteInfo,ColorPickerPositions[color]);
      this.index = index;
      this.snapTo = GameProps.snapTo;
      this.#spcvs = spcvs;
      this.#spi = spriteInfo;
      this.#color = color;
      this.#snapPos = null;
      this.#snapIndex = -1;
      this.#startPos = false;
    }
  
    onCanDrop(){
      return false;
    }
  
    clone(){
      return new TColorPicker(
        this.#spcvs,
        this.#spi,
        this.#color,
        this.index
      )
    }
  
    onDrop(aDropPosition){
        GameProps.ColorPickers.push(this.clone());
        this.#snapIndex = GameProps.snapTo.positions.indexOf(aDropPosition);
        this.#snapPos= new lib2d.TPoint();
        this.#snapPos.x = GameProps.snapTo.positions[this.#snapIndex].x;
        this.#snapPos.y = GameProps.snapTo.positions[this.#snapIndex].y;
        GameProps.snapTo.positions[this.#snapIndex] = null;
        this.#startPos = true;
        GameProps.PlayerAnswers[this.#snapIndex] = this;
        console.log ("drop color on snap index", this.#snapIndex);
    }

  onMouseDown () {
    super.onMouseDown();
    //få denne knappen til å være i det øverste laget.
    const index = GameProps.ColorPickers.indexOf(this);
    GameProps.ColorPickers.splice(index, 1);
    GameProps.ColorPickers.push(this);
    // Splice for å fjerne et element fra array,
    // Push for å legge til et element i array,
    // Slice for å kopiere et element fra array.
    if (this.#snapPos !== null) {
      GameProps.snapTo.positions[this.#snapIndex] = this.#snapPos;
      this.#snapPos = null;
      GameProps.PlayerAnswers[this.#snapIndex] = null;
    }
  }

  onCancelDrop(){
    const index = GameProps.ColorPickers.indexOf(this);
    //GameProps.ColorPickers.push(this.clone()); 
    if (this.#startPos){
      const index = GameProps.ColorPickers.indexOf(this);
      GameProps.ColorPickers.splice(index, 1);
      this.spcvs.removeSpriteButton (this);
    }
  }
}