var jsdom = require('jsdom');
var shops = require('./shops');
var remoteurl= "http://s.etao.com/search?epid=2502010&v=product&p=detail&q=%C0%CB%B3%B1%D6%AE%E1%DB&cat=50003149&stats_show=biz:3_2";
var request = require('request');
request(remoteurl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	//console.log(body) // Print the google web page.
	do_parse(body);
  }
});
function do_parse(html){ 
jsdom.env({
  html: html,
  scripts: [
    'jquery-1.6.4.min.js'
  ]
}, function (err, window) {
  var $ = window.jQuery;
	var 	links = $(".merchant-title > .pic > .pic > img");
	$.each(links,functionn(n,value) {
	console.log(value.title);
	//console.log(value.attr("title"));
	});
/*
var links = $(".price");
$.each(links,function(n,value) 			{
console.log(value.value);
//console.log(value.attr("title"));
})console;
*/
});
}

