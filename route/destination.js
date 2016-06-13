var fs = require('fs');
var js2xmlparser = require('js2xmlparser');
var logger = require('./logger').Logger();
var db = require('../dbConnection');

function destination(){
	
}

destination.prototype ={
		constructor : destination
};


/**
 * @purpose : ReadFile source.json file
 * @param readJsonFileCB
 */
destination.prototype.readJsonFile = function(readJsonFileCB){
	logger.debug("In readJsonFile of Destination.js");
	var _jsonObj =null,_jsonObjFlag =null;
	fs.stat('source.json', function(err, stat) {
		if(!err){
			logger.debug("Source.json file found!!");
			//Read source.json file
			fs.readFile('source.json', 'utf8', function (error, data) {
				 if(!error){
					try{
						 _jsonObj = JSON.parse(data);
						 
					 }catch(e){
						 logger.error("Source.json file does not contain vallid json object");
					 }
						// var _jsonObjFlag  = null;
						 
						 //To check each object has vallid score property
						 for(var a = 0 ; a < _jsonObj.students.length ; a++){
							 if(_jsonObj.students[a].hasOwnProperty('score') == true){
								 _jsonObjFlag = true;
							}else{
								 _jsonObjFlag  = false;
								 logger.error("Json object don't have score property");
							 }
						 }
						 
						 if(_jsonObjFlag == true && readJsonFileCB){
							 console.log("In this",_jsonObj);
							return readJsonFileCB(_jsonObj);
						  }
						
					
				 }else{
					 logger.error("Error while reading source.json file.");
				 }
				 
			});
		}else{
			logger.error("Source.json file not found!!");
		}
	});
	
};
/**
 * @purpose : Sort object records using scores in text file
 * @param readJsonFileCB
 */
destination.prototype.sortRecords = function(sortRecordsCB){
	var _that = this;
	_that.readJsonFile(function(JsonObj){
		var _jsonObjArr = JsonObj.students;
		//Sort data according to score
		_jsonObjArr.sort(function(a,b){
			return b.score - a.score;
		});
		
		if(sortRecordsCB){
			return sortRecordsCB(_jsonObjArr);
		}
	});
	
};
/**
 * @purpose :Write records in destination file
 * @param writeFileCB
 */

destination.prototype.writeTxtFile = function(writeFileCB){
	var _that = this;
	
	_that.sortRecords(function(SortedJsonObj){
		//Check destination.txt file already exists
		fs.stat('../destination.txt', function(err, stat) {
			if(!err){
				logger.error("destination.txt file already exists");
			}else{
				//Insert data in mongodb
				db.connect('mongodb://localhost:27017/mydatabase',function(dbObj){
				    	var collection = dbObj.collection('records');	
					    collection.insertMany(SortedJsonObj, function(err, result) {
					    						    
					    });
				 });
				
				
				//create text file
				var data = null;
				var _exeRec = function(iReadObj,iIndex){
					
					console.log("In _exeRec of destination.js");
					var _parserObj = (js2xmlparser("student",iReadObj[iIndex] ));
					if(iIndex == 0){
						data = 'Id|First Name|Last Name|Score' +"\n"+	iReadObj[iIndex].id + '|' +iReadObj[iIndex].fname + '|' +iReadObj[iIndex].IName + '|' + iReadObj[iIndex].score;
				    }else{
						data = "\n" + iReadObj[iIndex].id + '|' +iReadObj[iIndex].fname + '|' +iReadObj[iIndex].IName + '|' + iReadObj[iIndex].score;
					}
					fs.appendFile("../destination.txt", data ,function(err){
						    if(!err){
						    	_that.writeXmlFile(_parserObj,function(){
						    		iIndex++;
									if(iIndex < (iReadObj.length)){
										_exeRec(iReadObj,iIndex);
									}else{
										console.log("Doneeeeeeeeeeeeeeee");
									}
						    	});
						    	
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
	
	
};
/**
 * @purpose : Sort object records using scores in xml file
 * @param readJsonFileCB
 */

destination.prototype.writeXmlFile = function(parserObj,writeXmlFileCB){
	//var _parserObj = (js2xmlparser("student",JsonObj));
	fs.appendFile('../destination.xml',parserObj,function(error){
		if(!error){
			  if(writeXmlFileCB){
				  return writeXmlFileCB();
			  }
			
		}else{
			 if(writeXmlFileCB){
				  return writeXmlFileCB();
			  }
		}
		
	});
};




/*
var _newDestiObj  = new destination();
_newDestiObj.writeTxtFile();*/


exports.destination = destination;

