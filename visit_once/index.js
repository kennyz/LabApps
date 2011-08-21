var http = require('http');
var url = require("url");
var logs = new Array();
http.createServer(function (req, res) {
        var uri = url.parse(req.url).pathname;
        var query = url.parse(req.url, true).query || {};
        if(uri == "/") {
                res.end("yes,it is me");
        }
        else if (uri=="/put"){
                var user= query.u;
				if(logs.indexOf(user)<0)
                	logs.push(user);
                //res.write("user is "+user);
				
                //res.write("all visitors is "+logs);
                //res.write(logs);
				res.write(JSON.stringify(logs));
                res.end();
        }

        //res.writeHead(200, {'Content-Type': 'text/plain'});
        //res.end('Hello World, this is kongwu site\n');
}).listen(8080, "127.0.0.1");
console.log('Server running at http://127.0.0.1/');
