var http = require('http');
var url = require("url");
var shops = require("./shops");
var logs = new Array();
//var process = require("process");

var port  = process.argv[2]?parseInt(process.argv[2]):80;
console.log(port);

var cache = {};

http.createServer(function (req, res) {
 	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        var uri = url.parse(req.url).pathname;
        var query = url.parse(req.url, true).query || {};
        if(uri == "/") {
                res.end("yes,it is me, kongwu site");
        }
        else if (uri=="/item_prices"){
                var title= query.title;
		        var thisurl = query.url;
				var jquery_cb = query.callback;
				console.log(title);
				console.log(thisurl);
				var output_func = function(data) {
					var product = data[0];
					var shopitems = data[1];
					var out = "";
					out += jquery_cb+'({';	
                    out += "\"product\": "+JSON.stringify(product)+",";
                    out += "\"shops\" : "+JSON.stringify(shopitems)+"";
					out += '})';
					res.write(out);
                    res.end();           
				}
				if(title in cache) {
					console.log("found in cache:"+title+" ");
					output_func(cache[title]);	
				}
				else {

				var data = shops.getList(title, function(product,shopitems){                        
					console.log("done (found "+ shopitems.length+")");
					cache[title] = [product,shopitems];
                    //var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
					output_func([product,shopitems]);
                });
				}
                //res.end("NULL");
                        
        }        
}).listen(port, "127.0.0.1");

console.log('Server running at http://127.0.0.1/');
//visitors.list();
//just for test
//visitors.getList();
