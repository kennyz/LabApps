
LabsJS.define(function(require) {
	var $ = require("jquery-1.6.1"); // 引用 jquery 1.6.1
	//alert("Hello World!"); 
	$(document).ready(function() {
	/*
		$("#logo").append("<a href=\"http://cube.data.taobao.com/p/\" target=\"_blank\"><img src=\"http://img02.taobaocdn.com/tps/i2/T1RgRWXi4KXXXXXXXX-192-53.gif\"></a>");
		$(".taobao-logo div").append("<a href=\"http://cube.data.taobao.com/p/\" target=\"_blank\"><img src=\"http://img02.taobaocdn.com/tps/i2/T1RgRWXi4KXXXXXXXX-192-53.gif\"></a>");
	*/
		if($("#cube_entry").length==0) {
			$(".login-info").append("<a id=\"cube_entry\" href=\"http://cube.data.taobao.com/p/main?f=3\" target=\"_blank\" style=\"color: red;\">["+decodeURI("%E6%95%B0%E6%8D%AE%E9%AD%94%E6%96%B9")+"]</a> <a id=\"indec_entry\" href=\"http://shu.taobao.com/\" target=\"_blank\" style=\"color: green;\">["+decodeURI("%E6%B7%98%E5%AE%9D%E6%8C%87%E6%95%B0")+"]</a>");
		}

	});

});

