const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const app = express()

app.use (cors())
app.use (express.json())

mongoose.connect("mongodb+srv://YOUR_NEW_USERNAME:YOUR_NEW_PASSWORD@cluster0.y11kodt.mongodb.net/passkey?appName=Cluster0").then(function(){
  console.log("connected to DB")
})

const credential = mongoose.model("credential", {},"bulkmail")

credential.find().then(function(data){

console.log(data[0].toJSON())
});
//Install NODEMAILER

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        // TODO: replace 'user' and 'pass' values from <https://forwardemail.net>
        user: "yourgmail@gmail.com",
        pass: "your_app_password",
    },
});
app.post("/sendmail",function(req,res){
    var msg = req.body.msg;
    var emaillist = req.body.emaillist;

    for(var i=0;i<emaillist.length;i++)
    {
       transporter.sendMail({
    from:"sribavadharani201@gmail.com",
    to:emaillist[i],
    subject: "A message from bulkmail app",
    text:msg
       
},
    
 

function(error,info){
    if(error)
    {
     console.log(error)
     res.send(false)
    }
    else{
     console.log(info);
    }
});
    }
     res.send(true)  
    
});




app.listen(5000,function(){
    console.log("Server Started.......");
});