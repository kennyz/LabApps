
var Iconv = require('iconv').Iconv;
var gbk_to_utf8_iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
var utf8_to_gbk_iconv = new Iconv('UTF-8', 'GBK//TRANSLIT//IGNORE');

console.log("shops ext");

var g2u = exports.g2u = function(body) {
	var utf8_buffer = gbk_to_utf8_iconv.convert(body);
	var strText = utf8_buffer.toString(); 	
	return strText;
}

var u2g = exports.u2g = function(body) {
	var utf8_buffer = utf8_to_gbk_iconv.convert(body);
	var strText = utf8_buffer.toString(); 	
	return strText;
}
								
var extract_shop_list = exports.extract_shop_list = function(body) {
	var strText = g2u(body);
	var arr = {}, arr2 = {};
	var i = 0;
	var r = /href=\"http:\/\/shop.etao.com\/search.*title=\"([^\"]*)\"/igm;
	while ( m = r.exec(strText) ) {
		// `m` is your match, `m[1]` is the letter	
		if(m[1].length == 0 || typeof(m[1]) == 'undefined') continue;	
		arr[i] = m[1]; //gbk_to_utf8_iconv.convert(m[1]).toString();
		//arr[i] = gbk_to_utf8_iconv.convert(m[1]).toString();
		//console.log(arr[i]);
		i ++;
	}
	i = 0;
	var r =/<div class=\"price\">(.*)<\/div>/igm;
	while ( m = r.exec(strText) ) {
		// `m` is your match, `m[1]` is the letter
		//console.log(m[1]);
		arr2[i] = m[1];
		i ++;
	}
	var max = i-1;
	var newarr = new Array();
	i = 0;
	while(i<max) {
		newarr.push({"username":encodeURIComponent(arr[i]), "cnt":arr2[i], "msg":""});
		i++;	
	}

	return newarr;
}

var extractURL = exports.extractURL = function(body, callback) {
	var strText = g2u(body);
	//console.log(strText);
	var url = "";
	var i = 0;
	var r = /<a class=\"action-btn\" href=\"(\/search[^\"]*)\"/igm;
	if ( m = r.exec(strText) ) {
		url = m[1];
	}
	if(url=="") {
		var r2 = /bj-btn\" href=\"(\/search[^\"]*)\"/igm;
		if ( m = r2.exec(strText) ) {
			url = m[1];
		}
	}
	if(url!=null && url!="") {
			url = "http://s.etao.com"+url;
			console.log("got a url: "+url);
	}
	else {
		console.log("failed to find any item");
	}
	callback(url);
}

exports.getList = function(title, callback) {
	//var remoteurl= "http://s.etao.com/search?q=%C0%CB%B3%B1%D6%AE%E1%DB";
	//title = ""+title;
	//title = u2g(title);
	title = title.trim();
	title = encodeURIComponent(title);
	var remoteurl= "http://s.etao.com/search?q="+title+"&ie=utf-8";
	console.log("do request: "+ remoteurl);
	var request = require('request');
	request({url:remoteurl }, function (error, response, body) {
	  if (!error && response.statusCode == 200) {

		console.log("end of request search");				
		extractURL(body, function(url) {
			if(url!="")
				get_page_list(url, callback);
			else
				callback([]);
		});
	  }
	});
}

var get_page_list = function(remoteurl, callback) {
	console.log("get list from item page");
    
    //var remoteurl= "http://s.etao.com/search?epid=2308830&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003148&stats_show=biz:2_1";
    //var remoteurl= "http://s.etao.com/search?epid=2308830&v=product&p=detail&q="+escape(title)+"stats_show=biz:2_1";
    var request = require('request');
    request({url:remoteurl}, function (error, response, strText) {
		//console.log(strText);
		if(error) console.log("error in request"+remoteurl);
		if (!error && response.statusCode == 200) {
			callback(extract_shop_list(strText));
		}
		else
			callback([]);
	});
};
