## INSTRUCTIONS

### Steps to execute for start the Python project and the virtual environment.

- Open the terminal
- execute the command `pip install -r requirements.txt` to install all requirement present in the project.
- execute the command `venv\Scripts\activate` to activate the virtual env.
- If you would like deactivate the virtual env execute this command `deactivate`.

N.B. If you would create the virtual env. use this command `python -m venv .venv`.

------------------------------------------------------------------------------------------

### Selenium installation

After you've created the virtual env., this time to install Selenium and Web Driver.
Follow this instructions:

- Activate the virtual env.
- execute command `pip install selenium`
- Add Selenium into `requirements.txt` file like this --> `selenium==4.18.1` or if you would like keep tracked your dependencies, execute: `pip freeze > requirements.txt`
- install Web Driver Manager, execute this command `pip install webdriver-manager`
- execute `pip install -r requirements.txt`.

------------------------------------------------------------------------------------------

### Execute test

For run test use this command `python nameTest.py`, es. `python test_selenium.py`

------------------------------------------------------------------------------------------

### Installing Allure

Install Allure using this command `pip install allure-behave`

For execute test with Pytest and Allure use this command `pytest --alluredir=reports/allure_results`
For generate report HTML using `allure serve reports/allure_results`

------------------------------------------------------------------------------------------
N.B. In the test project, Unode50 for security reasons was not used Paypal, the original app but sandbox Paypal made available to run the tests safely.
As soon as possible, the remaining tests will be done on Paypal to test the payment with different forms of payment.
The project involves an E2E test where a user, log into his account and place an order and pay with Paypal, Pay in 3 installments his purchase.