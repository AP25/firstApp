var dbOperationObj = require('./dbOpeartion').dbOperation;
var dbOpr = new dbOperationObj();



function auth(){
	
}

auth.prototype={
		construtor : auth
};


auth.prototype.authenticateDataFromDb = function(param,authenticateDataFromDbCB){
	var data = {
		name : param.UserName,
		pwd : param.Password
	};
	console.log("<<data");
	console.log(data);
	dbOpr.fetchDataDb(data,function(Error,Success){
		console.log("Callback yaar");
		console.log(Error)
		if(!Error){
			console.log("Yes auth done");
			authenticateDataFromDbCB(null,Success);
		}else{
			console.log("auth not done");
			authenticateDataFromDbCB(Error,null);
		}
		
	});
	
	
};

exports.auth = auth;