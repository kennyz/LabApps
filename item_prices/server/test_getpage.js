
var shops = require('./shops');

function do_search() {
	//var remoteurl= "http://s.etao.com/search?q=%C0%CB%B3%B1%D6%AE%E1%DB";
	var remoteurl= "http://s.etao.com/search?q=%C0%CB%B3%B1%D6%AE%E1%DB";
	var request = require('request');
	request({url:remoteurl}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {

		console.log("end of request search");				
		shops.extractURL(body, function(product) {
            if(product["flag"]===1)
                do_getpage(product);
            else
            	console.log("failed to find any shops");
		});
	  }
	});
}

function do_getpage(product) {
	var itemurl = product["url"];
	//var remoteurl= "http://s.etao.com/search?epid=2502010&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003149&stats_show=biz:3_2";
	var request = require('request');
	request({url:itemurl}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		//console.log(body) // Print the google web page.
		//do_parse(body);
		console.log("end of request item");
		console.log("product pic: "+product["pic"]);
				
		var arr = shops.extract_shop_list(body);
		for(i=0; 	i < arr.length; i++) {
			var title = arr[i]['username'];
			var url = arr[i]['url'];
			//title = encodeURI(title);
			console.log("shop: "+title+" url: "+url);
		}
	  }
	});

}
/*
var Iconv = require('iconv').Iconv;
var gbk_to_utf8_iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
function do_getpage_request() {
	var http = require('http');
	
	var options = {
		host: 's.etao.com',
		port: 80,
		path: '/search?epid=2308830&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003148&stats_show=biz:2_1',
		encodeing: 'gbk'
	};
	
	http.get(options, function(res) {
		console.log("Got response: " + res.statusCode, res.headers);
		var buffers = [], size = 0;
		res.on('data', function(buffer) {
			buffers.push(buffer);
			size += buffer.length;
		});
		res.on('end', function() {
			var buffer = new Buffer(size), pos = 0;
			for(var i = 0, l = buffers.length; i < l; i++) {
				buffers[i].copy(buffer, pos);
				pos += buffers[i].length;
			}
			var utf8_buffer = gbk_to_utf8_iconv.convert(buffer);
			//console.log(utf8_buffer.toString());
			var arr = shops.extract_shop_list(utf8_buffer);
			
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}
*/
do_search();
