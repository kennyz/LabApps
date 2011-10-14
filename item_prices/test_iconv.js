var Iconv = require('iconv').Iconv;
var gbk_to_utf8_iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
var utf8_to_gbk_iconv = new Iconv('UTF-8', 'GB2312//TRANSLIT//IGNORE');

console.log("shops ext");

var g2u = exports.g2u = function(body) {
    var utf8_buffer = gbk_to_utf8_iconv.convert(body);
    var strText = utf8_buffer.toString();
}
var u2g = exports.u2g = function(body) {
    var utf8_buffer = utf8_to_gbk_iconv.convert(body);
    var strText = utf8_buffer.toString();
    return strText;
}

var encode=function(str){ 
	str=escape(str); 
	str=str.replace(/\+/g,"%u002B"); 
	return str; 
}; 

var url = "http://localhost:8080/item_prices?title=%0A%E6%B5%AA%E6%BD%AE%E4%B9%8B%E5%B7%85&url=item.taobao.com%2F%2Fitem.htm";
//var title = "%E6%B5%AA%E6%BD%AE%E4%B9%8B%E5%B7"
var title = "%0A%E6%B5%AA%E6%BD%AE%E4%B9%8B%E5%B7%85";
console.log(title);
title = u2g(decodeURIComponent(title));
console.log("u2g:"+title);
title = encodeURIComponent(title);
console.log(title);
title = encode(title);
console.log(title);
//%C0%CB%B3%B1%D6%AE%E1%DB
//ttp://s.etao.com/search?q=%C0%CB%B3%B1%D6%AE%E1%DB


console.log("*******");;
var title = "%u6D6A%u6F6E%u4E4B%u5DC5";
console.log(title);
title = encode(title);
//title = u2g(title);
//title = encodeURIComponent(title);
console.log(title);

