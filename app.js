const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const request = require("request");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(3000,function(){
console.log("The server is running on the port: 3000");
});
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
    var name = req.body.name;
    var email = req.body.Email;
    console.log(name+ " " + email);
});
