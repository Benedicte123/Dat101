"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList } from "./BrickBreaker.mjs";
import TBallPhysics from "./ballPhysics.mjs";
import { GameProps, EGameStatus } from "./BrickBreaker.mjs";

export class TBall extends libSprite.TSprite {
  #physics;
  constructor(aSpriteCanvas) {
    const pos = new lib2D.TPoint(370, 620);
    // Vi oppretter en ny ball sprite av typen sirkel
    super(aSpriteCanvas, SpriteInfoList.Ball, pos, lib2D.TCircle);
    this.#physics = new TBallPhysics(this, new lib2D.TPoint(1, -1), 2.1);
  }

  update() {
    if (GameProps.status === EGameStatus.idle) {
      if (!GameProps.hero || !GameProps.hero.pos || !GameProps.hero.shape) return;
      // Beregn midten av padelen
      const paddleMidX = GameProps.hero.pos.x + GameProps.hero.shape.width / 2;
      const paddleTopY = GameProps.hero.pos.y;
      // Plasser ballen i midten oppå padelen
      this.pos.x = paddleMidX - this.shape.radius;
      this.pos.y = paddleTopY - this.shape.radius * 2;
      return; // Ikke beveg ballen ennå
    }
    // Vanlig bevegelse
    this.#physics.update(GameProps.bounds, GameProps.hero, GameProps.bricks);
  }
}
