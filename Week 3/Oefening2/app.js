var fs = require("fs");
fs.appendFile("./resources/textfile.txt","geappende data",function(err)
{
    fs.readFile("./resources/textfile.txt",function(err,data){
        fs.writeFile("./resources/textfile.txt",data.toString().replace("data","test"),function(err){
            console.log("done");
        });
    });
});