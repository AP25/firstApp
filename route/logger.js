var winston = require('winston');
function Logger(){
	
	var logger = new (winston.Logger)({
		exitOnError : false,
		transports : [
			new (winston.transports.File)({
					filename : '../logs/info.log' ,
				    name : 'file.info',
				    level : 'info',
				    maxsize : 1024*1024*10,
				    json : false,
				    handleExceptions : true
			   }),
			   new (winston.transports.File)({
				   filename : '../logs/debug.log'  ,
				   name : 'file.debug',
				   level : 'debug',
				   maxsize : 1024*1024*10,
				   json : false,
				   handleExceptions : true
				  
			   }),	
			   new (winston.transports.File)({
				   filename : './logs/error.log'  ,
				   name : 'file.error',
				   level : 'error',
				   maxsize : 1024*1024*10,
				   json : false,
				   handleExceptions : true
				  
				}),
				 new winston.transports.Console({
				      handleExceptions: true,
				      
				  }),
				 new (winston.transports.File)({
					   filename : './logs/warn.log'  ,
					   name : 'file.warn',
					   level : 'warn',
					   maxsize : 1024*1024*10,
					   json : false,
					   handleExceptions : true
					  
				}),
					
				
				
				
				
        ]}); 
	
	return logger;
}

exports.Logger = Logger;

