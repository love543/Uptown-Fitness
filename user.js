const express = require("express");
const db = require("./routes/dbcon");
const bodyParser = require("body-parser");
const app = express();
const encoder = bodyParser.urlencoded({ extended: true });
const router = express.Router();
var user_idstu=0;
var user_idpro=0;
const session = require('express-session');



app.use(express.static(__dirname + '/public'));
app.use( "/css" ,express.static(__dirname + './public/css'));
app.use( "/htmlfiles" ,express.static(__dirname + './public/htmlfiles'));
app.set("view engine", "ejs");
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/htmlfiles/student.html");
})
 

app.post("/professor",encoder, function(req,res){
  var username_pr = req.body.username_pr;
  var password_pr = req.body.password_pr;
  db.query("select * from member where email  = ? and password = ?",[username_pr,password_pr],function(error,results,fields){
      if (results.length > 0) {
        req.session.user_idpro = username_pr;
          res.redirect("/teacherhomepage");
      } else {
          res.send(
              '<script>alert( "Invalid username or password"); window.location.href="/";</script>'
            );
      } 
  })
})


app.post('/member_s',encoder, (req, res) => {
  var user_name= req.body.username;
    var  email= req.body.email_st;
    var  password_st= req.body.password_st;
    console.log('Class Name: ' + user_name);
    console.log('Class Section: ' + email);
    console.log('Class password_st: ' + password_st);


  const query = `INSERT INTO member (mname, email, password) VALUES ( ?, ?, ?)`;
  db.query(query, [user_name, email, password_st], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.sendStatus(500);
    } else {
      console.log('Data inserted into database');
      res.redirect("/teacherhomepage");
    }
  });
});
app.get("/studenthomepage",function(req,res){
 


  db.query("SELECT * FROM newstuclass", [req.session.classcode], function(err, results, fields) {
    if (err) {
      console.log('Error retrieving data from SQL table:', err);
      res.send('Error retrieving data from SQL table.');
    } else {
      var x = results.length;
       res.render('studenthomepage', { user: results , x: x});
    }
  });
})




app.post("/professor",encoder, function(req,res){
    var username_pr = req.body.username_pr;
    var password_pr = req.body.password_pr;
    db.query("select * from Instructors where email_id  = ? and password = ?",[username_pr,password_pr],function(error,results,fields){
        if (results.length > 0) {
          req.session.user_idpro = username_pr;
            res.redirect("/teacherhomepage");
        } else {
            res.send(
                '<script>alert( "Invalid username or password"); window.location.href="/";</script>'
              );
        } 
    })
})


app.get("/teacherhomepage",function(req,res){
  db.query("SELECT * FROM newclass", [req.session.classname], function(err, results, fields) {
    if (err) {
      console.log('Error retrieving data from SQL table:', err);
      res.send('Error retrieving data from SQL table.');
    } else {
      var x = results.length;
       res.render('teacherhomepage', { user: results , x: x});
    }
  });
})









app.listen(5222);