var async = require('async');
var fs = require('fs');
var js2xmlparser = require('js2xmlparser');
var logger = require('./logger').Logger();
var destiFile = require('./destination').destination;
var destiObj = new destiFile();


function asyncOpertion(){
	
}

asyncOpertion.prototype ={
		constructor : asyncOpertion
};

/**
 * @purpose : write txt file
 * @param writeTxtFileCB
 */

asyncOpertion.prototype.writeTxtFile = function(writeTxtFileCB){
	try{
		destiObj.sortRecords(function(SortedJsonObj){
			fs.stat('../destination.txt', function(err, stat) {
				if(!err){
					logger.error("destination.txt file already exists");
				}else{
					//create text file
					var data = null;
					var _exeRec = function(iReadObj,iIndex){
						
						console.log("In _exeRec of destination.js");
						if(iIndex == 0){
							data = 'Id|First Name|Last Name|Score' +"\n"+	iReadObj[iIndex].id + '|' +iReadObj[iIndex].fname + '|' +iReadObj[iIndex].IName + '|' + iReadObj[iIndex].score;
					    }else{
							data = "\n" + iReadObj[iIndex].id + '|' +iReadObj[iIndex].fname + '|' +iReadObj[iIndex].IName + '|' + iReadObj[iIndex].score;
						}
						fs.appendFile("../destination.txt", data ,function(err){
							    if(!err){
							    	iIndex++;
									if(iIndex < (iReadObj.length)){
										_exeRec(iReadObj,iIndex);
									}else{
										//console.log("Doneeeeeeeeeeeeeeee");
										return writeTxtFileCB();
									}
						    	
							    		
							    }else{
							    	logger.error("Unable to write in destination.txt");
							    }
								
						});
						
						
					};
					if(SortedJsonObj.length > 0){
						_exeRec(SortedJsonObj,0);
					}
					
					
				}
				
			});
	  });
	}catch(e){
		logger.error("Exception catched in writeTxtFile"+e);
	}
	
};
/**
 * @purpose : Write xml file
 * @param writeXmlFile
 */
asyncOpertion.prototype.writeXmlFile= function(writeXmlFile){
	//console.log("In asyncOpertion writeXmlFile");
	destiObj.sortRecords(function(SortedJsonObj){
		 var _parserObj = (js2xmlparser("student",SortedJsonObj[0] )) + (js2xmlparser("student",SortedJsonObj[1] )) + (js2xmlparser("student",SortedJsonObj[2] ));
		 destiObj.writeXmlFile(_parserObj,function(){
			  return writeXmlFile();
		 });
	 });
};

/**
 * @purpose : Async series operation call
 * @param doSeriesCB
 */
asyncOpertion.prototype.doSeries = function(doSeriesCB){
			var _that =this;
			//Async Series operation call
			async.series([
			              //Call writeTxt file fun
			               function (next) {
			            	  console.log("In 1st fun");
			            	 _that.writeTxtFile(function(){
			            		next();
			            		
			            	 });
			               },
			            //Call writeXml file fun
			              function (next) {
			            	  console.log("In 2nd fun");
			            	  _that.writeXmlFile(function(){
			            		  next();
			            	  });
			              }
		    ],function(error,results){
					return doSeriesCB();
			  });
		
};

/**
 * @purpose : Async parallel operation call
 * @param doSeriesCB
 */

asyncOpertion.prototype.doParallel = function(doParallelCB){
		   var _that = this;
		   async.parallel([
				//Call writeTxt file fun
				function (next) {
					  console.log("In 1st fun");
					 _that.writeTxtFile(function(){
						next();
						
					 });
				},
				//Call writeXml file fun
				function (next) {
					  console.log("In 2nd fun");
					  _that.writeXmlFile(function(){
						  next();
					  });
				}
			     		
			  ],function(error,results){
			     	return doParallelCB();
			  });
	
};


exports.asyncOpertion = asyncOpertion;
