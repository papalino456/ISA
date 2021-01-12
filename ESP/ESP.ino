#include <HTTPClient.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <WiFi.h>

//pin variables
const int humSensor = 35;
const int tempSensor = 12;

//variables setup
float tempVal;
float humVal;

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

    //release resources
    http.end();
  }
  else {
    Serial.println("not connected");
  }

  delay(500);
  
}
 
