let express = require("express");
var bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var port = 1234;
var text;

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
});

app.post("/",function(req,res){
    //handle data recieving and saving from esp (still missing data sending in that part)
    text = req.body;
    res.end();
});

app.get("/",function(req,res){
    //show data to user entering via web browser, won't be using get in esp
    res.send(`data is: ${text}`);
});