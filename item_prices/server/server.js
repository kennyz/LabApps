var http = require('http');
var url = require("url");
var shops = require("./shops");
var logs = new Array();
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
				var data = shops.getList(title, function(data){                        
					console.log("done (found "+ data.length+")");
                    //var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
                    res.write("var visit_users = "+JSON.stringify(data)+";");
                    res.end();           
                });
                //res.end("NULL");
                        
        }        
}).listen(80, "127.0.0.1");
console.log('Server running at http://127.0.0.1/');
//visitors.list();
//just for test
//visitors.getList();
