"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const part1_1 = 2 + 3 * 2 - 4 * 6;
printOut("2 + 3 * 2 - 4 * 6 = " + part1_1.toString());
const part1_2 = 2 + (3 * (2 - 4)) * 6;
printOut("2 + (3 * (2 - 4)) * 6 = " + part1_2.toString());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const inch = 25.4 // mm
const metres = 25 // m
const cm = 34 // cm
const result = (metres * 100 + cm) / inch * 10
const rounded = result.toFixed(2)
printOut("25.34m to inches = " + rounded.toString());
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
//Convert 3 days, 12 hours, 14 minutes, and 45 seconds to minutes. (Not allowed to use date objects). 
//The task must be solved with primitives.
const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;
const part2_answer = 
(3 * hoursInDay * minutesInHour) +
(12 * minutesInHour) +
+14 + 
(45 /secondsInMinute);

printOut("3 dager, 12 timer, 14 minutter og 45 sekunder = "+ part2_answer.toString());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
//Convert 6,322.52 minutes to days, hours, minutes, and seconds. (Not allowed to use date objects). 
//The task must be solved with primitives.
const numberOfMinutes = 6322.52;
let part4_calc = numberOfMinutes / (60 * 24);
const part4_days = Math.floor (part4_calc);
printOut ( "Days = " + part4_days);

part4_calc = part4_calc - part4_days;
part4_calc = part4_calc * hoursInDay;
const part4_hours = Math.floor (part4_calc);
printOut ("Hours = " + part4_hours); 

part4_calc = part4_calc - part4_hours;
part4_calc = part4_calc * minutesInHour;
const part4_minutes = Math.floor (part4_calc);
printOut("Minutes = " + (part4_minutes));

part4_calc = part4_calc - part4_minutes;
part4_calc = part4_calc * secondsInMinute;
const part4_seconds = Math.floor (part4_calc);
printOut ("Seconds = " + (part4_seconds));

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Convert 54 dollars to Norwegian kroner, and print the price for both:
NOK → USD and USD → NOK.
Use 76 NOK = 8.6 USD as the exchange rate.
The answer must be in whole "Kroner" and whole "dollars".
printOut("Replace this with you answer!");
printOut(newLine); 
*/

const NOK = 76/ 8.6;
const USD = 8.6 / 76;
let amountUSD = 54;
const amountNOK = Math.round (amountUSD * NOK);
printOut (amountUSD + " dollar er " + amountNOK + " kroner");
printOut (amountNOK + " kroner er " + amountUSD + " dollars");


printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/* 
Create a variable that contains the following text:
"There is much between heaven and earth that we do not understand."
● Print the number of characters in the text.
● Print the character at position number 19.
● Print the characters starting at position number 35 and 8 characters forward.
● Print the index at which "earth" starts in the text.
*/

const part6_Text = "There is much between heaven and earth that we do not understand."
printOut(part6_Text)

let part6_length = part6_Text.length;
printOut("Teksten har " + part6_length + " bokstaver");

let char19 = part6_Text.charAt (19);
printOut ("Bokstav på posisjon 19 er: " + char19)

const char35_43 = part6_Text.substring(35,45); 
printOut ("Bokstavene fra plass nr. 35 og 8 karakterer fremover er: " + char35_43.toString())

let part6_word = part6_Text.slice(33,39);
printOut("Ordet \"" + part6_word.toString() +"\" begynner på posisjon 33")


printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Comparison, print the values for the following expressions (evaluate whether the statements are true):
● Is 5 greater than 3?
● Is 7 greater than or equal to 7?
● Is "a" greater than "b"?
● Is "1" less than "a"?
● Is "2500" less than "abcd"?
● "arne" is not equal to "thomas".
● (2 equals 5) is this statement true?
● ("abcd" is greater than "bcd") is this statement false?
*/

let nr1 = (5>3);
Boolean(nr1);
printOut ("Is 5 grater than 3? " + Boolean(nr1));

let nr2 = (7>=7);
Boolean (nr2);
printOut("Is 7 greater than or equal to 7? " + Boolean(nr2));

let nr3 = ("a">"b");
Boolean (nr3);
printOut("Is A greater than B? " + Boolean(nr3));

let nr4 = (1<"a");
Boolean (nr4);
printOut("Is 1  less than A? " + Boolean(nr4));

let nr5 = ("2500"<"abcd");
Boolean (nr5);
printOut("Is 2500 less than ABCD? " + Boolean(nr5));

let nr6 = ("arne !== thomas");
Boolean(nr6);
printOut ("Arne er ikke likt til Thomas? " +Boolean(nr6));

let nr7 = ("2"==="5");
Boolean (nr7);
printOut ("2 er lik 5? " + Boolean(nr7));

// ("abcd" is greater than "bcd") is this statement false?
let nr8 = ("abcd"<"bcd");
Boolean (nr8);
printOut ("this statement is " + Boolean(nr8));

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*Convert and print the following expressions:
● from text "254" to a number
● from text "57.23" to a number
● from text "25 kroner" to a number*/

const nr81 = Number("254");
printOut(nr81.toString());

const nr82 = Number("57.23");
printOut(nr82.toString());

const nr83 = parseInt("25 kroner");
printOut(nr83.toString());

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
//Create a variable "r" and randomly generate a number from 1 to 360 (1 >= r <= 360).

let r = Math.ceil(Math.random(1) * 361);
printOut(r.toString());

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
//Use modulus (%) to calculate how many weeks and days are in 131 days.

const days_10 = 131;
const daysInAWeek = 7;
let x_10 = days_10 % daysInAWeek;
let dagerDeltPåUker = Math.floor(131/7)

printOut("131 dager er " + dagerDeltPåUker + " uker og " + x_10.toString() + " dager");
printOut(newLine);