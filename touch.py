"""
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# Omlaag knop
GPIO.setup(17, GPIO.OUT)
GPIO.output(17, GPIO.HIGH)
GPIO.setup(5, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.add_event_detect(5, GPIO.BOTH, bouncetime=100)

# Omhoog knop
#GPIO.setup(17, GPIO.OUT)
#GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_OFF)
#GPIO.add_event_detect(23, GPIO.BOTH, bouncetime=100)

try:
    while True:
        time.sleep(0.25)
        if GPIO.event_detected(5):
            if(GPIO.input(5)):
                print("Pressed")
            else:
                print("Released")
        #down = False
        #if(GPIO.input(5)):
        #    down = True
        #up = False
        #if(GPIO.input(23)):
        #    up = True
        #print("Down: " + ("1" if down else "0") + " Up: " + ("1" if up else "0"))
        print(GPIO.input(5))
except KeyboardInterrupt:
    GPIO.cleanup()
"""

import time
import socket
from http.server import BaseHTTPRequestHandler, HTTPServer
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)
GPIO.output(17, GPIO.HIGH)
GPIO.setup(5, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.add_event_detect(5, GPIO.RISING, bouncetime=100)

GPIO.setup(14, GPIO.OUT)
GPIO.output(14, GPIO.HIGH)
GPIO.setup(21, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.add_event_detect(21, GPIO.RISING, bouncetime=100)

def getButtonData():
    result = "{\"down\":";

    up = False
    down = False

    if (GPIO.event_detected(21) or GPIO.input(21)):
        up = True
    if(GPIO.event_detected(5) or GPIO.input(5)):
        down = True

    if down:
        result = result + "true"
    else:
        result = result + "false"
    result = result + ", \"up\":"
    if up:
        result = result + "true"
    else:
        result = result + "false"
    result = result + "}"
    print(result)
    return result

class ServerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*');
        self.end_headers()
        self.wfile.write(bytes(getButtonData(), "utf-8"))

    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*');
        self.end_headers()

    def log_message(self, format, *args):
        return

try:
serversocket = HTTPServer(('localhost', 4032), ServerHandler)

serversocket.serve_forever()
except KeyboardInterrupt:
    GPIO.cleanup()
