#include <HTTPClient.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <WiFi.h>

//pin variables
const int humSensor = 35;
const int waterSensor = 12;
const int tempSensor = 13;
const int led1 = 25;
const int led2 = 26;
const int led3 = 27;
const int pumpPin = 14;

//variables setup
float tempVal;
float humVal;
bool bEnoughWater;

//connection variables
const char* ssid = "HALL9000";
const char* password = "ANIROC1966";
const char* server = "http://192.168.100.35:1234/";

//Temperature sensor setup --DS18B20--
OneWire sensor(tempSensor);
DallasTemperature temperature(&sensor);
//------------------------------------

void setup(){

  //Humidity sensor
  pinMode(humSensor, INPUT);

  //Temperature sensor
  pinMode(tempSensor, INPUT);

  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }
  Serial.print("connected!, ip:");
  Serial.println(WiFi.localIP());
  digitalWrite(led1, HIGH);
  
}

void loop(){

  // Get temperature values
  temperature.requestTemperatures();
  tempVal = temperature.getTempCByIndex(0);
 
  // Get humidity values
  humVal = map(analogRead(humSensor),1700,4095,100,0);

  // Print to serial port
  Serial.print("Temperature: ");
  Serial.println(tempVal);
  Serial.print("Humidity: ");
  Serial.print(humVal);
  Serial.println("%");

  //Send to server via http post command
  if(WiFi.status() == WL_CONNECTED) {
    //begin conection to server
    HTTPClient http;
    http.begin(server);

    //specify content type
    http.addHeader("Content-Type", "application/json");

    //data send
    int httpResCode = http.POST("{\"temp\":\"" + String(tempVal) + "\",\"hum\":\"" + String(humVal) + "\"}");

    //await response code (200 ok, 404 not found, etc...)
    Serial.print("HTTP Response code: ");
    Serial.println(httpResCode);

    //check water level, turn on state LED and send message to server
    if(analogRead(waterSensor) <= 10){
      digitalWrite(led3, HIGH);
      bEnoughWater = false;
      http.begin(server + "msg")
      http.addHeader("Content-Type", "text/plain");
      int httpResCode2 = http.POST("Low water please refill");
    }

    //check water level, turn off state LED and send message to server
    if(analogRead(waterSensor) >= 10){
      digitalWrite(led3, LOW);
      bEnoughWater = true;
      http.begin(server + "msg")
      http.addHeader("Content-Type", "text/plain");
      int httpResCode2 = http.POST("");
    }

    //turn on pump and state led's for watering
    if(((humval <= 25 && tempVal >= 15)||(tempVal >= 25 && humVal <= 40)||(tempVal >= 35)) && (bEnoughWater == true)){
      digitalWrite(pumpPin, HIGH);
      digitalWrite(led2, HIGH);

      delay(2000);

      digitalWrite(pumpPin, LOW);
      digitalWrite(led2, HIGH);

    }


    //release resources
    http.end();
  }
  else {
    Serial.println("not connected");

    //check water level, turn on state LED and send message to server
    if(analogRead(waterSensor) <= 10){
      digitalWrite(led3, HIGH);
      bEnoughWater = false;
    }

    //check water level, turn off state LED and send message to server
    if(analogRead(waterSensor) >= 10){
      digitalWrite(led3, LOW);
      bEnoughWater = true;
    }

    //turn on pump and state led's for watering
    if(((humval <= 25 && tempVal >= 15)||(tempVal >= 25 && humVal <= 40)||(tempVal >= 35)) && (bEnoughWater == true)){
      digitalWrite(pumpPin, HIGH);
      digitalWrite(led2, HIGH);

      delay(2000);

      digitalWrite(pumpPin, LOW);
      digitalWrite(led2, HIGH);

    }

  }

  delay(500);
  
}
 
