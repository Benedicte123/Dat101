"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function printTodaysDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    printOut(today.toLocaleDateString('no-NB', options));
}
printTodaysDate();

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getAndPrintTodaysDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    printOut(today.toLocaleDateString('no-NB', options));
    return today;
}

const todayDateObject = getAndPrintTodaysDate();

/*The Hype Train is Leaving the Station: Craft a new function that calculates the number of days left 
until the epic release of 2XKO, the highly-anticipated tag-team fighting game set in the League of 
Legends universe, launching on May 14th, 2025.*/

const releaseDate2xko = new Date("2025-05-14");
function daysUntilRelease(releaseDate) {
    const today = new Date();
    const timeDifference = releaseDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
}

const daysLeft = daysUntilRelease(releaseDate2xko);
printOut("Days until release of 2XKO: ${daysLeft}");
printOut("“It ain’t luck, it’s destiny.” – TF")

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function printCircleProperties(radius) {
    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * Math.pow(radius, 2);

    printOut(`Diameter: ${diameter}`);
    printOut(`Circumference: ${circumference.toFixed(2)}`);
    printOut(`Area: ${area.toFixed(2)}`);
}

printCircleProperties(5);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function printRectangleProperties(rectangle) {
    const { width, height } = rectangle;
    const circumference = 2 * (width + height);
    const area = width * height;

    printOut(`Circumference: ${circumference}`);
    printOut(`Area: ${area}`);
}

const rectangleDimensions = { width: 10, height: 5 };
printRectangleProperties(rectangleDimensions);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function convertTemperature(value, type) {
    let celsius, fahrenheit, kelvin;

    if (type === "Celsius") {
        celsius = value;
        fahrenheit = Math.round((value * 9 / 5) + 32);
        kelvin = Math.round(value + 273.15);
    } else if (type === "Fahrenheit") {
        fahrenheit = value;
        celsius = Math.round((value - 32) * 5 / 9);
        kelvin = Math.round(((value - 32) * 5 / 9) + 273.15);
    } else if (type === "Kelvin") {
        kelvin = value;
        celsius = Math.round(value - 273.15);
        fahrenheit = Math.round((value - 273.15) * 9 / 5 + 32);
    } else {
        printOut("Invalid temperature type. Use 'Celsius', 'Fahrenheit', or 'Kelvin'.");
        return;
    }

    printOut(`Celsius: ${celsius}`);
    printOut(`Fahrenheit: ${fahrenheit}`);
    printOut(`Kelvin: ${kelvin}`);
}

// Example usage:
convertTemperature(20, "Celsius");
//convertTemperature(32, "Fahrenheit");
//convertTemperature(0, "Kelvin");

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function calculateNetPrice(gross, taxGroup) {
    let vat;

    // Convert tax group to lowercase to make it case-insensitive
    switch (taxGroup.toLowerCase()) {
        case "normal":
            vat = 25;
            break;
        case "food":
            vat = 15;
            break;
        case "hotel":
        case "transport":
        case "cinema":
            vat = 10;
            break;
        default:
            printOut("Unknown VAT group!");
            return NaN;
    }

    // Calculate net price using the formula
    const net = (100 * gross) / (vat + 100);
    return net;
}

//100kr
printOut(`100kr without tax is (25%): ${calculateNetPrice(100, "normal")}`);
printOut(`100kr without tax is (15%): ${calculateNetPrice(100, "food")}`);
printOut(`100kr without tax is (10%): ${calculateNetPrice(100, "hotel")}`);
printOut(`Result for unknown VAT group: ${calculateNetPrice(100, "goblins")}`);

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function calculateMissingValue(distance = null, time = null, speed = null) {
    if (speed === null && distance !== null && time !== null) {
        // Calculate speed
        speed = distance / time;
        return speed;
    } else if (time === null && distance !== null && speed !== null) {
        // Calculate time
        time = distance / speed;
        return time;
    } else if (distance === null && time !== null && speed !== null) {
        // Calculate distance
        distance = speed * time;
        return distance;
    } else {
        return "Invalid input: Please provide exactly two values.";
    }
}

printOut(`Speed: ${calculateMissingValue(100, 2)}`);
printOut(`Time: ${calculateMissingValue(100, null, 50)}`);
printOut(`Distance: ${calculateMissingValue(null, 2, 50)}`);

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function adjustString(text, maxSize, char, insertBefore) {
    if (text.length >= maxSize) {
        return text;
    }

    let difference = maxSize - text.length;
    let extraChars = char.repeat(difference);


    if (insertBefore) {
        return extraChars + text;
    } else {
        return text + extraChars;
    }
}

let result1 = adjustString("hello", 10, "*", true);
let result2 = adjustString("world", 8, "-", false);

printOut("Res 1: " + result1); 
printOut("Res 2: " + result2);  

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function testIfMathIsFun() {
    let op = 1;
    let line = 1;
  
   //left side
    while (line <= 200) {
      let sumLeft = 0;
      let sumRight = 0;
  
      for (let left = 0; left < line + 1; left++) {
        sumLeft += op;
        op++;
      }

  //right side
      for (let right = 0; right < line; right++) {
        sumRight += op;
        op++;
      }
  
      // Check if the sums are not equal
      if (sumLeft !== sumRight) {
        console.log(`Mismatch on line ${line}: Left side = ${sumLeft}, Right side = ${sumRight}`);
        return;
      }
  
      line++;
    }
  
    // If all lines passes, print message:
    printOut("Maths fun!");
  }
  
testIfMathIsFun();

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function factorial(n) {
    
    if (n <= 1) {
        return 1;
    }
    
    return n * factorial(n - 1);
}

let number = 5;
printOut(`Factorial of ${number} is: ` + factorial(number));

printOut(newLine);
