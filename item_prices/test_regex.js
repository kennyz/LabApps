var fs =  require("fs");
var filename = "part.txt";
var strText = ""+fs.readFileSync(filename);

var rePattern = new RegExp(/\btitle=\"(.*)\"\b/ig);
var arrMatches = strText.match(rePattern);

var r = /href=\"http:\/\/shop.etao.com\/search.*title=\"([^\"]*)\"/igm;
while ( m = r.exec(strText) ) {
    // `m` is your match, `m[1]` is the letter
	console.log(m[1]);
}

var r = /<div class=\"price\">(.*)<\/div>/igm;
while ( m = r.exec(strText) ) {
    // `m` is your match, `m[1]` is the letter
	console.log(m[1]);
}

