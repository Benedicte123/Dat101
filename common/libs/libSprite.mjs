"use strict";

class TSpriteCanvas {
    #cvs;
    #ctx;
    #img; 

    constructor(cvs, aCanvas){
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image (); 
    }
    
 loadSpriteSheet (aFileName, aLoadedFinal) {
    this.#img.onLoad = aLoadedFinal;
    this.#img.src = aFileName;
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