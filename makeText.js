/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov'); // assuming your class is exported from 'markov.js'

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function makeTextFromFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${file}`, err.message);
            process.exit(1);
        }
        generateText(data);
    });
}

function makeTextFromURL(url) {
    axios
        .get(url)
        .then((res) => {
            generateText(res.data);
        })
        .catch((err) => {
            console.error(`Cannot fetch URL: ${url}`, err.message);
            process.exit(1);
        });
}

// Get the second command line argument (first is the script path)
const pathOrUrl = process.argv[2];

if (pathOrUrl === 'file') {
    const file = process.argv[3];
    makeTextFromFile(file);
} else if (pathOrUrl === 'url') {
    const url = process.argv[3];
    makeTextFromURL(url);
} else {
    console.log('Invalid argument (must be "file" or "url")!');
}
