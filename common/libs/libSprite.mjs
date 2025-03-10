"use strict";

class TSpriteCanvas {
    #cvs;
    #ctx;
    #img; 

    constructor(aCanvas){
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image (); 
    }
    
 loadSpriteSheet (aFileName, aLoadedFinal) {
    this.#img.onload = aLoadedFinal;
    this.#img.src = aFileName;
 }   

 drawSprite (aSpriteInfo, aDx = 0, aDy = 0, aIndex = 0) {
    let index = aIndex;
    const sx = aSpriteInfo.x +(aSpriteInfo.width*index);
    const sy = aSpriteInfo.y;
    const sw = aSpriteInfo.width;
    const sh = aSpriteInfo.height;
    const dx = aDx;
    const dy = aDy;
    const dw = sw;
    const dh = sh;
    this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);
 }
 
 clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
 }
}

export default {
    /**
     * @class TSpriteCanvas
     * @description A class that manage sprite canvas for loading sprite sheets.
     * @param (HTML CanvasElement) aCanvas - The canvas element to use
     * @function loadSpriteSheet - Loads a sprite sheet image.
     * @param (string) aFileName - The file name og the sprite sheet image
     * @param (function) aLoadedFinal - A callback function to call when the image is done loading.
     */
    TSpriteCanvas: TSpriteCanvas
}