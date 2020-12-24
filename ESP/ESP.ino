#include "DallasTemperature.h"
#include "OneWire.h"

//pin variables
humSensor = A1;
tempSensor = 12;

//variables setup
float tempVal;
float humVal;

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
}

void loop(){

  // Get temperature values
  temperature.requestTemperatures();
  tempVal = temperature.getTempCByIndex(0);
  
  // Get humidity values
  humVal = analogRead(A1);

  // Print to serial port
  Serial.print("Temperature: ");
  Serial.println(tempVal);
  Serial.print("Humidity: ");
  Serial.println(humVal);
}
 