var nodeio = require('node.io');
var methods = {
    input: false,
    run: function() {
        this.getHtml('http://www.baidu.com/', function(err, $) {
			console.log("baidu");
            //Handle any request / parsing errors
            if (err) this.exit(err);

            var titles = [], scores = [], output = [];

            //Select all titles on the page
            $('div#siteTable a.title').each(function(a) {
                titles.push(a.text); 
            });


            this.emit(output);
        });
    }
}

exports.job = new nodeio.Job({timeout:10}, methods);


