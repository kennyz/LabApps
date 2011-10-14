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
						res.write("var visit_users = "+JSON.stringify(data)+";");
						res.end();
					});
				}
				if(user!="" && thisurl!="" && msg!=null && msg.length<50)
					visitors.findUser(user,thisurl,msg,list_func);
				else
					list_func();
        }
        else if (uri=="/item_prices"){
                var title= query.title;
				var thisurl = query.url;
                var jsdom = require('jsdom');
                
                var remoteurl= "http://s.etao.com/search?epid=2308830&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003148&stats_show=biz:2_1";
                var request = require('request');
                request(remoteurl, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                     
                     console.log(body);
                    jsdom.env({
                      html: body,
                      scripts: [
                        'jquery-1.6.4.min.js'
                      ]
                    }, function (err, window) {
                        var data = new Array(); 
                        var $ = window.jQuery;
                        
                        var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
                        var links = $(".merchant-title > .pic > .pic > img");
                    	$.each(links,function(n,value) {
                    		console.log(value.title);
                            data.push({"username":value.title,"cnt":34,"msg":"none"});
                    		//console.log(value.attr("title"));
                    	});
                        
                        //var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
                        res.write("var visit_users = "+JSON.stringify(data)+";");
                        res.end();                        
                        
  
                    });
                  }
                });
                
                /*
                var data = [{"username":"abc","cnt":"1212", "msg":"none"}];
                res.write("var visit_users = "+JSON.stringify(data)+";");
                res.end();
                */
                /*
				var list_func = function(){
					visitors.getList(thisurl,function(data){
						res.write("var visit_users = "+JSON.stringify(data)+";");
						res.end();
					});
				}
				if(user!="" && thisurl!="" && msg!=null && msg.length<50)
					visitors.findUser(user,thisurl,msg,list_func);
				else
					list_func();
                */
        }        
}).listen(80, "127.0.0.1");
console.log('Server running at http://127.0.0.1/');
//visitors.list();
//just for test
//visitors.getList();
