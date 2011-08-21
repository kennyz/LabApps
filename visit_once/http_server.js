
var PORT = 80;
var HOST = null;


var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var server = http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname;
    if(uri=="/")        uri = "/index.html";
    uri = ""+ uri;
        console.log(uri);
    var filename = path.join(process.cwd(),uri);
        console.log("filename:"+filename);
    
    if(req.method == "GET"){
        if( req.url.indexOf("favicon") > -1 ){
        res.writeHead(200, {'Content-Type': 'image/x-icon', 'Connection': 'close'});
        res.end("");
        } else {
        //if(uri=="/")    filename = "mon-client.html";
        path.exists(filename, function(exists) {
            if(!exists) {
                res.writeHeader(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
                return;
            }
            fs.readFile(filename, "binary", function(err, file) {
                if(err) {
                    res.writeHeader(500, {"Content-Type": "text/plain"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }
                var ext = path.extname(filename);
                ext = ext ? ext.slice(1) : 'html';

                var contentTypes = {
                  "js": "application/x-javascript",
                  "css": "text/css",
                  "png": "image/png",
                  "jpeg": "image/jpeg",
                  "gif": "image/gif"
                }
                //res.writeHeader(200,{'Content-Type': contentTypes[ext] || 'text/html'});  
                res.writeHeader(200,{'Content-Type': contentTypes[ext] });
                res.write(file,"binary");
                //res.write(file);
                res.end("");
                return;
            
            });
        });
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(Number(PORT), HOST);
console.log("port :"+PORT || PORT+" host"+HOST);
