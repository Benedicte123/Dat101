"use strict"

import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";

export class TBrick extends libSprite.TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aPos, aBrick) {
    super(aSpriteCanvas, aSpriteInfo, aPos);

    this.count = 3;          // Starter med 3 "liv"
    this.frame = 0;          // Første frame (full brick)
    this.row = 0;            // Sett dette basert på farge (her: rad 0 = lilla, f.eks.)
  }

  draw(){
    super.draw();
  }


  updateSprite() {
    // Antar at "row" er satt for hver brick basert på farge (f.eks. 0 for lilla, 1 for rød, osv.)
    // og at spritesheetet har 3 bilder per brick-type
    this.index = (this.row * 3) + (3 - this.count);
  }
} 

 /* updateSprite() {
    if (this.count === 2) {
      this.index = 1;
    } else if (this.count === 1) {
      this.index = 2;
    }
  }
}
  */