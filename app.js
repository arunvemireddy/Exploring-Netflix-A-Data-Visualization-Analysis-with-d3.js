const express = require("express");
const app = express();
const fs = require('fs');
const url = "mongodb://localhost:27017";
const dbName = "Netflix_Database";
const collectionName ="Netflix";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
let collection;



app.use(express.static('front-end/arun'));


//database connection
app.listen(3000,()=>{console.log("Server is running")
client.connect(function (err){
    if(err) throw err;
    console.log("connected to db");
    db = client.db(dbName);
    collection = db.collection(collectionName);
    //console.log(collection);
    })
});

// mapvis - arun
app.get('/map',function(req,res){
    fs.readFile("front-end/arun/arun.html",(err,data)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(data);
    })
})

// get countries from database - arun
app.get('/getCountries',(req,res)=>{
    collection.find({},{projection:{country:1}}).toArray(function(e,r){
      if(e) throw e;
      res.send(r);
    })
});

