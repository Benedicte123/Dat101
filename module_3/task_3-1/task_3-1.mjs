"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/

printOut("Task 1, 2 and 3");
let wakeUpTime = 9;
const timeLimitSleepBus = 7;
const timeLimitSleepTrain =8;

if (wakeUpTime<= timeLimitSleepBus) {
  printOut("I can take the bus to school.");
}else if
  (wakeUpTime <= timeLimitSleepTrain) {
  printOut ("I can take the train to school");
}else{ 
  printOut("I woke up too late, I have to take the car")
 }

printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let value = 0;

if (value >= 1) {
  printOut ("Value is= " + value +". This value is positive");
}else if (value == 0) { 
  printOut("value is= " +value + ". this is zero") ;
}else{
  (value <=-1) 
    printOut("Value is= " + value +". This value is negative");
  }


printOut(newLine);

printOut("--- Part 6, 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const imageCriteriaMin = 4;
let uploadedImage = Math.floor(Math.random(1) * 9);
const imageCriteriaMax = 6;

if (uploadedImage >= imageCriteriaMax ) { 
  printOut("Image is too large");

} else if (uploadedImage < imageCriteriaMin) {
  printOut("Image is too small");

} else {
  printOut("Thank you");
}

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const monthList =["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];

if (monthName.includes("r")) { 
  printOut ("Month is: " + monthName + ". You must take vitamin D")
} else { 
  printOut ("Month is: " + monthName + ". You do not need to take vitamin D")
}
  
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here! */

let daysInMonth;

if(monthName === "January"){
  daysInMonth = 31;
}else if(monthName === "February"){
  daysInMonth = 28;
}else if(monthName === "March"){
  daysInMonth = 31;
}
else if(monthName === "April"){
  daysInMonth = 30;
}
else if(monthName === "May"){
  daysInMonth = 31;
}else if(monthName === "June"){
  daysInMonth = 30;
}else if(monthName === "July"){
  daysInMonth = 31;
}else if(monthName === "August"){
  daysInMonth = 31;
}else if(monthName === "September"){
  daysInMonth = 30;
}else if(monthName === "October"){
  daysInMonth = 31;
}else if(monthName === "November"){
  daysInMonth = 30;
}else {
  daysInMonth = 31
}

printOut("Month is: " + monthName + ". It contains " + daysInMonth + "days");


printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!
Imagine you have an art gallery, but you need to refurbish the premises, so you close the gallery from
March through May, but in April you have temporary premises in the building next door. Use the month
constant in exercise 8 to inform the status of your gallery in that month.*/

if ((monthName === "March") || monthName === "May") {
  printOut ("The gallery is closed in " + monthName + ". Come back later")
} else if (monthName === "April"){
  printOut ("The gallery have temporary premises in the building next door in " + monthName + ". Welcome")
} else {
  printOut ("The gallery is open in " + monthName + ". Welcome")
}


printOut(newLine);
