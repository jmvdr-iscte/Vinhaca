import paho.mqtt.client as mqtt
import pymysql

# Set up MQTT client
MQTT_BROKER = "broker.mqttdashboard.com"
MQTT_TOPIC = "esp32/vinhaca"

# Variables to track previous values
prev_temperature = None
prev_density = None
prev_liquidLevel = None

# Threshold values for detecting anomalies
TEMPERATURE_THRESHOLD = 10
DENSITY_THRESHOLD = 5
LIQUID_LEVEL_THRESHOLD = 3

count1=0
count2=0
count3=0

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    global prev_temperature, prev_density, prev_liquidLevel, count1, count2, count3

    print(msg.topic + " " + str(msg.payload))
    try:
        # Parse the message payload as a comma-separated string of floats
        Temperature, density, liquidLevel = [float(x) for x in msg.payload.decode().split(",")]
    
        # Check if values are anomalous
        if prev_temperature is not None and abs(liquidLevel - prev_temperature+0.01) > TEMPERATURE_THRESHOLD:
            if(count1<3):
                print("Anomalous temperature detected!"+count1)
                count1 += 1
                return
            
            if(count1==3):
                count1=0

        if prev_liquidLevel is not None and abs(density - prev_liquidLevel+0.01) > LIQUID_LEVEL_THRESHOLD:
            if(count2<3):
            
                print("Anomalous liquid level detected!"+str(count2))
                count2+=1
                return
            
            if(count2==3):
                count2=0
        
        if prev_density is not None and abs(Temperature - prev_density+0.01) > DENSITY_THRESHOLD:
            if(count3<3):
            
                print("Anomalous density detected!")
                count3+=1
                return
            
            if(count3==3):
                count3=0

        # Connect to MySQL database
        db = pymysql.connect(host="localhost", user="root", password="", database="vinhaca_1_1")

        # Insert data into MySQL database
        cursor = db.cursor()
        sql = "INSERT INTO medicao (NomeSensor, Leitura) VALUES (%s, %s)"
        cursor.execute(sql, ("Temperature", liquidLevel))
        cursor.execute(sql, ("Density", Temperature))
        cursor.execute(sql, ("liquidLevel", density))
        db.commit()
        cursor.close()
        db.close()

        print("Data inserted into MySQL database")

        # Update previous values
        prev_temperature = liquidLevel
        prev_density = Temperature
        prev_liquidLevel = density

    except Exception as e:
        print("Error:", e)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(MQTT_BROKER, 1883, 60)

try:
    client.loop_forever()

except KeyboardInterrupt:
    print("Script stopped by user")

except Exception as e:
    print("Error:", e)
