const fs = require('fs');
const directory = './FileToTreat/';

const readStream = fs.createReadStream('./FileToTreat/Last1665952654521-outPut.csv');

// fs.readdir(directory, (err, files) => {
//     files.forEach(file => {
//         console.log(file);
//     });
// });

let unprocessed = '';
let numberOfColumn = 4 // number of columns wanted
let seperator = ';'; // type of seperaator

let lineNumb = BigInt(Number.MAX_SAFE_INTEGER);
lineNumb = 1;
let splittedline = [];

readStream.on('data', (chunk) => { 
    let chunkString = unprocessed + chunk.toString();
    unprocessed = '';
    let startIndex = 0;
    for(let ch = startIndex; ch < chunkString.length+1; ch++){
        if(chunkString[ch] === '\n'){
            const line= chunkString.slice(startIndex, ch);
            splittedline = line.split(seperator);
            if(splittedline.length > numberOfColumn || splittedline.length < numberOfColumn){
                console.log(lineNumb,' ==> ',line)
            }
            startIndex = ch + 1;
            lineNumb++;
        }
    }
    if(chunkString[chunkString.length-1] !== '\n'){
        unprocessed = chunkString.slice(startIndex);
    }

})
readStream.on('error', (error) => console.log(error.message));
readStream.on('close', () => {
    console.log('Data parsing completed');
})