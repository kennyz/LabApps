

LabsJS.define(function(require) {
	
	if(window.__item_prices_load) {
	    return;
	}
	window.__item_prices_load = true; 
	
	var $ = require("jquery-1.6.1");
	
	function escapeHTML(str) {
	    var div = document.createElement('div'),
	    text = document.createTextNode(str);
	    div.appendChild(text);
	    return div.innerHTML;
	}
	
	var title = $(".tb-detail-hd h3").text();
	//alert(title);
	

	var thisurl = location.host+"/"+location.pathname;
	var msg = "";
	var remote_url = 'http://kongwu.cnodejs.net/item_prices?title='+encodeURIComponent(title)+"&url="+encodeURIComponent(thisurl);
		
	function load_data() {
		
		var html = "";
		var max = 10;
		if(visit_users!=null)
			for(var i=0; i< visit_users.length; i++) {
				var user = visit_users[i];
				if(user!=null && user.username!=""){
					var username = (unescape(user.username));
					var count = user.cnt;
					var msg = user.msg;
					if(msg==null) msg = "";
					msg  = msg.replace(/<script.*?>.*?<\/script>/ig, '');  
					username  = username.replace(/<script.*?>.*?<\/script>/ig, '');  
					html = html + "<div style=\"color: #adb0b3; margin-top: 3px;\">"+(username)+" <span style=\"color: #adb0b3; font-size: 8px;\">"+count+"</span></div>";
				}
				if(i>max) break;
			}
		$("#price_panel_list").html(html);
		//alert("load data"+html);
	}
    //alert(getNick());
    KISSY.getScript(remote_url,function() {
				
		load_data();		

	}, "utf-8");
	

	
	var user_panel = $("#site-nav");
	var html = "<div style=\"position: fixed; top: 60px; left: 0px; padding: 5px; margin: 5px; background: #F8F8F8; width: 130px; border: #DDDDDD solid 1px; z-index:100999; \" id=\"price_panel\">";
	html = html + "<div style=\"font-size: 14px; color: orange; \">"+decodeURI("%E8%B4%A7%E6%AF%94%E4%B8%89%E5%AE%B6")+" <input type=\"button\" id=\"price_panel_close\" style=\"color: #DDDDDD; \" value=\"toggle\" href=\"#\"/></div><div id=\"price_panel_body\" style=\"border-top: #DDDDDD solid 2px; margin-top: 4px; \"><div id=\"price_panel_list\">loading...</div>";
	html = html + "</div></div></div>";

	var mall_panel = $("#mall-nav");
	if(mall_panel.length==0)
		user_panel.append(html);
	else
		mall_panel.append(html);

	if($("#visit_panel_body").length>0)
		$("#visit_panel_body").hide();
	

	//}); //end of document ready




});

