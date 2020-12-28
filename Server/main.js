let express = require("express");
var bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.text());// for parsing application/plain text

app.use(express.static("FrontEnd"));
app.engine('html', require('ejs').renderFile);

var port = 1234;
var text;

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
});

app.post("/",function(req,res){
    //handle data recieving and saving from esp (still missing data sending in that part)
    text = req.body;
    console.log("data recieved");
    res.end();
});

app.get("/", function(req,res){
    //show data to user entering via web browser, won't be using get in esp
    setInterval(() => {
        res.render("main.html", {text: text}); 
    },1000);


});