var http = require('http');
var url = require("url");
var visitors = require("./visitors");
var logs = new Array();
http.createServer(function (req, res) {
 	res.writeHead(200, {'Content-Type': 'text/plain'});
        var uri = url.parse(req.url).pathname;
        var query = url.parse(req.url, true).query || {};
        if(uri == "/") {
                res.end("yes,it is me, kongwu site");
        }
        else if (uri=="/put"){
                var user= query.u;
				var msg = query.msg;
				var thisurl = query.url;
                if(logs.indexOf(user)<0 && user!="") //if user not exists
                    logs.push(user);
				var list_func = function(){
					visitors.getList(thisurl,function(data){
						res.writeHead(200, {'Content-Type': 'application/json;charset=gbk'});
						res.write("var visit_users = "+JSON.stringify(data)+";");
						res.end();
					});
				}
				if(user!="" && thisurl!="" && msg!=null && msg.length<50)
					visitors.findUser(user,thisurl,msg,list_func);
				else
					list_func();
        }
}).listen(80, "127.0.0.1");
console.log('Server running at http://127.0.0.1/');
//visitors.list();
//just for test
//visitors.getList();
