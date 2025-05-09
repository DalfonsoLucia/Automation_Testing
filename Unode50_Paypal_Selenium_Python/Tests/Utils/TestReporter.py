import datetime
import os


class TestReporter:
    def __init__(self, driver):
        self.driver = driver
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        self.folder = os.path.join("Reports", f"paypal_test_{timestamp}")
        os.makedirs(self.folder, exist_ok=True)
        self.logfile = os.path.join(self.folder, "log.txt")

    def log(self, message):
        print(message)
        with open(self.logfile, "a", encoding="utf-8") as f:
            f.write(message + "\n")

    def screenshot(self, name):
        path = os.path.join(self.folder, f"{name}.png")
        self.driver.save_screenshot(path)
        self.log(f"📸 Screenshot salvato: {path}")
