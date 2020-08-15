//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");

const app=express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));


mongoose.connect("mongodb://localhost:27017/clientDB",{useNewUrlParser: true});

const clientSchema={
  email:String,
  password:String
};

const Client = new mongoose.model("Client",clientSchema);

app.get("/",function(req,res){
  res.render("home");
});


app.get("/login",function(req,res){
  res.render("login");
});


app.get("/register",function(req,res){
  res.render("register");
});

app.get("/index",function(req,res){
  res.render("index");
});

app.get("/game",function(req,res){
  res.render("game");
});

app.get("/end",function(req,res){
  res.render("end");
});


app.post("/register",function(req,res){
  const newClient=new Client({
    email:req.body.username,
    password:req.body.password
  });
  newClient.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("login");
    }
  });
});

app.post("/login",function(req,res){
  const username=req.body.username;
  const password=req.body.password;

  Client.findOne({email:username},function(err,foundClient){
    if(err){
      console.log(err);
    }else{
      if (foundClient){
        if(foundClient.password===password){
          res.render("home");
        }
      }
    }
  });
});



app.listen(3000,function(){
  console.log("server has started on port 3000.");
});
