function source(){
	
}

source.prototype ={
		constructor : source
};

source.prototype.getJsonObj = function(getJsonObjCB){
	var _newJsonPbj = {
			students : [{
					"id" : 123,
			        "fname" : "John",
			        "IName" : "Doe",
			        "score" : 234
			},{
				"id" : 124,
		        "fname" : "Jane",
		        "IName" : "Doe",
		        "score" : 543
			},{
				"id" : 125,
		        "fname" : "Jackie",
		        "IName" : "Doe",
		        "score" : 453
			}
			            
			       
			            
	  ]
	};
	
	getJsonObjCB(_newJsonPbj);
	
	
	
};


exports.source = source;