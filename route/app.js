var asyncFileObj = require('./asyncOperations').asyncOpertion;
var _asyncFile = new asyncFileObj();

function app(){
	
}

app.prototype ={
		constructor : app
};

app.prototype.doSeriesOpr= function(){
	//console.log("In doSeriesOpr");
	_asyncFile.doSeries(function(){
		console.log("Succesfully write file");
	});
};


app.prototype.doParallelOpr= function(){
	//console.log("In doSeriesOpr");
	_asyncFile.doParallel(function(){
		console.log("Succesfully write file");
	});
};


var _appObj = new app();
//call to series opr
_appObj.doSeriesOpr();
//call to parllel opr
//_appObj.doParallelOpr();


exports.app = app;











