var db = require('../dbConnection');

function dbOperation(){
	
}

dbOperation.prototype = {
		constructor : dbOperation
};

/**
 * @author apandit
 * @Purpose : Insert Data into collection
 * @param createDbCB
 */
dbOperation.prototype.createDb = function(createDbCB){

	console.log("In createDb fun");
	db.connect('mongodb://localhost:27017/studentDb',function(dbConnObj){
		
		var collection = dbConnObj.collection('studentData');
		var _studentObj = [ { id : 1 ,name : 'Anuja' , pwd : 'anuja'},
		                   {id : 2 ,name : 'Ash' , pwd : 'ash'},
		                   {id : 3 , name  : 'Samhita' ,pwd : 'samhita'},
		                   {user : 'admin' ,name : 'admin', pwd :'admin' }];
		collection.insertMany(_studentObj, function(err, result){
	    	if(!err){
	    		 db.close(dbConnObj,function(){
	    			 createDbCB(); 
			      });
	    	}
	     });
	});
	
	
};

/**
 * @author apandit
 * @Purpose : to read records from collections
 * @param updateDbCB
 */

dbOperation.prototype.fetchDataDb = function(param,fetchDataDbCB){
	db.connect('mongodb://localhost:27017/studentDb',function(iDbConn){
		 if(iDbConn){
			 
			 var collection = iDbConn.collection('studentData');
			 collection.find(param).toArray(function (err, result) {
				 if(!err && result.length > 0){
					 db.close(iDbConn,function(){
						 if(fetchDataDbCB){
							 return fetchDataDbCB(null,result); 
						 }
						
				     });
				 }else{
					 var _errorMsg = 'Data is not authenticated';
					 db.close(iDbConn,function(){
						 if(fetchDataDbCB){
							 return fetchDataDbCB(_errorMsg,null); 
						 }
				     });
				 }
				 
			 });
			 
		 }
		 
	 });
};

/**
 * @author apandit
 * @Purpose : to update records from collections
 * @param updateDbCB
 */

dbOperation.prototype.updateDb = function(updateDbCB){

	 console.log("In updateDb of dbOperation");
	 db.connect('mongodb://localhost:27017/studentDb',function(iDbConn){
		 if(iDbConn){
			 var collection = iDbConn.collection('studentData');
			 collection.updateOne({id : 3 , name  : 'Samhita' , pwd : 'samhita'}
			    , { $set: {id : 3 , name  : 'Amruta' ,  pwd : 'amruta'} }, function(err1, result1) {
			    	if(!err1){
			    		 db.close(iDbConn,function(){
			    			 updateDbCB();
				    	 });
			    	}else{
			    		db.close(iDbConn,function(){
			    			updateDbCB();
				    	});
			    	}
			   
			  });
		 }
		 
	 });
};

/**
 * @author apandit
 * @purpose : to delete record from collection
 * @param deleteDbCB
 */

dbOperation.prototype.deleteDb = function(deleteDbCB){
	 db.connect('mongodb://localhost:27017/studentDb',function(iDbConn){
		
		 if(iDbConn){
			 var collection = iDbConn.collection('studentData');
			 collection.deleteOne({ id : 3 ,name : 'Amruta'}, function(err2, result2) {
				 if(!err2){
					 db.close(iDbConn,function(){
						 deleteDbCB(); 
				      });
				 }		
				 
			 });
		 }
	 });
};




/*
var _dbOprnObj = new dbOperation();
_dbOprnObj.deleteDb(function(){
	
});*/


exports.dbOperation= dbOperation;
