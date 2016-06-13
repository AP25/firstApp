/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');*/

var MongoClient = require('mongodb').MongoClient;




var state = exports.state  = {
		dbSub :{
			
		}
};

exports.connect = function(url,done){

	if(state.db) return done();
	//create connection with mongoDb
	MongoClient.connect(url,function(err,db){
	   if(!err){
		   console.log("Connected to server sucessfully");
		  // app.listen(3000);
		   state.dbSub = db;
		   done(db);
		  // db.close();
	   }
	});
};


exports.get = function(done){
	//return state.db;
	done(state.dbSub);
};

exports.close = function(mongoObj,done){
	if(state.dbSub){
		state.dbSub.close(function(err,result){
			state.dbSub = null;
			state.mode = null;
			done(err,result);
			
		});
	}else{
		mongoObj.close(function(err,result){
			if(!err){
				console.log("Sucessful");
				console.log(result);
			}else{
				console.log("Error while closing connection");
				console.log(err);
			}
			
			
			done(err,result);
		});
	}
};





