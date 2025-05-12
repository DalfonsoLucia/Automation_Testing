import unittest

import HtmlTestRunner
import requests
from requests.auth import HTTPBasicAuth
from selenium import webdriver
from selenium.common import NoSuchElementException, TimeoutException, ElementClickInterceptedException
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec

from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

from Locators.locators import Locators
from Tests.Utils.TestReporter import TestReporter

from selenium.webdriver.chrome.options import Options

import time
import datetime
import os

from Tests.Utils.driverUtils import DriverUtils


class TestSelenium(unittest.TestCase):
    driver = None

    @classmethod
    def setUpClass(cls):
        """Setup eseguito una volta prima di tutti i test."""

        chrome_options = Options()

        chrome_options.add_argument("--start-maximized")  # Massimizza finestra (non sempre serve se headless)

        prefs = {
            "credentials_enable_service": False,
            "profile.password_manager_enabled": False,
            "autofill.profile_enabled": False,
            "profile.autofill_profile_enabled": False,
            "profile.default_content_setting_values.notifications": 2
        }
        chrome_options.add_experimental_option("prefs", prefs)

        chrome_options.add_argument("--disable-autofill-keyboard-accessory-view")
        chrome_options.add_argument("--disable-autofill")
        chrome_options.add_argument("--disable-autofill-profile-update-popup")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)

        service = ChromeService(ChromeDriverManager().install())
        cls.driver = webdriver.Chrome(service=service, options=chrome_options)

        cls.driver.implicitly_wait(10)
        cls.driver.get("https://www.unode50.com/eu/it_IT/home")

        print("open browser")

    def test_login_account(self):
        reporter = TestReporter(self.driver)
        locator = Locators
        driverUtils = DriverUtils(self.driver)
        wait = WebDriverWait(self.driver, 40)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        # Login account
        reporter.log("Login account")
        reporter.screenshot("log_in_side")
        driverUtils.write_email_element(By.ID, locator.email_id)
        driverUtils.write_password_element(By.ID, locator.password_id)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.remember_access_box_cssSelector)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.accedi_button_cssSelector)

        login_account_page = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.account_page_cssSelector))
        ).text
        self.assertIn("I Miei Dati Personali", login_account_page)

    def test_login_account_with_wrong_email(self):
        locator = Locators
        reporter = TestReporter(self.driver)
        driverUtils = DriverUtils(self.driver)
        wait = WebDriverWait(self.driver, 40)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        # Login account
        reporter.log("Login account")
        reporter.screenshot("log_in_side")
        driverUtils.write_wrong_email_element(By.ID, locator.email_id)
        driverUtils.write_password_element(By.ID, locator.password_id)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.remember_access_box_cssSelector)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.accedi_button_cssSelector)

        error_message_login_email = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.alert_message_cssSelector_wrong_email))
        ).text
        print(f"Error message found: {error_message_login_email}")
        self.assertIn("Nome utente o password non validi.", error_message_login_email)

    def test_login_account_with_wrong_password(self):
        locator = Locators
        reporter = TestReporter(self.driver)
        driverUtils = DriverUtils(self.driver)
        wait = WebDriverWait(self.driver, 40)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        # Login account
        reporter.log("Login account")
        reporter.screenshot("log_in_side")
        driverUtils.write_email_element(By.ID, locator.email_id)
        driverUtils.write_wrong_password_element(By.ID, locator.password_id)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.remember_access_box_cssSelector)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.accedi_button_cssSelector)

        error_message_login_password = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.alert_message_cssSelector_wrong_email))
        ).text
        self.assertIn("Inicio de sesión o contraseña no válidos.", error_message_login_password)

    def test_log_out(self):
        locator = Locators
        reporter = TestReporter(self.driver)
        driverUtils = DriverUtils(self.driver)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        # Login account
        reporter.log("Login account")
        reporter.screenshot("log_in_side")
        driverUtils.write_email_element(By.ID, locator.email_id)
        driverUtils.write_password_element(By.ID, locator.password_id)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.remember_access_box_cssSelector)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.accedi_button_cssSelector)

        # Back on Home Page
        reporter.log("Back on Home Page")
        reporter.screenshot("home_page_side")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.home_page_back_cssSelector)

        # Logout account
        reporter.log("Logout account")
        reporter.screenshot("Logout account")
        driverUtils.log_out(By.CSS_SELECTOR, locator.account_name_cssSelector)

        driverUtils.assert_logged_out()
        print("Successfully logged out")

    def test_create_account(self):
        locator = Locators
        reporter = TestReporter(self.driver)
        driverUtils = DriverUtils(self.driver)
        wait = WebDriverWait(self.driver, 40)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        # Click on the "Create account" tab
        reporter.log("Click on the 'Create account' tab")
        reporter.screenshot("create_account_tab")
        create_account_text = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.register_tab_cssSelector))
        ).text
        print(f"The account text is: {create_account_text}")
        self.assertIn("crea account", create_account_text)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.register_tab_cssSelector)

        # Insert your user account details
        # Insert name
        driverUtils.write_element(By.ID, locator.insert_name_id, locator.name_id)
        # Insert surname
        driverUtils.write_element(By.ID, locator.insert_surname_id, locator.surname_id)
        # Insert phone number
        driverUtils.write_element(By.ID, locator.insert_phone_number_id, locator.phone_number_id)
        # Insert birthday date
        driverUtils.write_element(By.ID, locator.insert_birthday_date_id, locator.birthday_date_id)
        # Insert email
        driverUtils.write_element(By.ID, locator.insert_email_id, locator.email)
        # Insert password
        driverUtils.write_element(By.ID, locator.insert_password_id, locator.password)
        # Insert confirm password
        driverUtils.write_element(By.ID, locator.insert_confirm_password_id, locator.password)
        # Insert gender
        driverUtils.element_clickable(By.ID, locator.insert_gender_id)
        # Select new members welcome discount option
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.insert_new_members_welcome_cssSelector)
        # Select privacy policy option
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.insert_privacy_policy_cssSelector)
        # Click create account button
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.click_create_account_button_cssSelector)
        login_account_page = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.account_page_cssSelector))
        ).text
        reporter.log("Inserted all user account details")
        reporter.screenshot("Inserted all user account details")
        self.assertIn("I Miei Dati Personali", login_account_page)

    def test_create_order(self):
        locator = Locators
        driverUtils = DriverUtils(self.driver)
        reporter = TestReporter(self.driver)
        wait = WebDriverWait(self.driver, 50)

        # Click "Accept all cookies" in the popup
        reporter.log("Click 'Accept all cookies' in the popup")
        reporter.screenshot("cookie_popup")
        driverUtils.element_clickable(By.ID, locator.cookie_accept_id)

        # Close the pop up reserved for new subscribers
        reporter.log("Close the pop up reserved for new subscribers")
        reporter.screenshot("new_subscribers_popup")
        driverUtils.close_pop_up_new_member(By.ID, locator.new_members_close_pop_up)

        # Click on the "Log in to your account" icon
        reporter.log("Click on the 'Log in to your account' icon")
        reporter.screenshot("log_in_icon")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.account_icon_button)

        reporter.log("Login account")
        reporter.screenshot("log_in_side")
        driverUtils.write_email_element(By.ID, locator.email_id)
        driverUtils.write_password_element(By.ID, locator.password_id)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.remember_access_box_cssSelector)
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.accedi_button_cssSelector)

        login_account_page = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.account_page_cssSelector))
        ).text
        self.assertIn("I Miei Dati Personali", login_account_page)

        """
        eseguire refactoring
        """

        driverUtils.element_clickable(By.CSS_SELECTOR, locator.logo_uno_de_50_cssSelector)

        # Scroll and waiting loading products
        reporter.log("Scroll and waiting loading products")
        reporter.screenshot("load_products")
        driverUtils.select_product_by_pid(locator.product_pid, wait)

        # Choose the size
        reporter.log("Choose the size")
        reporter.screenshot("choose_size")
        driverUtils.select_ring_size(locator.ring_size, wait)
        time.sleep(1)
        # Click add to cart
        reporter.log("Click add to cart")
        reporter.screenshot("add_to_cart")
        try:
            add_cart = wait.until(ec.presence_of_element_located((By.CLASS_NAME, locator.add_to_cart_className)))

            if add_cart.get_attribute("disabled") is None:
                print("The button is enabled, click")
                add_cart.click()
            else:
                print("The button is disabled.")

        except NoSuchElementException:
            print("Item 'add-to-cart' not found.")
        except Exception as e:
            print(f"Error: {str(e)}")

        # Found cart item (icon o area hover)
        reporter.log("Found cart item (icon o area hover)")
        reporter.screenshot("found_cart_icon")

        cart_icon = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.cart_icon_cssSelector)))

        # Move the mouse over the item to activate the popup
        reporter.log("Move the mouse over the item to activate the popup")
        reporter.screenshot("activate_popup_cart")
        actions = ActionChains(self.driver)
        actions.move_to_element(cart_icon).perform()

        driverUtils.element_clickable(By.CSS_SELECTOR,
                                      locator.view_cart_cssSelector)

        print("Enter the cart")

        driverUtils.element_clickable(By.CSS_SELECTOR, locator.start_order_button_cssSelector)

        # Choose Standard Shipping
        reporter.log("Choose Standard Shipping")
        reporter.screenshot("choose_shipping")

        driverUtils.element_clickable(By.XPATH, locator.shipping_type_xpath)

        reporter.log("Enter account details for shipping")
        # Insert name
        driverUtils.write_element(By.ID, locator.name_shipping_id, locator.name_id)
        # Insert surname
        driverUtils.write_element(By.ID, locator.surname_shipping_id, locator.surname_id)
        # Insert Address
        driverUtils.write_element(By.ID, locator.address_shipping_id, locator.address_id)
        # Insert ZipCode
        driverUtils.write_element(By.ID, locator.zipcode_shipping_id, locator.zipcode_id)
        # Insert phone number
        driverUtils.write_element(By.ID, locator.phone_number_shipping_id, locator.phone_number_id)
        # Insert city
        driverUtils.write_element(By.ID, locator.city_shipping_id, locator.city_id)
        # Insert state

        payment_label = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.accept_policy_privacy_cssSelector)))
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", payment_label)
        reporter.log("Enter all delivery details")
        reporter.screenshot("delivery_details")

        wait.until(ec.element_to_be_clickable((By.CSS_SELECTOR, locator.accept_policy_privacy_cssSelector)))

        payment_label.click()
        print("Privacy checkbox selected by clicking on the label")

        privacy_checkbox = self.driver.find_element(By.ID, locator.privacy_checkbox_id)
        assert privacy_checkbox.is_selected(), "The privacy checkbox is not selected"

        # I’m clicking the Continue button
        reporter.log("I’m clicking the Continue button")
        driverUtils.element_clickable(By.CSS_SELECTOR,
                                      locator.continue_order_button_cssSlector)

        # Shipping section
        page_height = self.driver.execute_script("return document.body.scrollHeight")
        half_page_height = page_height / 2
        last_scroll_position = 0
        scroll_step = 600
        scroll_delay = 0.5

        while last_scroll_position < half_page_height:

            self.driver.execute_script(f"window.scrollTo(0, {last_scroll_position + scroll_step});")
            time.sleep(scroll_delay)

            new_scroll_position = self.driver.execute_script("return window.scrollY")

            if new_scroll_position == last_scroll_position:
                print("End of page reached or no new content to upload.")
                break

            last_scroll_position = new_scroll_position

        print("I did the full scroll")

        wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, locator.payment_options_cssSelector)))

        # 1. Click on the PayPal tab
        reporter.log("1. Click on the PayPal tab")
        reporter.screenshot("paypal_tab")
        driverUtils.element_clickable(By.CSS_SELECTOR, locator.paypal_tab_cssSelector)

        # 2. Enter the external iframe of PayPal
        reporter.log("2. Enter the external iframe of PayPal")
        reporter.screenshot("paypal_iframe")
        outer_iframe = WebDriverWait(self.driver, 20).until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.paypal_iframe_ecommerce_cssSelector))
        )
        self.driver.switch_to.frame(outer_iframe)

        original_windows = self.driver.window_handles

        # Look for the payment button and click it
        reporter.log("Look for the payment button and click it")
        reporter.screenshot("click_payment_button")
        buttons = self.driver.find_elements(By.CSS_SELECTOR, locator.payment_paypal_button_cssSelector)

        for button in buttons:
            button_text = button.text
            print(f"Button found with text: {button_text}")
            if " Paga adesso" in button_text or "Pay Now" in button_text:
                print("Clicco il bottone Pay")
                button.click()
                break

    def test_paypal_payment_refactor(self):

        driver = self.driver
        locator = Locators
        wait = WebDriverWait(driver, 60)
        driver_utils = DriverUtils(driver)
        reporter = TestReporter(driver)

        # Auth Paypal
        reporter.log("Retrieve token PayPal")
        auth = HTTPBasicAuth("ATHJpX07sg-w2Ki5wp2CMYmiWNeHLWpheO2ZgG1Ze7qcwbUPwuXwssMPGjf_HpCBmm30V3vLpn9yhWwK",
                             "EKqUzMhG_GsZ3sGTi-uOxfIXN2-g9l0kq0VD1PAjykAnucwSRGUUaTog-SucleiPfiSADIzwbK_k50qv")
        response = requests.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            headers={"Accept": "application/json"},
            data={"grant_type": "client_credentials"},
            auth=auth
        )
        token = response.json()["access_token"]

        # Create order
        reporter.log("Create PayPal order")
        order_resp = requests.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}"
            },
            json={
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {"currency_code": "EUR", "value": "158.00"},
                    "description": "Anello placcato argento Sterling"
                }],
                "application_context": {
                    "return_url": "https://www.unode50.com/eu/it_IT/account",
                    "cancel_url": "https://example.com/cancel"
                }
            }
        ).json()

        approval_url = next(link["href"] for link in order_resp["links"] if link["rel"] == "approve")

        # Open Paypal
        reporter.log("Open PayPal")
        reporter.screenshot("open_paypal")
        if len(driver.window_handles) == 1:
            driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[-1])
        driver.get(approval_url)

        # Login Paypal
        reporter.log("Login PayPal")
        reporter.screenshot("login_paypal")
        wait.until(ec.presence_of_element_located((By.ID, locator.paypal_email))).send_keys(
            locator.paypal_sandbox_account_email)
        driver_utils.safe_click(By.ID, locator.paypal_Accedi_button)

        wait.until(ec.presence_of_element_located((By.ID, locator.paypal_password))).send_keys(locator.paypal_sandbox_account_password)
        driver_utils.safe_click(By.ID, locator.paypal_login_button)

        # Change address
        reporter.log("Change shipping address")
        reporter.screenshot("modify_address")
        driver_utils.safe_click(By.ID, locator.paypal_Modifica_button)
        driver_utils.safe_click(By.ID, locator.paypal_add_new_address)
        driver_utils.write_element(By.ID, locator.paypal_address_box, locator.paypal_new_address)

        driver_utils.safe_click(By.ID,
                                locator.paypal_first_address)

        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        driver_utils.safe_click(By.CSS_SELECTOR, locator.paypal_save_address_button)


        # Select "Paga in 3 rate"
        reporter.log("Select 'Paga in 3 rate'")
        reporter.screenshot("selected_lay_by_payment")
        driver_utils.safe_click(By.CSS_SELECTOR,
                                locator.paypal_paga_3_rate_view_details)

        # Click first Continua
        driver_utils.safe_click(By.ID, locator.paypal_first_continue_button)

        # Click second Continua
        driver.switch_to.default_content()
        iframe = driver.find_elements(By.TAG_NAME, 'iframe')[0]
        driver.switch_to.frame(iframe)
        driver_utils.safe_click_pro(By.ID, locator.paypal_second_continue_button)
        driver.switch_to.default_content()

        # Enter tax number and phone
        reporter.log("Enter tax number and phone")
        reporter.screenshot("enter_tax_number_and_phone")
        iframe = driver.find_elements(By.TAG_NAME, 'iframe')[0]
        driver.switch_to.frame(iframe)

        driver_utils.clear_and_fill_js(By.ID, locator.paypal_tax_number_locator, locator.paypal_tax_number)
        driver_utils.clear_and_fill_js(By.ID, locator.paypal_phone_number_locator, locator.paypal_phone_number)

        driver.switch_to.default_content()

        iframes = driver.find_elements(By.TAG_NAME, "iframe")
        print(f"Number of iframes after default_content: {len(iframes)}")

        reporter.log("Modify billing address")
        reporter.screenshot("modify_billing_address")
        driver_utils.safe_click_pro_across_iframes(By.CSS_SELECTOR, locator.paypal_second_Modifica_button)

        driver_utils.clear_and_fill_js_across_iframes(
            By.ID,
            locator.paypal_second_modify_address,
            locator.paypal_second_enter_new_address
        )

        driver_utils.clear_and_fill_js_across_iframes(By.ID, locator.paypal_postcode_locator, locator.paypal_postcode)
        driver_utils.clear_and_fill_js_across_iframes(By.ID, locator.paypal_city_locator, locator.paypal_city)

        driver_utils.safe_click_pro_across_iframes(By.ID, locator.paypal_Continue_button)

        # Click third Continua
        driver_utils.safe_click_pro_across_iframes(By.ID, locator.paypal_Continue_button)

        # Click fourth Continua
        driver_utils.safe_click_pro_across_iframes(By.ID, locator.paypal_Continue_button)

        # Select Visa card
        reporter.log("Select Visa card")
        reporter.screenshot("select_Visa_card")
        driver_utils.safe_click_pro(By.XPATH, locator.paypal_select_Visa_card)

        # Checkbox and Continua
        checkbox = wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, locator.paypal_flag_Paga_3_rate)))
        driver.execute_script("arguments[0].click();", checkbox)
        driver_utils.safe_click_pro_across_iframes(By.ID, locator.paypal_Continue_button)

        # Final click on Continue button
        reporter.log("Final click on Continue button")
        reporter.screenshot("click_final_button_to_payment")
        button_found = False
        for iframe in driver.find_elements(By.TAG_NAME, "iframe"):
            driver.switch_to.default_content()
            try:
                driver.switch_to.frame(iframe)
                btn = WebDriverWait(driver, 3).until(
                    ec.element_to_be_clickable((By.ID, locator.paypal_final_Continue_button))
                )
                btn.click()
                button_found = True
                break
            except Exception:
                continue

        if not button_found:
            driver.switch_to.default_content()
            wait.until(ec.element_to_be_clickable((By.ID, locator.paypal_final_Continue_button)))
            driver_utils.wait_for_no_captcha()
            driver_utils.safe_click_pro(By.ID, locator.paypal_final_Continue_button)

        reporter.log("Final click made")
        reporter.screenshot("final_click_made")

        # Redirect Verification
        WebDriverWait(driver, 40).until(
            lambda d: "unode50.com" in d.current_url
        )

        current_url = driver.current_url
        assert "unode50.com" in current_url, f"Redirect fallito. URL attuale: {current_url}"
        print("Redirect successful. We are back on UNOde50.")

        reporter.log("Redirect correct to UNOde50 site")
        reporter.screenshot("final_page")

    @classmethod
    def tearDownClass(cls):
        """Questo metodo viene eseguito dopo ogni test (simile a afterEach)"""
        if cls.driver:
            cls.driver.quit()
        print("quit driver")


if __name__ == "__main__":
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(
        output='C:/Progetti/selenium_Python_Test/Reports_HTML'))
