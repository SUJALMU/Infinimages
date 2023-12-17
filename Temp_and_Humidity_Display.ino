#include <LiquidCrystal.h>  // Include LiquidCrystal Library
#include <dht.h>   // Include DHTlib Library- Download from Description.

#define outPin 2

LiquidCrystal lcd(7, 8, 9, 10, 11, 12); // Create an LCD object.
dht DHT;    // Create a DHT object

void setup() {
  lcd.begin(16,2); // Initialize the LCD
}

void loop() {
  int readData = DHT.read11(outPin);
  
  float t = DHT.temperature;
  float h = DHT.humidity;
  
  lcd.setCursor(0,0);
  lcd.print("Temp.: ");
  lcd.print(t);
  lcd.print((char)223);//shows degrees character
  lcd.print("C");

  lcd.setCursor(0,1);
  lcd.print("Humi.: ");
  lcd.print(h);
  lcd.print("%");
  
  delay(2000);
}
