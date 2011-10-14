

//LabsJS.define(function(require) {
define(function(require) {
		
	if(window.__visit_once_load) {
	    return;
	}
	window.__visit_once_load = true; 
	
	var $ = require("jquery-1.6.1");
	function getNick() {
	    var defNick = '', trackNick = getCookie('tracknick'),
			nick = getCookie('_nk_') || trackNick, 
			isLogin = getCookie('_l_g_') && nick || getCookie('ck1') && trackNick; 
	    nick = isLogin ? escapeHTML(unescape(nick.replace(/\\u/g, '%u'))) : defNick;
	    if(!nick) {
	        nick = $('a.user-nick').text();
	    }
	    return nick;
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
	
	function escapeHTML(str) {
	    var div = document.createElement('div'),
	    text = document.createTextNode(str);
	    div.appendChild(text);
	    return div.innerHTML;
	}
	

	var nick = encodeURIComponent(getNick());
	if(nick=="") return;

	var thisurl = location.host+"/"+location.pathname;
	var msg = "";
	
	//service powered NAE (cnodejs.net), if you need inviting code, send email to kongwu@taobao.com
	var remote_url = 'http://visitonce.cnodejs.net/put?u=' + nick + '&msg='+encodeURIComponent(msg)+"&url="+encodeURIComponent(thisurl);
		
	function load_data() {
		
		var html = "";
		var max = 10;
		if(visit_users!=null)
			for(var i=0; i< visit_users.length; i++) {
				var user = visit_users[i];
				if(user!=null && user.username!=""){
					var username = user.username;
					var count = 0+user.cnt;
					var msg = user.msg;
					var last = user.last;
					var last_arr = last.split(" ");
					var msgdate = last_arr[1]+" "+last_arr[2];
					if(msg==null) msg = "";
					msg  = msg.replace(/<script.*?>.*?<\/script>/ig, '');  
					username  = username.replace(/<script.*?>.*?<\/script>/ig, '');  
					//html = html + "<li style=\"color: #adb0b3; margin-top: 3px;\">"+username+decodeURI("%E5%88%B0%E6%AD%A4%E4%B8%80%E6%B8%B8")+" <span style=\"color: #adb0b3; font-size: 8px;\">"+count+decodeURI("%E6%AC%A1")+"</span><div style=\"padding-bottom: 2px; color: green;\">"+msg+"</div></li>";
					html = html + "<div style=\"color: #adb0b3; margin-top: 5px; line-height: 100%; padding: 0px;\">"+"<div style=\"color: green;\">"+decodeURI("%E2%80%9C")+msg+decodeURI("%E2%80%9D")+"</div><div style=\"font-size: 10px; \"><i>by "+username+" ("+msgdate+")</i></div></div>";
				}
				if(i>max) break;
			}
		$("#visit_panel_list").html(html);
		//alert("load data"+html);
	}
    //alert(getNick());
    KISSY.getScript(remote_url,function() {
				
		load_data();		

	}, "utf-8");
	

	
	var user_panel = $("#site-nav");
	var html = "<div style=\"position: fixed; top: 25px; left: 0px; padding: 5px; margin: 5px; background: #F8F8F8; width: 130px; border: #DDDDDD solid 1px; z-index:100999; \" id=\"visit_panel\">";
	html = html + "<div style=\"font-size: 14px; color: orange; \">"+decodeURI("%E8%B0%81%E5%88%B0%E6%AD%A4%E4%B8%80%E6%B8%B8")+" <input type=\"button\" id=\"visit_panel_close\" style=\"color: #DDDDDD; \" value=\"toggle\" href=\"#\"/></div><div id=\"visit_panel_body\" style=\"border-top: #DDDDDD solid 2px; margin-top: 4px; \"><div id=\"visit_panel_list\">loading...</div>";
	html = html + "<div style=\"margin-top: 10px; \"><input id=\"visit_panel_input\" type=\"text\" size=20 style=\"color: #adb0b3;\" value=\""+decodeURI("%E7%95%99%E8%A8%80%E5%90%8E%E5%9B%9E%E8%BD%A6")+"\" maxlength=50 ></div></div></div>";

	var mall_panel = $("#mall-nav");
	if(mall_panel.length==0)
		user_panel.append(html);
	else
		mall_panel.append(html);
	var is_show = getCookie("show_visit_panel");
	if(is_show==null || is_show=="") is_show = 1;
	//alert(is_show);
	if(is_show==0)	$("#visit_panel_body").hide();
	$("#visit_panel_close").click(function(){
		if(is_show==1) {
			$("#visit_panel_body").hide();
			is_show = 0;				
		}
		else {
			$("#visit_panel_body").show();
			is_show = 1;
		};
		setCookie("show_visit_panel",is_show);

	});
	$("#visit_panel_input").keypress(function(){
		if(event.keyCode==13){KISSY.getScript("http://visitonce.cnodejs.net/put?u=" + nick + "&msg="+encodeURIComponent(this.value)+"&url="+encodeURIComponent(thisurl),function(){load_data();}, "utf-8");}
	}).focus(function(){
		this.value='';
	});
	

	//}); //end of document ready




});

