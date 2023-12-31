const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public")); //Uploading the static files for .css and .js to work on server.

app.get("/new", function(req, res){
    res.sendFile(__dirname + "/login.html")
})

app.post("/", function(req, res){
    var email = req.body.email
    var fname = req.body.fname
    var lname = req.body.lname


    var myData = {  
        members: [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
            
        ]
    }   

    var myJsonData = JSON.stringify(myData);

    


    var options = {
        url : "https://us17.api.mailchimp.com/3.0/lists/55de5f5c28",
        method : "POST",
        headers: {
            "Authorization": "sankalp *AuthToken*"
        },
        body: myJsonData

    }


    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname+ "/failure.html")
        }
        else{
            if(response.statusCode==200){
                res.sendFile(__dirname+ "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })

})

app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
    console.log(__dirname + "/login.html");
})


/* 

API Key : *API Key*
API List : 55de5f5c28

*/