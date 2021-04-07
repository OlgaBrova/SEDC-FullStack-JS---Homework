// const calculator = require('./calculator');
// const { sum, substract } = require('./calculator');

// console.log(calculator.substract(7, 4));
// console.log(sum(5, 5));


const textService = require("./textService");
const math = require("./math");

const readline = require ('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Would you like to work with a text file or do math operations?', answer => {

    if (answer === "text") {

        rl.question('Would you like to write, append or read text from a file? >', answer1 => {

            if (answer1 === "write") {
                rl.question('Please enter a text you wish to be written to the file >', text => {
                    textService.addText(text);
                    rl.close();
                });
            } else if (answer1 === "append") {
                rl.question('Please enter a text you wish to append to the file >', text => {
                    textService.appendText(text);
                    rl.close();
                });
            } else if (answer1 === "read") {
                const text = textService.readText();
                console.log(text);  
            }
                
        });
        
    } else if (answer === "math") {

        let result;

        rl.question("Choose a math method: sum, subtract, multiply or divide. > ", method => {
            if (Object.keys(math).includes(method.trim())) {
                
                rl.question("What is the first number? ", num1 => {
                
                    rl.question("What is the second number? ", num2 => {
                    
                        switch (method) {
                            case "sum":
                                result = math.sum(Number(num1), Number(num2));
                                console.log(`Result: ${result}`);
                                break;
                            case "subtract":
                                result = math.subtract(Number(num1), Number(num2));
                                console.log(`Result: ${result}`);
                                break;
                            case "multiply":
                                result = math.multiply(Number(num1), Number(num2));
                                console.log(`Result: ${result}`);
                                break;
                            case "divide":
                                result = math.divide(Number(num1), Number(num2));
                                console.log(`Result: ${result}`);
                                break;
                            default:
                                console.log("There has been an error!");
                                break;
                        }
        
                        rl.close();
                    });
                });
            }
            else {
                console.log(`Method ${method} not recognized, app stopped.`);
                rl.close();
            }
        });
    } 
});
