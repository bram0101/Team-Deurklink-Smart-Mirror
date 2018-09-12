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
