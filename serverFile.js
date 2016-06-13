var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authObj = require('./route/auth').auth;
var authFile = new authObj();
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();

//For serving static files
app.use(express.static('views'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.listen(3000,function () {
  console.log('Example app listening on port 3000!');
});


app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: false,
    resave: false,
   
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

/**
 * @author apandit
 * @purpsoe : To authenticate entered user and
 */
app.post('/loginForm', function(req, res) {
		
	 if (req.session.UserName) {
		 if(req.session.UserName != 'admin'){
			 res.redirect('/user.html');
		 }else{
			 res.redirect('/admin.html');
		 }
	}else{
		var _vallidateObj = {
		    		UserName : req.body.UserName,
		    		Password : req.body.Password
		     };
		   
		    authFile.authenticateDataFromDb(_vallidateObj,function(Error,AuthSuccess){
		    	if(!Error){
		    		 
		    		req.session.UserName = req.body.UserName;
		    		if(AuthSuccess[0].user){
		    			 res.redirect('/admin.html');
		    		 }else{
		    			 res.redirect('/user.html');
		    		 }
		    		
		    	}else{
		    		res.redirect(401, '/login.html');
		    	}
		    	
		    });
	}
	
  
});

/**
 * @author apandit
 * @purpose : To destroy express session
 */


app.get('/logout',function(req,res){
	req.session.destroy(function(err){
        if(err){
            res.send(301);
        }else{
             //	res.clearCookie('connect.sid');
        	res.send(301);
        }
    });
	
});



