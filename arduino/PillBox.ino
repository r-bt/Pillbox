#include <Adafruit_NeoPixel.h>
#include <Arduino_JSON.h>
#include <WiFi.h>
#include <HTTPClient.h>
const char* ssid = "MIT";

String serverName = "https://us-central1-pillbox-7c41a.cloudfunctions.net/";
String updateStatus = serverName + 'updateStatus';

String currentStatus;
int lastPing;

#define numpixels 10
#define pixelPin 15
#define DELAYVAL 500
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(numpixels, pixelPin, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  pixels.begin();
}

void loop() {
  if (millis() - 10000 > lastPing) {
    getStatus();
  }
  JSONVar myObject = JSON.parse(currentStatus);
  pixels.clear(); // Set all pixel colors to 'off'
//  const char* dayStatus = ;
  if (bool(myObject["status"])) {
   pixels.setPixelColor(int(myObject["day"]), pixels.Color(0, 150, 0));
  } else {
    pixels.setPixelColor(int(myObject["day"]), pixels.Color(150, 0, 0));
  }
  pixels.show();
}

void updateTime() {

}

void getStatus() {
  String path = serverName + "status";
  currentStatus = httpGETRequest(path.c_str());
  lastPing = millis();
}

String httpGETRequest(const char* serverName) {
  HTTPClient http;

  // Your IP address with path or Domain name with URL path
  http.begin(serverName);

  // Send HTTP POST request
  int httpResponseCode = http.GET();

  String payload = "{}";

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}
