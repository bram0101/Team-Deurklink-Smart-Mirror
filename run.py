import threading
import subprocess
import os

def runTouch():
    subprocess.call("python3 " + os.path.dirname(os.path.realpath(__file__)) + "/touch.py", shell=True)

def runPage():
    subprocess.call("chromium-browser --allow-insecure-localhost --start-fullscreen \"" + os.path.dirname(os.path.realpath(__file__)) + "/index.html\"", shell=True)

touchThread = threading.Thread(target=runTouch)
touchThread.start()
pageThread = threading.Thread(target=runPage)
pageThread.start()

touchThread.join()
pageThread.join()
