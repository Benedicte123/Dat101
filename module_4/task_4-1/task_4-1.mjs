"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/


const accounts = new Object();

accounts.normal = "Brukskonto";
accounts.saving = "Sparekonto";
accounts.credit = "Kredittkonto";
accounts.pension = "Pensjonskonto";

printOut (accounts.normal +", " + accounts.saving +", "+ accounts.credit +", "+ accounts.pension); 
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class TAccount {
    constructor(initialType) {
        this._type = initialType;
        this._balance = 100;
        this._withdrawalCount = 0;
        this._currencyType = "NOK";
    }

    toString() {
        return `Type: ${this._type}, Balance: ${this._balance}, Currency: ${this._currencyType}`;
    }
    setType(newType) {
        printOut(`Account is changed from ${this._type} to ${newType}`);
        this._type = newType;
        this._withdrawalCount = 0;
    }

    getBalance() {
        return this._balance;
    }

    deposit(amount) {
        this._balance += amount;
        this._withdrawalCount = 0;
        printOut(`Deposit of ${amount}, new balance is ${this._balance}`);
    }

    withdraw(amount) {
        switch (this._type) {
            case "Saving":
                if (this._withdrawalCount < 3) {
                    if (amount <= this._balance) {
                        this._balance -= amount;
                        this._withdrawalCount++;
                        printOut(`Withdrawal of ${amount}, new balance is ${this._balance}`);
                    } else {
                        printOut("Insufficient balance.");
                    }
                } else {
                    printOut("Withdrawal limit reached for savings account.");
                }
                break;

            case "Pension":
                printOut("Withdrawals are not allowed for pension accounts.");
                break;

            default:
                printOut("Unknown account type.");
        }
    } setCurrencyType(aType) {
        if (this._currencyType !== aType && currencyTypes[aType]) {
            this._currencyType = aType;
            printOut(`Currency type changed to ${aType}`);
        } else {
            printOut("Currency type is the same or invalid.");
        }
    }

    
}

const myAccount = new TAccount("Brukskonto");

printOut("myAccount = " + myAccount.toString());

myAccount.setType("Sparekonto");

printOut("myAccount = " + myAccount.toString());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

myAccount.deposit(100);
myAccount.withdraw(25);
printOut("My account balance is " + myAccount.getBalance());

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const account = new TAccount("Saving");
printOut(`Initial balance: ${account.getBalance()}, Account type: ${account.toString()}`);

account.withdraw(20); 
account.withdraw(20); 
account.withdraw(20); 
account.withdraw(20); 
account.setType("Pension");
account.withdraw(20);
account.deposit(50); 
account.setType("Saving"); 
account.withdraw(20); 

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const currencyTypes = { 
    NOK: {value:1.00000, name: "Norske kroner", denomination: "kr" }, 
    EUR: {value:0.0985, name: "Europeiske euro", denomination: "€" }, 
    USD: {value:0.1091, name: "United States dollar", denomination: "$" }, 
    GBP: {value:0.0847, name: "Pound sterling", denomination: "£" }, 
    INR: {value:7.8309, name: "Indiske rupee", denomination: "र" }, 
    AUD: {value:0.1581, name: "Australienske dollar", denomination: "A$" }, 
    PHP: {value:6.5189, name: "Filippinske peso", denomination: "₱" }, 
    SEK: {value:1.0580, name: "Svenske kroner", denomination: "kr" }, 
    CAD: {value:0.1435, name: "Canadiske dollar", denomination: "C$" }, 
    THB: {value:3.3289, name: "Thai baht", denomination: "฿" }

};

class TAccountNew5{
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = balance;
        this.withdrawCount = 0; 
        this.currencyType = "NOK"; 
    }

    toString() {
        return this.type;
    }

    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0; 
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount) {
        this.balance += amount;
        printOut(`Deposit of ${amount}${currencyTypes[this.currencyType].denomination}
            , new balance is ${this.balance}${currencyTypes[this.currencyType].denomination}`);
        this.withdrawCount = 0; 
    }

    withdraw(amount) {
        switch (this.type) {
            case "Saving":
                if (this.withdrawCount >= 3) {
                    printOut("You can't withdraw from a Saving account more than three times!");
                    return;
                }
                break;
            case "Pension":
                printOut("You can't withdraw from a Pension account!");
                return;
        }

        if (amount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
        } else {
            this.balance -= amount;
            this.withdrawCount++; 
            printOut("Withdrawal of " + amount + ", new balance is " + this.balance);
        }
    }

    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (CurrencyTypes[newCurrency]) {
            this.currencyType = newCurrency;
            printOut("Currency changed to " + newCurrency);
        } else {
            printOut("Invalid currency type!");
        }
    }
}

const myAccount5 = new TAccountNew5("Normal", 0);

myAccount5.setCurrencyType("NOK");
myAccount5.deposit(150); 



printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class TAccountNew6 {
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = parseFloat(balance);  // Ensure balance is a number
        this.withdrawCount = 0; 
        this.currencyType = "NOK"; 
    }

    toString() {
        return this.type;
    }

    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0; 
    }

    getBalance() {
        return parseFloat(this.balance).toFixed(2) + currencyTypes[this.currencyType].denomination;
    }

    deposit(amount) {
        this.balance += parseFloat(amount);  // Convert amount to a number if needed
        printOut(`Deposit of ${amount}${currencyTypes[this.currencyType].denomination}, new balance is ${this.getBalance()}`);
        this.withdrawCount = 0; 
    }

    withdraw(amount) {
        switch (this.type) {
            case "Saving":
                if (this.withdrawCount >= 3) {
                    printOut("You can't withdraw from a Saving account more than three times!");
                    return;
                }
                break;
            case "Pension":
                printOut("You can't withdraw from a Pension account!");
                return;
        }

        if (amount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
        } else {
            this.balance -= parseFloat(amount);  // Ensure amount is a number
            this.withdrawCount++; 
            printOut("Withdrawal of " + amount + ", new balance is " + this.getBalance());
        }
    }

    // Private method to convert balance when changing currency
    #currencyConvert(newCurrencyType) {
        const oldCurrencyValue = currencyTypes[this.currencyType].value;
        const newCurrencyValue = currencyTypes[newCurrencyType].value;
        this.balance = parseFloat((this.balance * newCurrencyValue / oldCurrencyValue).toFixed(2));  // Convert and round to 2 decimals
    }

    // Method to change currency type and convert balance
    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (currencyTypes[newCurrency]) {
            printOut(`The account currency has changed from ${currencyTypes[this.currencyType].name} to ${currencyTypes[newCurrency].name}`);
            this.#currencyConvert(newCurrency);
            this.currencyType = newCurrency;
            printOut(`New balance is ${this.getBalance()}`);
        } else {
            printOut("Invalid currency type!");
        }
    }
}

// Testing the class
const myAccount6 = new TAccountNew6("Normal", 150);

// Example usage to match the output from the example
myAccount6.setCurrencyType("SEK"); // Change to Swedish kronor
myAccount6.setCurrencyType("USD"); // Change to US dollars
myAccount6.setCurrencyType("NOK"); // Change back to Norwegian kroner

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class TAccountNew7 {
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = balance;
        this.withdrawCount = 0;
        this.currencyType = "NOK"; 
    }


    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0;
    }

  
    deposit(amount, aType = "NOK") {
        const depositCurrencyValue = currencyTypes[aType].value;
        const currentCurrencyValue = currencyTypes[this.currencyType].value;
        
        const convertedAmount = (amount * depositCurrencyValue) / currentCurrencyValue;
        this.balance += convertedAmount;
        
        printOut(`Deposit of ${amount.toFixed(2)} ${currencyTypes[aType].name}
        , new balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
        this.withdrawCount = 0;
    }

    withdraw(amount, aType = "NOK") {
        const withdrawCurrencyValue = currencyTypes[aType].value;
        const currentCurrencyValue = currencyTypes[this.currencyType].value;
        
        const convertedAmount = (amount * withdrawCurrencyValue) / currentCurrencyValue;

        if (convertedAmount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
            return;
        }

        this.balance -= convertedAmount;
        printOut(`Withdrawal of ${amount.toFixed(2)} ${currencyTypes[aType].name},
         new balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
    }

    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (currencyTypes[newCurrency]) {
            const oldCurrencyValue = currencyTypes[this.currencyType].value;
            const newCurrencyValue = currencyTypes[newCurrency].value;
            this.balance = (this.balance / oldCurrencyValue) * newCurrencyValue;

            printOut(`The account currency has changed from ${currencyTypes[this.currencyType].name} 
                to ${currencyTypes[newCurrency].name}`);
            this.currencyType = newCurrency; 
            printOut(`New balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
        } else {
            printOut("Invalid currency type!");
        }
    }
}

const myAccount7 = new TAccountNew7("Normal", 0);

myAccount7.deposit(12, "USD");  
myAccount7.withdraw(10, "GBP");  
myAccount7.setCurrencyType("CAD"); 
myAccount7.setCurrencyType("INR");  
myAccount7.setCurrencyType("SEK");  
myAccount7.withdraw(150.11, "SEK"); 

printOut(newLine);

printOut("--- Part 8 -----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function expandText(text, maxSize, char, insertBefore) { 
    while (text.length < maxSize) {
        if (insertBefore) {
            text = char + text; 
        } else {
            text = text + char; 
        }
    }
    return text;
}

const result = expandText("world", 12, "#", false); 

printOut(result); 
printOut(newLine);