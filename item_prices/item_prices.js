

//LabsJS.define(function(require) {
define(function(require) {
		
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
	
	function setCookie(cookieName, cookieValue, nDays) {
	    var today = new Date();
	    var expire = new Date();
	    if (nDays == null || nDays == 0) nDays = 1;
	    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
	    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
	}
	
	function getCookie(name) {
	    var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
	    return (m && m[1]) ? decodeURIComponent(m[1]) : '';
	}	
	
	var title = $(".tb-detail-hd h3").text();
	title = $.trim(title);	
	
	var strPrice = $("#J_StrPrice").text();
	var price = 0.0;
	if(strPrice!==null)
		price = parseFloat(strPrice);

	//title = escapeHTML(unescape(title.replace(/\\u/g, '%u')));
	title = encodeURIComponent(title);

	var thisurl = location.host+"/"+location.pathname;
	var msg = "";
	//service powered NAE (cnodejs.net), if you need inviting code, send email to kongwu@taobao.com
	var remote_url = 'http://kongwu.cnodejs.net/item_prices?title='+title+"&url="+encodeURIComponent(thisurl);
	//var remote_url = 'http://localhost:8080/item_prices?title='+escape(title)+"&url="+encodeURIComponent(thisurl);
		
	function load_data() {
		
		var html = "";
		var max = 10;
		if(visit_users!=null)
			for(var i=0; i< visit_users.length; i++) {
				var user = visit_users[i];
				if(user!=null && user.username!="" && user.username!=="undefined"){
					var title = (decodeURI(user.username));
					var strP = user.cnt;
					var p = parseFloat(strP);
					var msg = user.msg;
					if(msg==null) msg = "";
					msg  = msg.replace(/<script.*?>.*?<\/script>/ig, '');  
					//username  = username.replace(/<script.*?>.*?<\/script>/ig, '');  
					html = html + "<div style=\"color: #666; margin-top: 5px;\">"+title;
					var color = "";
					if(p>price) color = "green"; else color = "red";
					var percent = 0+parseInt(((p-price)/price)*100);
					html += " <span style=\"color: "+color+"; font-size: 8px;\">";
					html += "<br>"+decodeURI("%E4%BB%B7%E6%A0%BC")+strP;
					if(percent>0) html += "("+decodeURI("%E9%AB%98")+percent+"%)";
					else if(percent<0) html += "("+decodeURI("%E4%BD%8E")+""+Math.abs(percent)+"%)";
					html += "</span>";
			
					html += "</div>";
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
	var html = "<div style=\"position: fixed; top: 60px; left: 0px; margin: 5px; background: #FFFFFF; width: 140px; border: #DDDDDD solid 1px; z-index:100999; \" id=\"price_panel\">";
	html = html + "<div style=\"font-size: 14px; color: #a0a8ab; padding: 5px; background: #f9f9f9; \">"+decodeURI("%E8%B4%A7%E6%AF%94%E4%B8%89%E5%AE%B6")+" <input type=\"button\" id=\"price_panel_close\" style=\"color: #DDDDDD; \" value=\"-\" href=\"#\"/></div><div id=\"price_panel_body\" style=\"border-top: #DDDDDD solid 2px; padding: 5px; background: #F7F7F7;\"><div id=\"price_panel_list\"><img src=\"http://sysinfo.cnodejs.net/loading-small.gif\"></div>";
	html = html + "</div></div></div>";

	var mall_panel = $("#mall-nav");
	if(mall_panel.length==0)
		user_panel.append(html);
	else
		mall_panel.append(html);

	if($("#visit_panel_body").length>0)
		$("#visit_panel_body").hide();
	$("#price_panel_body").hover(function () {
    	$(this).css({'background-color' : '#FFFFFF', 'font-weight' : 'normal'});
  	}, function () {
    	$(this).css({'background-color' : '#F7F7F7', 'font-weight' : 'normal'});
  	});

	var is_show = getCookie("show_price_panel");
	if(is_show==null || is_show=="") is_show = 1;
	//alert(is_show);
	if(is_show==0)	$("#price_panel_body").hide();
	$("#price_panel_close").click(function(){
		if(is_show==1) {
			$("#price_panel_body").hide();
			is_show = 0;				
		}
		else {
			$("#price_panel_body").show();
			is_show = 1;
		};
		setCookie("show_price_panel",is_show);

	});
	//}); //end of document ready




});

