var fs = require("fs");
var fileName = "./resources/textfile.txt";
fs.exists(fileName, functie2);

function functie2(exists) {
    if (exists) {
        fs.stat(fileName, functie3);
    }
}

function functie3(error, stats) {
    //callback 2: haal statistische data vd file op (is het een file?)
    if (error) { throw error };
    if (stats.isFile()) {
        fs.readFile(fileName, null, functie4);
    }
}

function functie4(error, data) {
        //callback 3: lees binair indien stats een file aanduidt
        if (error) { throw error };
        console.log(data);
}
