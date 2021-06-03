let express = require("express");
var bodyParser = require('body-parser');
const { static } = require("express");
let app = express();

app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.text());// for parsing application/plain text

app.use(express.static('views'));

var port = 1234;
var text;
var stateMsg;

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at port ${port}`);
});

app.post("/",function(req,res){
    //handle data recieving and saving from esp
    text = req.body;
    console.log("data recieved");
    console.log(req.body)
    res.end();
});

app.post("/msg", function(req, res){
    stateMsg = req.body;
    console.log("msg recieved")
    console.log(stateMsg)
    res.end();
});

app.get("/msg",function(req, res){
    res.send(stateMsg);
});

app.get("/data",function(req, res){
    res.send(text);
});

app.get("/", function(req,res){
    //show data to user entering via web browser, won't be using get in esp
    res.sendFile(__dirname + '/views/main.html'); 
    console.log("get request made")
});