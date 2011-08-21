

function getNick() {
    var defNick = '',
    trackNick = getCookie('tracknick'),
    nick = getCookie('_nk_') || trackNick,
    uc1 = getCookie('uc1'),
    isLogin = getCookie('_l_g_') && nick || getCookie('ck1') && trackNick; 
    return isLogin ? escapeHTML(unescape(nick.replace(/\\u/g, '%u'))) : defNick;
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



LabsJS.define(function(require) {
	var $ = require("jquery-1.6.1"); // 引用 jquery 1.6.1
	//alert("Hello World!"); 
	$(document).ready(function() {

	var nick = encodeURIComponent(getNick());
	if(nick=="") return;

	function submit_once_msg(msg) {
		LabsJS.load_thisbox(msg);
	}

	function load_thisbox(msg) {
	var url = 'http://kongwu.cnodejs.net/put?u=' + nick + '&msg='+encodeURIComponent(msg);
    //alert(getNick());
    KISSY.getScript(url,function() {
		//alert(visit_users);		
		var user_panel = $("#site-nav");
		var html = "<div style=\"position: fixed; top: 25px; left: 0px; padding: 5px; margin: 5px; background: #F8F8F8; width: 130px; border: #DDDDDD solid 1px; z-index:999; \">";
		html = html + "<div></div>";
		var max = 20;
		if(visit_users!=null)
			for(var i=0; i< visit_users.length; i++) {
				var user = visit_users[i];
				if(user!=null && user.username!=""){
					var username = user.username;
					var count = user.cnt;
					var msg = user.msg;
					if(msg==null) msg = "";
					html = html + "<li>"+username+decodeURI("%E5%88%B0%E6%AD%A4%E4%B8%80%E6%B8%B8")+" ("+count+")<div style=\"padding-bottom: 2px; color: green;\">"+msg+"</div></li>";
				}
				if(i>20) break;
			}
		html = html + "<div><input type=\"text\" size=15 onkeypress=\"if(event.keyCode==13){KISSY.getScript('http://kongwu.cnodejs.net/put?u=" + nick + "&msg='+encodeURIComponent(this.value)+'',function(){location.reload();});}\" ></div></div>";
		user_panel.append(html);

	}, "utf-8");

	} //end of function load_thisbox

	load_thisbox("");
	
	}); //end of document ready




});

