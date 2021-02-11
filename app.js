const experss = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https =require("https");
const app = experss();
app.use(experss.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
var subscribed=subscribed;
app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
 app.post("/",function(req,res){
  var firstName = req.body.fName;
  var seconedName = req.body.sName;
  var email = req.body.emailInput;
  const data = {
      members: [
          {
          email_address: email,
          status: subscribed,
          merge_fields: {
              Fname: firstName,
              Lname: seconedName
          }
        }
      ]
  };
  const jsonData =JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/1effbef8be";
  const options = {
      method :"POST",
      auth: "shivam:2acb72b3386bf36a83610c2c0e87c923-us10"
  }
  const request= https.request(url,options,function(response){
       response.on("data",function(data){
           if(response.statusCode==200){
         
           res.sendFile(__dirname+"/success.html");  
        }
         else{
          
           res.sendFile(__dirname+"/success.html");  
         }
           console.log(JSON.parse(data));
       })
  })

 request.write(jsonData);
 request.end();
     
 });
 app.post("/faliure",function(req,res){
     res.redirect("/");
 });

app.listen(process.env.PORT || 3000,function(){// this process.env.PORT allows the 
    //browser to choose the port dynamically.
    console.log("Server is runnig on port 3000");
});


//API key
//2acb72b3386bf36a83610c2c0e87c923-us10
// List id
//1effbef8be