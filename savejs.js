var express = require("express");
var app     = express();
var path    = require("path");
var pg = require('pg');
var knex = require('knex');
var alert=require('alert-node');
var http = require("http"); 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')

var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'test',
    database : 'chat'
  }
});

app.get('/',function(req,res){
   res.sendFile(path.join(__dirname+'/index3.html'));
});


app.post('/submit',function(req,res){
	var uname=req.body.username;
	var pname=req.body.password;
	console.log(uname,pname);
	db.select('id').from('users').where({email:uname,password:pname,status:'true'})
	.then(data=>{
		console.log(data);
		if(data[0]){
			var id=data[0].id;
			var d=new Date();
			db('checkuser').insert({id:id,email:uname,date:d}).then(console.log)
			console.log("success");
			res.sendFile(path.join(__dirname+'/groupchat.html'));
		}else{
			console.log("going to success");
			alert("Please Enter Correct Details"); 
				  // res.writeHead(200, {"Content-Type": "text/html"}); 
				  // res.write( 
				  // "<!DOCTYPE html>" + 
				  //   "<body>" + 
				  //     "<script type='text/javascript'>alert('Hello World')</script>" + 
				  // "</body>" + 
				  // "</html>"); 
				  // res.end(); 
		}
	})
});

app.post('/submit2',function(req,res){
	var uname2=req.body.usernamesignup;
	var email=req.body.emailsignup;
	var pname2=req.body.passwordsignup;
	var phno=req.body.Phone;
	console.log(uname2,pname2,email,phno);

	db('users').insert({uname:uname2,email:email,password:pname2,phno:phno}).then(console.log)
});

app.listen(3000);
console.log("Running at Port 3000");