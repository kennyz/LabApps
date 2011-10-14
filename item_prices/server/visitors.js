var mongoose = require('mongoose'),
    //db = mongoose.connect('mongodb://localhost/kongwu');
    db = mongoose.connect('mongodb://7w2oigjkbkmah:o8ogehshsja@127.0.0.1:20088/i00fft2zb2gsg');
var Schema = mongoose.Schema;
var events = require("events");
Visitors = new Schema({
	id	   : {type:Number,index: true, default: 1},
	username   : {type:String,index: true},
	url   : {type:String,index: true},
	visit_time : { type: Date, default: Date.now },
	visit_count: { type:Number,default: 1},
	msg: {type:String}
 }).method('update', function(){
   this.visit_count += 1;
   this.visit_time = new Date();
   return this.visit_count;
 });
var Visitor = mongoose.model('Visitors', Visitors);
//var username = "kongwu";
exports.findUser = function(username,url,msg,callback) {Visitor.findOne({"username":username,"url":url},function(err,visit) {
	if(visit){ //exists
		console.log("duplicated:"+username); 
		visit.update();
	}
	else {
		var visit = new Visitor();
		visit.username = username;
		visit.url = url;
		console.log("new user:"+username);
	}
	if(msg!="")
		visit.msg = msg;
	visit.save(function(err) {
		if(!err)	console.log("save sucess:"+username);
		else console.log(err);
		callback();
	});
});
};
exports.list = function(){Visitor.find({},function(err,records) {
	if(!err) {
		records.forEach(function(record) {
			//console.log('username='+record.username+",visit_count="+record.visit_count+",last_time="+record.visit_time.toString());
			//record.remove();
		
		});
	}
})};
//self.prototype = new events.EventEmitter;
exports.getList = function(url,cb){
	var logs = new Array();
    //test-url: http://kongwu.cnodejs.net/put?u=cnsnoopy&msg=&url=trade.taobao.com%2F%2Ftrade%2Fitemlist%2Flist_bought_items.htm
	//Visitor.find({"url":url}).sort({visit_count:1},function(err,records) {
    Visitor.find({"url":url},function(err,records) {
    	if(!err) {
    		records.forEach(function(record) {
    			//console.log('username='+record.username+",visit_count="+record.visit_count+",last_time="+record.visit_time.toString());
    			logs.push({"username":record.username,"cnt":record.visit_count,"last":record.visit_time.toString(),"msg":record.msg});
    		
    		});
    		//console.log(logs);
    	}
    	else
    		console.log("error in getList");
    	cb(logs);
    	//res.write("ver visit_users = "+JSON.stringify(logs)+";");
    	//res.end();
	});
};
//exports.users = logs;
console.log("db");
//db.connection.close();
