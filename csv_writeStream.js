const fs = require('fs');

let date = new Date();

(async () => {
    const writeStream = fs.createWriteStream('./output/Last'+date.getTime()+'-outPut.csv');
    let text =``;
    for(let i = 0 ;i <= 1e8 ; i++){
        if(i === 1e8)  text  = `${i};Test;Hello;World;8\n`
        else text  = `${i};Test;HelloWorld;0\n`

        const overWatermark = writeStream.write(text);

        if(!overWatermark){
            await new Promise((resolve) => 
            writeStream.once('drain',resolve)
            );
        }
    }
    writeStream.end();
    console.log('< --------- process done / File created -------- >')

})();