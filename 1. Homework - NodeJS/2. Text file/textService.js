const fs = require('fs');

const filePath = "./textFile.txt";


const addText = (text) => {
    fs.writeFile(filePath, text, (err) => {
        if(err) {
            throw new Error;
        }
        console.log(`You wrote some text in the file.`);
    })
}


const appendText = (text) => {
    fs.appendFile(filePath, text, (err) => {
        if (err) {
            throw new Error;
        }
        console.log(`You added some text to the file.`);
    })
}

const readText = () => {

    return fs.readFileSync(filePath, { encoding: 'utf-8' });
}


module.exports = {
    addText,
    appendText,
    readText
}
