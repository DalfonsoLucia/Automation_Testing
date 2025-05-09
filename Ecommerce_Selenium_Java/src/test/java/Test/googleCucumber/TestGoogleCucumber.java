package Test.googleCucumber;

import Test.utils.DriverUtils;
import Test.utils.TestReport;
import io.cucumber.java.AfterAll;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;

import java.util.NoSuchElementException;
import java.util.logging.Logger;

import static Test.utils.DriverUtils.assertTrueCustom;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestGoogleCucumber {

    private static DriverUtils driverUtils;
    private static WebDriver driver;
    private static final Logger logger = Logger.getLogger(TestGoogleCucumber.class.getName());
    private static TestReport testReport;

    @Before
    public void setUpReport() {
        testReport = new TestReport();
        testReport.setupReport();
    }

    @Before
    public void setUp() {
        driverUtils = new DriverUtils();
        driverUtils.initGoogle();
        driver = DriverUtils.getDriver();
    }

    @Given("I am on the Google homepage and refuse cookie")
    public void i_am_on_the_google_homepage() {
        testReport.startTest("Test Google con Cucumber", "Test sul sito di google");
        try {
            DriverUtils.clickElement(By.xpath("//*[@id=\"W0wltc\"]/div"));
            logger.info("\033[33mHo rifiutato i cookie di google.\033[0m");
        } catch (NoSuchElementException e) {
            logger.info("\033[33mLa sezione dei cookie non è stata trovata, procedi con il test.\033[0m");
        }
    }
    @When("I search for {string} and click")
    public void i_search_for(String searchText) throws InterruptedException {
        DriverUtils.writeText(By.name("q"), searchText);
        Thread.sleep(500);
        new Actions(driver).sendKeys(Keys.RETURN).perform();
    }
    @Then("I select the search result with URL {string}")
    public void i_select_the_search_result_with_url(String expectedUrl) {
        WebElement searchResults = DriverUtils.getWebElement(By.id("search"));
        assert searchResults != null;
        var results = searchResults.findElements(By.xpath(".//a"));
        boolean foundResult = false;
        for (WebElement result : results) {
            if (result.getAttribute("href").contains(expectedUrl)) {
                result.click();
                foundResult = true;
                break;
            }
        }
        assertTrueCustom(testReport, foundResult, "Hai selelzionato l'URL https://www.samsung.com",
                "Non è stato trovato nessun risultato di ricerca con l'URL https://www.samsung.com");
    }
    @And("I refuse the cookie on Samsung website")
    public void i_refuse_the_cookie_on_samsung_website() {
        try {
            DriverUtils.clickElement(By.xpath("//*[@id=\"truste-consent-required\"]")); // click "continue without accepting" button if it exists
            logger.info("\033[33mI refused the cookies on Samsung page.\033[0m");
        } catch (NoSuchElementException e) {
            logger.info("\033[33mThe cookie section was not found, continuing with the test.\033[0m");
        }
    }

    @When("I click on the Galaxy S23+ model in the devices section")
    public void click_model_galaxyS23() {
        DriverUtils.clickElement(By.className("s-category-text"));
    }

    @Then("the device model shown should be the Galaxy S23+")
    public void verify_model_GalaxyS23() {
        WebElement galaxyModel = DriverUtils.getWebElement(By.cssSelector("#device > div.hubble-product__options-content > ul > li:nth-child(2) > " +
                "div.s-option-box.hubble-pd-radio.js-radio-wrap.is-checked > label > span.s-label > span > span.s-rdo-text"));
        assertTrueCustom(testReport, DriverUtils.ifElementExist(galaxyModel, "Galaxy S23+"), "Hai selelzionato il modello corretto!",
                "Il modello richiesto è errato!");
        assert galaxyModel != null;
    }

    @And("the displayed device memory should be 512GB | 8GB")
    public void verify_memory_galaxyS23() {
        WebElement galaxyMemory = DriverUtils.getWebElement(By.cssSelector("#storage > div.hubble-product__options-content > ul > li:nth-child(3) > " +
                "div.s-option-box.hubble-pd-radio.js-radio-wrap.is-checked > label > span.s-label > span > span.s-rdo-text"));
        assertTrueCustom(testReport, DriverUtils.ifElementExist(galaxyMemory, "512GB | 8GB"), "La memoria richiesta è corretta!",
                "La memoria richiesta è errata!");
        assert galaxyMemory != null;
    }

    @When("the user selects the purchase option and be selected via the 'is-checked' word")
    public void select_purchase_option_and_verify_selected_element() {
        WebElement buySelection = DriverUtils.getWebElement(By.xpath("//*[@id=\"purchase\"]/div[2]/div[1]/div/div[1]/div[1]/div/div"));
        assert buySelection != null;
        String buySelectionClass = buySelection.getAttribute("class");
        boolean isChecked = buySelectionClass.contains("is-checked");
        assertTrueCustom(testReport, isChecked, "L'elemento è stato selezionato",
                "L'elemento non è ancora stato selezionato");
    }

    @And("the purchase option should have a background color of {string}")
    public void verify_purchase_option_color(String expectedColor) {
        WebElement bg = DriverUtils.getWebElement(By.cssSelector(".hubble-product__options.s-option-purchase .hubble-pd-radio.s-type-color3.is-checked .hubble-pd-radio__label"));
        assert bg != null;
        String backgroundColor = bg.getCssValue("background-color");
        assertEquals(expectedColor, backgroundColor, "L'elemento non ha il colore di sfondo corretto");
        logger.info("\033[33mLa sezione ACQUISTA è selezionata\033[0m");
    }

    @And("the total price in the cart should be {string}")
    public void verifyTotalPrice(String expectedPrice) throws InterruptedException {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        WebElement buy = DriverUtils.getWebElement(By.linkText("ACQUISTA ORA"));
        js.executeScript("arguments[0].click();", buy);
        logger.info("\033[33mHai cliccato su Acquista ora\033[0m");

        Thread.sleep(2000);
        DriverUtils.clickElement(By.cssSelector("#component-id > div.nv00-gnb__inner-wrap > div.nv00-gnb__utility-wrap > div.nv00-gnb__utility.cart > a > svg"));

        WebElement totalPrice = DriverUtils.getWebElement(By.xpath("/html/body/main/div[2]/div/div[3]/div[1]/div[2]/div/div/div[1]/div[1]/div[2]/div[2]"));
        assert totalPrice != null;
        String newPriceText = totalPrice.getText();
        assertTrueCustom(testReport, DriverUtils.ifElementExist(totalPrice, expectedPrice), "Il prezzo totale è corretto!",
                "Il prezzo totale è errato!");
    }

    @Then("the selected phone model should be {string}")
    public void verifyPhoneModel(String expectedModel) throws InterruptedException {
        Thread.sleep(2000);
        WebElement namePhone = DriverUtils.getWebElement(By.xpath("//h3[contains(text(),'Galaxy S23+')]"));
        assertTrueCustom(testReport, DriverUtils.ifElementExist(namePhone, expectedModel), "Il modello che stai acquistando è corretto!",
                "Il modello che stai acquistando è diverso!");
    }

    @AfterAll
    public static void tearDown() {
        driverUtils.close();
        testReport.tearDown();
    }

}
