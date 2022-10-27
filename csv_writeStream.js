const fs = require('fs');
let dataRows = [ "ID-",
    "Nom",
    "Prenom",
    "Rue de la merveille",
    "92100",
    "Boulogne-billancurt",
    "email.exemple@gmail.com",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText",
    "someText"
];
let date = new Date();



(async () => {
    
    const writeStream = fs.createWriteStream('./output/LastTestFile_1e7_Ligne.csv');
    let text =``;
    let tmpText = '';

    for(let i = 0 ;i <= 1e7 ; i++){
 
        for (let index = 0; index < 45 ; index++) {
            if(index === 0 )  tmpText += dataRows[index]+i+";";
            else if(index === 44)  tmpText += dataRows[index]+"\n";
            else {
                if((i === 1e7 || i === 1e7/2) && index === 6) tmpText += "email;inerror@gmail.com;";
                else tmpText += tmpText = dataRows[index]+";";
            }
            
        }
        text = tmpText;
        tmpText = '';
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
