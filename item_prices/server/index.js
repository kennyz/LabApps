var http = require('http');
var url = require("url");
var logs = new Array();
//中文支持可以吗
http.createServer(function (req, res) {
 	res.writeHead(200, {'Content-Type': 'text/plain'});
        var uri = url.parse(req.url).pathname;
        var query = url.parse(req.url, true).query || {};
        if(uri == "/") {
                res.end("yes,it is me，thanks. good");
        }
        else if (uri=="/put"){
                var user= query.u;
                if(logs.indexOf(user)<0 && user!="") //if user not exists
                    logs.push(user);
                res.write("var visit_users = "+JSON.stringify(logs)+";");
                res.end();
        }
}).listen(80, "127.0.0.1");
console.log('Server running at http://127.0.0.1/');
