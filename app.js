const express = require("express");              //Loads the Express framework
const app = express();                           // Creates an app using express
const bodyParser = require("body-parser");      // imports the body-parser from node modules
const request = require("request");
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));   // used for body parsing 
app.use(express.static("public"));                      //IMPORTANT -- used to take the static files such as CSS and images through this directory 
app.listen(3000,function(){                                    // adds local host 3000 as the port
console.log("The server is running on the port: 3000");
});
app.get("/",function(req,res){                                 //Get method is used to send the HTML file to the client side
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){                 // Post method is used to retrieve the data from the form 
    var name = req.body.name;
    var email = req.body.Email;
    console.log(name+ " " + email); 
    var data ={
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields:{
                    FNAME : name
                }
          }
    ]
    };
    var jsonData = JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/0cf7c7bdd5";
    const options={
        method : "POST",
        auth : "vatsuvaksi:eb560156bf8438f0ff10b962ef68f0a2-us1"
    }
   const request =  https.request(url,options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});



/*API KEY

eb560156bf8438f0ff10b962ef68f0a2-us1

Unique Id
0cf7c7bdd5
*/