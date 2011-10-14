var http = require('http');
var url = require("url");
var shops = require("./shops");
var logs = new Array();
//var process = require("process");

var port  = process.argv[2]?parseInt(process.argv[2]):80;
console.log(port);

http.createServer(function (req, res) {
 	res.writeHead(200, {'Content-Type': 'text/plain'});
        var uri = url.parse(req.url).pathname;
        var query = url.parse(req.url, true).query || {};
        if(uri == "/") {
                res.end("yes,it is me, kongwu site");
        }
        else if (uri=="/item_prices"){
                var title= query.title;
		        var thisurl = query.url;
				console.log(title);
				var data = shops.getList(title, function(product,shops){                        
					console.log("done (found "+ shops.length+")");
                    //var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
					
                    res.write("var product = "+JSON.stringify(product)+";");
                    res.write("var visit_users = "+JSON.stringify(shops)+";");
                    res.end();           
                });
                //res.end("NULL");
                        
        }        
}).listen(port, "127.0.0.1");

console.log('Server running at http://127.0.0.1/');
//visitors.list();
//just for test
//visitors.getList();
