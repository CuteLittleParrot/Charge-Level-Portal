#include <SPI.h>
#include <WiFiS3.h>
#include <ArduinoHttpClient.h>

// Dati Wi-Fi
const char* ssid = "ZeenykPhone";
const char* password = "B3l1m4nF0rd28!";

// URL del server remoto (modifica se necessario)
const char* server = "80.117.95.166";  // Dominio o IP pubblico del server
const int port = 80;  // Porta HTTP standard

const int pinvoltage = 0;
int pincurrent;
int pinwind;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, server, port);

void setup() {
  Serial.begin(9600);

  Serial.println("Connessione al Wi-Fi in corso...");
  WiFi.begin(ssid, password);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnesso al Wi-Fi");
    Serial.print("Indirizzo IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nErrore nella connessione Wi-Fi.");
    while (true);
  }
}

void sendData(float voltage, float current, float windIntensity, String windDirection) {
  if (WiFi.status() == WL_CONNECTED) {

    // Costruisci il corpo della richiesta POST
    String postData = "voltage=" + String(voltage) +
                      "&current=" + String(current) +
                      "&windIntensity=" + String(windIntensity) +
                      "&windDirection=" + windDirection;

    Serial.println("Invio dati al server...");

    client.beginRequest();
    client.post("/api.php");  // Assicurati che il file api.php sia nella root del tuo server
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

    if (statusCode == 200) {
      Serial.println("Dati inviati con successo.");
    } else {
      Serial.println("Errore nell'invio dei dati.");
    }
  } else {
    Serial.println("Errore di connessione Wi-Fi.");
  }
}

void loop() {
  float voltage = (float)analogRead(pinvoltage) * (25.0/1023.0);
  float current = ((float)analogRead(pinvoltage) + (float)analogRead(pinvoltage)/6.0) * (7.0/1023.0);
  int wind = rand() %15 +1;
  sendData(voltage, current, wind, "NE");
  delay(59000);  // Invia ogni 60 secondi
}
