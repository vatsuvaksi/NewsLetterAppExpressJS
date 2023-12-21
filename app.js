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
    var data ={                                      // This object was created to send the data through api and it was in the Documentation
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
    var jsonData = JSON.stringify(data);             //used to stringify the Json object
    const url="https://us1.api.mailchimp.com/3.0/lists/0cf7c7bdd5";             // personal key
    const options={                                                      //Api documentation options had method + authentication
        method : "POST",
        auth : "vatsuvaksi"
    }
   const request =  https.request(url,options, function(response){   //This is where the request is generated https functions
    if(response.statusCode === 200){                      //checkes the status code to send a particular file success or fail html 
        res.sendFile(__dirname +"/success.html")
    }  else{
        res.sendFile(__dirname +"/failure.html")
    }

    response.on("data",function(data){                         //Whenever we receive data response.on("data",call back function is used)
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});



