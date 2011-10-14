
//LabsJS.define(function(require) {
//define([], function(require, exports, module) {
define(function(require) {
	var $ = require("jquery-1.6.1"); // 引用 jquery 1.6.1
	$(document).ready(function() {

		if($("#cube_entry").length==0) {
			//$(".login-info").append("<a id=\"cube_entry\" href=\"http://cube.data.taobao.com/p/main?f=3\" target=\"_blank\" style=\"color: red;\">["+decodeURI("%E6%95%B0%E6%8D%AE%E9%AD%94%E6%96%B9")+"]</a>");
			$("#site-nav-bd > .quick-menu > .home").html("<a id=\"cube_entry\" href=\"http://cube.data.taobao.com/p/main?f=3\" target=\"_blank\" style=\"background: #f18b0b; color: white; padding: 3px; border-right: 1px solid #F7F7F7;border-bottom: 1px solid #F7F7F7;\">"+decodeURI("%E6%95%B0%E6%8D%AE%E9%AD%94%E6%96%B9")+"</a> <a id=\"indec_entry\" href=\"http://shu.taobao.com/\" target=\"_blank\" style=\"background: #009bd1; color: white; padding: 3px; border-right: 1px solid #F7F7F7;border-bottom: 1px solid #F7F7F7;\">"+decodeURI("%E6%B7%98%E5%AE%9D%E6%8C%87%E6%95%B0")+"</a>");
			$("#site-nav-bd > .quick-menu > .home").css('display','block');
		    
    
		}

	});

});

