import thread

def runTouch():
    subprocess.call(["sudo", "python3", "touch.py"], shell=True)

def runPage():
    subprocess.call(["chromium-browser", "--allow-insecure-localhost", "--start-fullscreen", "index.html"], shell=True)

touchThread = threading.Thread(target=runTouch)
touchThread.start()
pageThread = threading.Thread(target=runPage)
pageThread.start()

touchThread.join()
pageThread.join()
