
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
	var arr = {}, arr2 = {}, arr3 = {};
	var i = 0;	
	//href="http://shop.etao.com/redirect.htm?target=http%3A%2F%2Fwww.szjdw.com%2Fmall%2Fshouji%2F2010-10%2F28%2Fsub6554_18414.html&type=
	//get shop name
	var r = /href=\"http:\/\/shop.etao.com\/search.*title=\"([^\"]*)\"/igm;
	while ( m = r.exec(strText) ) {
		// `m` is your match, `m[1]` is the letter	
		if(m[1].length == 0 || typeof(m[1]) == 'undefined') continue;	
		arr[i] = m[1]; //gbk_to_utf8_iconv.convert(m[1]).toString();
		//arr[i] = gbk_to_utf8_iconv.convert(m[1]).toString();
		//console.log(arr[i]);
		i ++;
	}
	var max = i-1;
	//get shop url
	i = 0;
	var r =/href="http:\/\/shop.etao.com\/redirect.htm\?target=([^&]*)&type=/igm;
	while ( m = r.exec(strText) ) {
		// `m` is your match, `m[1]` is the letter
		//console.log(m[1]);
		arr3[i] = m[1];
		i ++;
	}
	//get price	
	i = 0;
	var r =/<div class=\"price\">(.*)<\/div>/igm;
	while ( m = r.exec(strText) ) {
		// `m` is your match, `m[1]` is the letter
		//console.log(m[1]);
		arr2[i] = m[1];
		i ++;
	}
		var newarr = new Array();
	i = 0;
	while(i<max) {
		newarr.push({"username":encodeURIComponent(arr[i]), "cnt":arr2[i],"url": decodeURIComponent(arr3[i]), "msg":""});
		i++;	
	}

	return newarr;
}

var extractURL = exports.extractURL = function(body, callback) {
	var strText = g2u(body);
	//console.log(strText);
	var url = "",title = "",pic = "";
	var product = {url:"",title:"",pic:"",flag:0}
	var i = 0;

	//<li class="entry J_isProduct"><a class="pic title-pic pic-220" title="HTC Desire G7 WCDMA(3G)网络 " data-stat="userid=264205944&lf_aclog=null-null-25-commend-0&at_alitrackid=www.etao.com&lf_acfrom=0&q=htc+g7&style=grid&stats_click=biz%3A3_2&url=%2Fsearch%3Fepid%3D1320247%26v%3Dproduct%26p%3Ddetail%26q%3DHTC%2BDesire%2BG7%2BWCDMA%25283G%2529%25CD%25F8%25C2%25E7%26cat%3D1512" href="/search?epid=1320247&v=product&p=detail&q=HTC+Desire+G7+WCDMA%283G%29%CD%F8%C2%E7&cat=1512&stats_show=biz:3_2" target="_blank"><span><img alt="" class="hesper:small2big" src="http://img01.taobaocdn.com/bao/uploaded/i6/T1YhxuXilNXXcX1Bs__110325.jpg_b.jpg">
	var r0 = / title="([^\"]*)".*v=product&p=detail.*src=\"(http:\/\/img[^\"]*)\"/img;
	if ( m = r0.exec(strText) ) {
		title = m[1];
		pic = m[2];
		console.log("got a product: "+title+" pic: "+pic);
	}
	            	
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
			product = {url:url,title:title,pic:pic,flag:1}
			console.log("got a url: "+url);
	}
	else {
		console.log("failed to find any item");
	}
	
	callback(product);
}


var get_page_list = function(product, cb_output) {
	console.log("get list from item page");
    var remoteurl = product["url"];
    //var remoteurl= "http://s.etao.com/search?epid=2308830&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003148&stats_show=biz:2_1";
    //var remoteurl= "http://s.etao.com/search?epid=2308830&v=product&p=detail&q="+escape(title)+"stats_show=biz:2_1";
    var request = require('request');
    request({url:remoteurl}, function (error, response, strText) {
		//console.log(strText);
		if(error) console.log("error in request"+remoteurl);
		if (!error && response.statusCode == 200) {
			
			cb_output(product,extract_shop_list(strText));
			
		}
	});
};


exports.getList = function(title, cb_output) {
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
		extractURL(body, function(product) {
			if(product["flag"]===1)  //found product
				get_page_list(product, cb_output);
			else
				cb_output([]);
		});
	  }
	  else {
		cb_output([]);
	  }
	});
}
