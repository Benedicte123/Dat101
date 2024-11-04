"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let countUp = "";
let countDown = "";

for (let i = 1; i <= 10; i++) {
   countUp += i + " ";
}
for (let i = 10; i >= 1; i--) {
    countDown += i + " ";
}

printOut(countUp + newLine);
printOut(countDown + newLine);

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const answerNumber = 45;
let guessNumber = 0;
while (answerNumber !== guessNumber){
    guessNumber = Math.ceil(Math.random() * 60);
}
   
printOut ("Guess Number = " + guessNumber.toString());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

guessNumber = 0;
let guessCount = 0;
const startTime = Date.now();
while(answerNumber !== guessNumber){ 
    guessCount++;
    guessNumber = Math.ceil(Math.random() * 1000000);
}
const endTime = Date.now();
const timeUsed = endTime - startTime;

printOut ("Antall gjetninger: " + guessCount.toString() + ". Det tok " + timeUsed.toString() + " ms.");


printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let primesTo200 = "";

for (let i = 2; i < 200; i++) {
    let isPrime = true;
    let j = 2;

    
    while (j * j <= i) {
        if (i % j === 0) {
            isPrime = false;
            break;
        }
        j++;
    }

    if (isPrime) {
        primesTo200 += i + " ";
    }
}

printOut(primesTo200);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let rowOutput = "";

for (let row = 1; row <= 1; row++) {
    rowOutput = ""; 
    for (let col = 1; col <= 9; col++) {
        rowOutput += `K${col}R${row} `; 
    }
}
    printOut(rowOutput.trim()); 
    printOut(newLine);
    
    for (let row = 1; row <= 2; row++) {
    rowOutput = "";
    for (let col = 1; col <= 9; col++) {
        rowOutput += `K${col}R${row} `;
    }
}
    printOut(rowOutput.trim()); 
    printOut(newLine); 

    for (let row = 1; row <= 3; row++) {
        rowOutput = "";
    for (let col = 1; col <= 9; col++) {
            rowOutput += `K${col}R${row} `;
        }
}
        printOut(rowOutput.trim()); 
        printOut(newLine); 

        for (let row = 1; row <= 4; row++) {
            rowOutput = "";
        for (let col = 1; col <= 9; col++) {
                rowOutput += `K${col}R${row} `;
            }
        }
            printOut(rowOutput.trim()); 
            printOut(newLine); 

            for (let row = 1; row <= 5; row++) {
                rowOutput = "";
            
                for (let col = 1; col <= 9; col++) {
                    rowOutput += `K${col}R${row} `;
                }
            }
                printOut(rowOutput.trim()); 
                printOut(newLine); 
                for (let row = 1; row <= 6; row++) {
                    rowOutput = "";
                
                    for (let col = 1; col <= 9; col++) {
                        rowOutput += `K${col}R${row} `;
                    }
                }
                    printOut(rowOutput.trim()); 
                    printOut(newLine); 
                    for (let row = 1; row <= 7; row++) {
                        rowOutput = "";
                    
                        for (let col = 1; col <= 9; col++) {
                            rowOutput += `K${col}R${row} `;
                        }
                    }
                        printOut(rowOutput.trim()); 
                        printOut(newLine); 

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function getLetterGrade(score) {
    let percentage = (score / 236) * 100;

    if (percentage >= 89) return 'A';
    if (percentage >= 77) return 'B';
    if (percentage >= 65) return 'C';
    if (percentage >= 53) return 'D';
    if (percentage >= 41) return 'E';
    return 'F';
}

for (let i = 1; i <= 5; i++) {
    let score = Math.floor(Math.random() * 236) + 1;
    let letterGrade = getLetterGrade(score);
    //printOut(`Student ${i}: Score = ${score}, Grade = ${letterGrade}`);
}
let grades = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: []
}
for (let i = 1; i <= 5; i++) {
    let score = Math.floor(Math.random() * 236) + 1;
    let letterGrade = getLetterGrade(score);
    grades[letterGrade].push(`Student ${i}: Score = ${score}, Grade = ${letterGrade}`);
}

let order = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let grade of order) {
    for (let record of grades[grade]) {
        printOut(record);
    }
}


printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!
Simulate 6 dice and print how many "throws" it takes to get:
● 1 2 3 4 5 6 (full straight)
● 3 pairs
● 2 of a kind and 4 of a kind (tower)
● All the same (Yahtzee)
*/

const dice1 = Math.ceil(Math.random() * 6);
const dice2 = Math.ceil(Math.random() * 6);
const dice3 = Math.ceil(Math.random() * 6);
const dice4 = Math.ceil(Math.random() * 6);
const dice5 = Math.ceil(Math.random() * 6);
const dice6 = Math.ceil(Math.random() * 6);


let diceThrow = "";
diceThrow += dice1.toString() + ",";
diceThrow += dice2.toString() + ",";
diceThrow += dice3.toString() + ",";
diceThrow += dice4.toString() + ",";
diceThrow += dice5.toString() + ",";
diceThrow += dice6.toString() + "";


//let diceThrow = "2,2,4,4,5,5";

printOut("Dicethrow: " + diceThrow);

const count1 = (diceThrow.match(/1/g) || "").length;
const count2 = (diceThrow.match(/2/g) || "").length;
const count3 = (diceThrow.match(/3/g) || "").length;
const count4 = (diceThrow.match(/4/g) || "").length;
const count5 = (diceThrow.match(/5/g) || "").length;
const count6 = (diceThrow.match(/6/g) || "").length;

let diceCount = "";
diceCount += count1.toString() + ",";
diceCount += count2.toString() + ",";
diceCount += count3.toString() + ",";
diceCount += count4.toString() + ",";
diceCount += count5.toString() + ",";
diceCount += count6.toString()
printOut ("DiceCount: " + diceCount);

const equals1 = (diceCount.match(/1/g) || "").length;
const equals6 = (diceCount.match(/6/g) || "").length;
const tower = (diceCount.match (/2/g) && diceCount.match (/4/g) || "").length;
const pairs = (diceCount.match (/2/g) && diceCount.match (/2/g) && diceCount.match (/2/g) || "").length;
printOut("equals1: " + equals1.toString());
printOut("equals6: " + equals6.toString());
printOut("Tower " + tower.toString());
printOut ("Pairs " + pairs.toString());

if (equals1 ===6) {
    printOut("Full straight");
}else if(equals6 === 1){
    printOut("Yatzy!");
  } else if (tower) {
    printOut ("Tower")
  } else if (pairs ===3) {
    printOut ("Three pairs");
  }


  //while/do løkke Simulate 6 dice and print how many "throws" it takes to get???

printOut(newLine);

