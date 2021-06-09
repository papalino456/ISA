setInterval(function() {

    console.log("button clicked");
    //repeat for more data changing
    //temperature
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("title").innerText = JSON.parse(this.responseText).temp;
        }   
    };
    xhttp.open("GET", "/data", true);
    xhttp.send();*/
    //up to here

    //humidity
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("title2").innerText = JSON.parse(this.responseText).hum;
        }   
    };
    xhttp2.open("GET", "/data", true);
    xhttp2.send();

    //water level
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("stateMsg").innerText = JSON.parse(this.responseText).msg;
        }   
    };
    xhttp3.open("GET", "/msg", true);
    xhttp3.send();

    //weather
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("weather").innerText = JSON.parse(this.responseText).current.weather[0].main;
        } 
    };
    var lat = 19.48;
    var lon = -99.22;
    var APIkey = "72b9eb3bfe73b63697caed06c9f924f8"
    xhttp4.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${APIkey}&units=metric`, true);
    xhttp4.send();
},5000);