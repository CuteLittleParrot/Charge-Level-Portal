#include <SPI.h>
#include <WiFiS3.h>
#include <ArduinoHttpClient.h>

const char* ssid = "ZeenykPhone";
const char* password = "";
const char* server = "charge-level-portal.duckdns.org";
const int port = 80;

const int pinvoltage = 0;
WiFiClient wifi;
HttpClient client = HttpClient(wifi, server, port);

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  Serial.print("Connessione Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connesso.");
}

void sendData(float voltage, float current, float windIntensity, String windDirection) {
  String postData = "voltage=" + String(voltage) +
                    "&current=" + String(current) +
                    "&windIntensity=" + String(windIntensity) +
                    "&windDirection=" + windDirection;

  client.beginRequest();
  client.post("/api.php");
  client.sendHeader("Content-Type", "application/x-www-form-urlencoded");
  client.sendHeader("Content-Length", postData.length());
  client.sendHeader("Connection", "close");
  client.beginBody();
  client.print(postData);
  client.endRequest();

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status Code: ");
  Serial.println(statusCode);
  Serial.print("Risposta del server: ");
  Serial.println(response);
}

void loop() {
  float voltage = (float)analogRead(pinvoltage) * (25.0 / 1023.0);
  float current = ((float)analogRead(pinvoltage) + (float)analogRead(pinvoltage) / 6.0) * (7.0 / 1023.0);
  int wind = rand() % 15 + 1;
  sendData(voltage, current, wind, "NE");

  delay(60000); // ogni 60 secondi
}
