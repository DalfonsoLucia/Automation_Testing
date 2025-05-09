from selenium.common import TimeoutException, ElementClickInterceptedException, NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.action_chains import ActionChains

from Locators.locators import Locators

import time


class DriverUtils:

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 60)
        self.locator = Locators

    def element_clickable(self, by, locator_value):
        element = WebDriverWait(self.driver, 40).until(
            ec.element_to_be_clickable((by, locator_value))
        )
        element.click()

    def close_pop_up_new_member(self, by, locator_value):
        close_pop_up = self.wait.until(ec.element_to_be_clickable((by, locator_value)))
        close_pop_up.click()

    def write_element(self, by, locator_value, element):
        write_email = self.wait.until(ec.presence_of_element_located((by, locator_value)))
        write_email.clear()
        write_email.send_keys(element)

    def write_email_element(self, by, locator_value):
        write_email = self.wait.until(ec.presence_of_element_located((by, locator_value)))
        write_email.clear()
        write_email.send_keys(self.locator.email)

    def write_password_element(self, by, locator_value):
        write_password = self.wait.until(ec.presence_of_element_located((by, locator_value)))
        write_password.clear()
        write_password.send_keys(self.locator.password)

    def write_wrong_email_element(self, by, locator_value):
        write_email = self.wait.until(ec.presence_of_element_located((by, locator_value)))
        write_email.clear()
        write_email.send_keys(self.locator.wrong_email)

    def write_wrong_password_element(self, by, locator_value):
        write_password = self.wait.until(ec.presence_of_element_located((by, locator_value)))
        write_password.clear()
        write_password.send_keys(self.locator.wrong_password)

    def log_out(self, by, locator_value):
        locator = Locators
        log_out_button = self.wait.until(ec.element_to_be_clickable((by, locator_value)))
        try:
            log_out_button.click()
        except ElementClickInterceptedException:
            print("Click intercepted on account button. I use JavaScript.")
            self.driver.execute_script("arguments[0].click();", log_out_button)

        account_list = self.driver.find_elements(By.CSS_SELECTOR, locator.account_list_cssSelector)

        for el in account_list:
            href = el.get_attribute("href") or ""
            text = el.text.strip().lower()

            if "login-logout" in href.lower() or "esci" in text:
                print("Found link 'Exit', I try to click it...")
                try:
                    el.click()
                except ElementClickInterceptedException:
                    print("Click intercepted on the link 'Exit'. I try again with JavaScript.")
                    self.driver.execute_script("arguments[0].click();", el)
                return

        raise Exception("'Sign out' link not found after the click on account button.")

    def get_element(self, by, locator_value):
        self.wait.until(ec.visibility_of_element_located((by, locator_value)))

    def get_elements(self, by, locator_values):
        try:
            return self.wait.until(ec.visibility_of_all_elements_located((by, locator_values)))
        except Exception as e:
            print(f"Error in get_elements: {e}")
            return []

    def select_product_by_pid(self, pid: str, wait: WebDriverWait):

        locator = Locators

        # Find the parent element that has the dropdown
        rings_menu = wait.until(ec.presence_of_element_located((By.ID, locator.ring_id)))

        ActionChains(self.driver).move_to_element(rings_menu).perform()

        # Wait for the desired subcategory to appear
        subcategory = wait.until(ec.visibility_of_element_located((
            By.XPATH, locator.sub_category_xpath
        )))

        # Click on subcategory
        subcategory.click()

        # You are now on the products page. Search for the one with the specified PID
        product_element = wait.until(ec.presence_of_element_located((
            By.CSS_SELECTOR, f'div[data-pid="{pid}"]'
        )))

        self.driver.execute_script("arguments[0].scrollIntoView(true);", product_element)
        product_element.click()

    def select_ring_size(self, size: str, wait: WebDriverWait):

        locator = Locators
        # Wait for the size container to be visible
        size_selector = wait.until(ec.presence_of_element_located((By.CLASS_NAME, locator.product_size_selector)))

        # Select the desired size (e.g. "15")
        size_element = size_selector.find_element(By.CSS_SELECTOR, f'li[data-attr-value="{size}"]')

        # Click on size
        size_element.click()

    def href_contains(self, by, locator, href_value):
        try:
            href_element = self.wait.until(ec.presence_of_element_located((by, locator)))
            href = href_element.get_attribute("href")
            if href_value in href:
                return href_element
            else:
                raise ValueError(f"The element’s href does not contain '{href_value}' (found: '{href}')")
        except TimeoutException:
            raise TimeoutException(f"Item with locator '{locator}' not found within timeout.")

    def scroll_to_element(self, element, behavior="smooth", block="center"):
        """Scrolls the page until the element is visible in the viewport."""
        self.driver.execute_script(
            "arguments[0].scrollIntoView({behavior: arguments[1], block: arguments[2]});",
            element, behavior, block
        )

    def wait_for_clickable_and_enabled(self, by, value, timeout=20):
        return WebDriverWait(self.driver, timeout).until(
            lambda d: (el := d.find_element(by, value)) and el.is_displayed() and el.is_enabled() and el
        )

    def button_is_ready(self):

        locator = Locators

        try:
            button = self.driver.find_element(By.ID, locator.paypal_Continue_button)
            return button.is_displayed() and button.is_enabled()
        except:
            return False

    # Utilizzato nei pagamenti di Paypal dove i bottoni e le box risiedono all'interno di iFrame
    def switch_to_frame_with_element(self, by, value):
        self.driver.switch_to.default_content()
        for index, iframe in enumerate(self.driver.find_elements(By.TAG_NAME, "iframe")):
            self.driver.switch_to.default_content()
            self.driver.switch_to.frame(iframe)
            try:
                self.driver.find_element(by, value)
                print(f"Element found in iframe[{index}]")
                return True
            except:
                continue
        self.driver.switch_to.default_content()
        print("Element not found in any iframe")
        return False

    def write_element_existing(self, by, value):
        element = WebDriverWait(self.driver, 10).until(
            ec.element_to_be_clickable((by, value))
        )
        element.clear()
        element.send_keys(value)

    def debug_page_html(self):
        page_source = self.driver.page_source
        with open("debug_page_source.html", "w", encoding="utf-8") as file:
            file.write(page_source)
        print("The page content has been saved as 'debug_page_source.html' for debugging.")

    def search_element_in_list(self, by, values_list, element: str):
        elements = self.driver.find_elements(by, values_list)

        for option in elements:
            if option.get_attribute("value") == element:
                option.click()
                break

    def scroll_and_click(self, by, locator):
        element = WebDriverWait(self.driver, 20).until(
            ec.element_to_be_clickable((by, locator))
        )
        self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
        ActionChains(self.driver).move_to_element(element).pause(0.3).click().perform()
        return element

    def js_click(self, by, locator):
        element = WebDriverWait(self.driver, 20).until(
            ec.element_to_be_clickable((by, locator))
        )
        self.driver.execute_script("arguments[0].click();", element)

    def scroll_and_click_by_js(self, by, selector, timeout=20):
        """Scrolls the element into the viewport and clicks via JavaScript. If it fails, try the normal click."""
        wait = WebDriverWait(self.driver, timeout)
        element = wait.until(ec.presence_of_element_located((by, selector)))
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
        try:
            self.driver.execute_script("arguments[0].click();", element)
        except Exception as e:
            print(f"Click on JS failed ({e}), try with normal click.")
            element.click()
        return element

    def safe_click(self, by, value, timeout=20):
        """
        Click safely on an item:
        - Wait for it to be clickable.
        - Scrolls in the viewport.
        - If the click fails, use JavaScript.
        """
        print(f"DEBUG: I try to click on {by}={value}")

        self.wait_for_element_visible(by, value, timeout)

        el = WebDriverWait(self.driver, timeout).until(
            ec.element_to_be_clickable((by, value))
        )

        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", el)
        try:
            el.click()
            print("Normal click succeeded.")
        except ElementClickInterceptedException:
            print("Click intercepted. I try again with JavaScript.")
            self.driver.execute_script("arguments[0].click();", el)

        return el

    def safe_click_pro(self, by, value, timeout=20):
        """
        Click safely on an item.
        - Wait for it to be visible and clickable.
        - Scrolls in the viewport.
        - If the normal click fails, try with JavaScript.
        - If it does not find the element in the current frame, check also out of iframe (optional).
        """
        print(f"DEBUG: safe_click → Search {by}={value}")

        try:
            self.wait_for_element_visible(by, value, timeout)
            el = WebDriverWait(self.driver, timeout).until(
                ec.element_to_be_clickable((by, value))
            )
        except TimeoutException:
            print("Item not clickable in current frame. Check if you are in the right frame.")
            raise

        # Scrolla into viewport
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", el)

        try:
            el.click()
            print("Normal click succeeded.")
        except ElementClickInterceptedException:
            print("Click intercepted. I try with JavaScript.")
            self.driver.execute_script("arguments[0].click();", el)
        except Exception as e:
            print(f"Error in click: {e}")
            raise

        return el

    def wait_for_no_captcha(self, timeout=40):

        locator = Locators

        try:
            WebDriverWait(self.driver, 5).until(
                ec.presence_of_element_located((By.CSS_SELECTOR, locator.paypal_capcha_iframe))
            )
            print("CAPTCHA found. Wait for it to disappear...")
            WebDriverWait(self.driver, timeout).until_not(
                ec.presence_of_element_located((By.CSS_SELECTOR, locator.paypal_capcha_iframe))
            )
            print("CAPTCHA disappeared.")
        except TimeoutException:
            print("No CAPTCHA visible or already disappeared.")

    def clear_and_fill_js(self, by, locator, value, timeout=10):
        """
        Find the element, delete the content, insert the new value via JS
        and sends the 'input' and 'change' events to notify dynamic frameworks (React, Angular, Vue).
        """
        print(f"DEBUG: clear_and_fill_js → Search {by}={locator}")

        element = WebDriverWait(self.driver, timeout).until(
            ec.presence_of_element_located((by, locator))
        )

        # Scrolls into the viewport for security (React sometimes ignores off-screen elements)
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)

        # Cleans and inserts the value
        self.driver.execute_script("arguments[0].value = '';", element)
        time.sleep(0.3)
        self.driver.execute_script("arguments[0].value = arguments[1];", element, value)

        self.driver.execute_script(
            "arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", element
        )
        self.driver.execute_script(
            "arguments[0].dispatchEvent(new Event('change', { bubbles: true }));", element
        )

        print(f"clear_and_fill_js → Valore impostato su '{value}'.")

    def safe_click_pro_across_iframes(self, by, locator, timeout=20):
        """
        Search and click on an item, trying in the main content and then in all available iframes.
        If you find it, click and stay in the iframe found.
        """

        def try_click_in_context(context_desc):
            print(f"Context: {context_desc}")
            try:
                el = WebDriverWait(self.driver, timeout).until(
                    ec.visibility_of_element_located((by, locator))
                )
                self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", el)
                try:
                    el.click()
                    print(f"Successful normal click on '{locator}' in {context_desc}")
                except ElementClickInterceptedException:
                    print(f"Click intercepted in {context_desc}. I try again with JavaScript.")
                    self.driver.execute_script("arguments[0].click();", el)
                    print(f"Click JS successfully on '{locator}' in {context_desc}")
                return True
            except TimeoutException:
                return False

        # Step 1: test in main content
        self.driver.switch_to.default_content()
        print("I’m looking for the item in main content...")
        if try_click_in_context("main content"):
            return

        # Step 2: test in all iframes
        iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
        print(f"Number of iframes found: {len(iframes)}")

        for index, iframe in enumerate(iframes):
            self.driver.switch_to.default_content()
            try:
                self.driver.switch_to.frame(iframe)
                print(f"Switched to iframe index {index}")
                if try_click_in_context(f"iframe index {index}"):
                    return
            except Exception as e:
                print(f"Error switching to iframe index {index}: {str(e)}")
                continue

        raise Exception(f"Element {locator} not found in any context or iframe.")

    def clear_and_fill_js_across_iframes(self, by, locator, value, timeout=20):
        """
        Search for an input field in the main content and then in all available iframes.
        Empty it and insert a new value using JavaScript with input/change events.
        Stays in the correct iframe.
        """

        def try_fill_in_context(context_desc):
            print(f"Try in context: {context_desc}")
            try:
                element = WebDriverWait(self.driver, timeout).until(
                    ec.presence_of_element_located((by, locator))
                )
                self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
                self.driver.execute_script("arguments[0].value = '';", element)
                time.sleep(0.3)
                self.driver.execute_script("arguments[0].value = arguments[1];", element, value)
                self.driver.execute_script(
                    "arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", element
                )
                self.driver.execute_script(
                    "arguments[0].dispatchEvent(new Event('change', { bubbles: true }));", element
                )
                print(f"Value '{value}' successfully set in {context_desc}")
                return True
            except TimeoutException:
                return False

        # Step 1: test in main content
        self.driver.switch_to.default_content()
        print("Looking for the field in main content...")
        if try_fill_in_context("main content"):
            return

        # Step 2: test in all iframes
        iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
        print(f"Number of iframes found: {len(iframes)}")

        for index, iframe in enumerate(iframes):
            self.driver.switch_to.default_content()
            try:
                self.driver.switch_to.frame(iframe)
                print(f"Switched to iframe index {index}")
                if try_fill_in_context(f"iframe index {index}"):
                    return
            except Exception as e:
                print(f"Error switching to iframe index {index}: {str(e)}")
                continue

        raise Exception(f"Field {locator} not found in any context or iframe.")

    def wait_for_element_visible(self, by, value, timeout=20):
        """
        Waits for an element to be visible in the DOM.
        Useful to avoid TimeoutException before clicks or interactions.
        """
        print(f"DEBUG: I look for the element {by}={value} to be visible  (timeout {timeout}s)...")
        return WebDriverWait(self.driver, timeout).until(
            ec.visibility_of_element_located((by, value))
        )

    def assert_logged_out(self):
        """
        Verify that the user is not logged in by checking that the element with 'user-message' class does not exist.
        """
        user_messages = self.driver.find_elements(By.CSS_SELECTOR, ".user-message")
        assert len(user_messages) == 0, "Logout failed: username is still visible."
        print("Verified logout: no logged in user.")
