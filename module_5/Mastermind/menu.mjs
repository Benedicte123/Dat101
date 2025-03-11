"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { GameProps, SpriteInfoList, moveRoundIndicator, newGame} from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";



export class TMenu {
  #ButtonNewGame;
  #buttonCheckAnswer;
  #buttonCheat;
  #panelHideAnswer;
  #colorHints;
  #spcvs;
  #roundNumber;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    this.#roundNumber = 1;
    this.#ButtonNewGame = 
        new libSprite.TSpriteButton(
            aSpriteCanvas, 
            SpriteInfoList.ButtonNewGame, 
            MastermindBoard.ButtonNewGame);
    this.#buttonCheckAnswer =
        new libSprite.TSpriteButton(
            aSpriteCanvas, 
            SpriteInfoList.ButtonCheckAnswer, 
            MastermindBoard.ButtonCheckAnswer);
    this.#buttonCheat =
        new libSprite.TSpriteButton(
            aSpriteCanvas, 
            SpriteInfoList.ButtonCheat, 
            MastermindBoard.ButtonCheat);
    this.#panelHideAnswer =
        new libSprite.TSprite(
            aSpriteCanvas, 
            SpriteInfoList.PanelHideAnswer, 
            MastermindBoard.PanelHideAnswer);

    this.#buttonCheat.onClick = this.onHintClick;  
    this.#buttonCheckAnswer.onClick = this.onCheckAnswerClick;
    this.#ButtonNewGame.onClick = this.onButtonNewGameClick;   
    this.#colorHints = [];
    // end of constructor
    }

    draw() {
        this.#ButtonNewGame.draw();
        this.#buttonCheckAnswer.draw();
        this.#buttonCheat.draw();
        this.#panelHideAnswer.draw();
        
        for (let i = 0; i < this.#colorHints.length; i++) {
            const colorHint = this.#colorHints[i];
            colorHint.draw();
        }
        
    }

    onHintClick = () =>{
        this.#panelHideAnswer.visible = !this.#panelHideAnswer.visible;
    }

    onCheckAnswerClick = () => {
        //denne sjekker om vi har valgt rett farge
        const answerObject = {color: 0, pos: -1, checkThis: true};
        //Lage liste over computerens svar
        const computerAnswerList = [];
        for (let i = 0 ; i < 4; i++) {
            const obj = Object.create (answerObject);
            const computerAnswer = GameProps.ComputerAnswers[i];
            obj.color = computerAnswer.index;
            obj.pos = i;
            computerAnswerList.push(obj);
        }
        //Lage liste over spillerens svar
        const playerAnswerList = [];
        for (let i = 0; i < 4; i++) {
            //kontrollere at brukeren har valgt 4 farger
            const obj = Object.create(answerObject);
            const playerAnswer = GameProps.PlayerAnswers[i];
            if (GameProps.PlayerAnswers [i] === null) {
                return; //Avslutt funksjonen, brukeren mangler farger.
            }
            obj.color = playerAnswer.index;
            obj.pos = i;
            playerAnswerList.push(obj);
        }

        console.log("Computer answer", computerAnswerList);
        console.log("Player answer", playerAnswerList);
        //Sjekke om vi har valgt riktig farge på riktig plass

        let answerColorHintIndex = 0;
        let numberOfCorrectColors = 0;
            for (let i = 0; i < 4; i++){
                const computerAnswer = computerAnswerList[i];
                const playerAnswer = playerAnswerList[i];
                 if(computerAnswer.color === playerAnswer.color){
                    console.log(`Riktig farge på riktig plass ${i + 1}`);
                    answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 1);
                    //Vi må ikke sjekke disse to fargene igjen
                    computerAnswer.checkThis = playerAnswer.checkThis = false; 
                    //Er alle fargene riktig så er spillet over og vi må vise fargene fra computeren.
                    //Hint: Vi må bruke en variabel som forteller om alle farger er riktig.
                    numberOfCorrectColors++;
             }
        }
        if (numberOfCorrectColors === 4){
            console.log("Gratulerer, du har vunnet!");
            this.#panelHideAnswer.visible = false;
            return;
        }
        //Sjekke om vi har valgt riktig farge på feil plass.
        // ytre for løkke sjekker spillerens svar
        for(let i = 0; i < 4; i++){
            const playerAnswer = playerAnswerList[i];
            //hvis denne fargen skal sjekkes, sjekk mot alle computerens svar
            if(playerAnswer.checkThis){
                for(let j = 0; j < 4; j++){
                    const computerAnswer = computerAnswerList[j];
                    // test om denne fargen skal sjekkes og at den ikke er på samme plass.
                    if(computerAnswer.checkThis && (playerAnswer.pos !== computerAnswer.pos)){
                        if(playerAnswer.color === computerAnswer.color){
                            console.log(`Riktig farge, men på feil plass- ${playerAnswer.pos +1 } , {computerAnswer.pos + 1}`);
                            answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 0);
                            //Vi må ikke sjekke disse to fargene igjen
                            computerAnswer.checkThis = playerAnswer.checkThis = false; 

                        }
                    }
                }
            }
        }   
        // Gå videre til neste runde
        this.#setNextRound();
    }//end of onCheckAnswerClick
        
    onButtonNewGameClick = () => {
        newGame();
    }
    

    // privat metode, den bruker interne variabler og kan ikke påberopes utenfra.
    #createColorHint (posIndex, colorIndex){
        const pos = GameProps.AnswerHintRow[posIndex++];
        const colorHintSPI = SpriteInfoList.ColorHint;
        const colorHint = new libSprite.TSprite(this.#spcvs, colorHintSPI, pos);
        colorHint.index = colorIndex;
        this.#colorHints.push (colorHint);
        return posIndex; // Vi må returnere den nye indeksen til posisjonen.
    }

    #setNextRound(){
        this.#roundNumber++;
        if (this.#roundNumber > 10){
            console.log("Du har tapt, prøv igjen!");
            this.#panelHideAnswer.visible = false;
            return;
        }
        const rowText = `Row${this.#roundNumber}`;
        GameProps.snapTo.positions = MastermindBoard.ColorAnswer [rowText];
        GameProps.AnswerHintRow = MastermindBoard.AnswerHint[rowText];
        moveRoundIndicator();
        for (let i = 0; i < 4; i++){
            GameProps.PlayerAnswers[i].disable = true;
            GameProps.PlayerAnswers[i] = null;
        }
    }
} // End of class TMenu
