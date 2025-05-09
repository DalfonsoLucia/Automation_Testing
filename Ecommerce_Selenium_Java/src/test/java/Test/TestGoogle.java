package Test;

import Test.utils.DriverUtils;
import Test.utils.TestReport;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;

import java.util.NoSuchElementException;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

public class TestGoogle {
    private static DriverUtils driverUtils;
    private static WebDriver driver;
    private static final Logger logger = Logger.getLogger(TestSelenium.class.getName());
    private TestReport testReport;

    @BeforeEach
    public void setUpReport() {
        testReport = new TestReport();
        testReport.setupReport();
    }

    @BeforeEach
    public void setUp() {
        driverUtils = new DriverUtils();
        driverUtils.initGoogle(); //Andare su google
        driver = DriverUtils.getDriver();
    }

    @Test
    void test10() {
        testReport.startTest("Test Google", "Test sul sito di google");
        // AGGIUNTO "RIFIUTA COOKIE SE COMPARE NELLA SCHERMATA INIZIALE"
        try {
            DriverUtils.clickElement(By.xpath("//*[@id=\"W0wltc\"]/div")); // clicca il bottone Rifiuta se esiste
            logger.info("\033[33mHo rifiutato i cookie di google.\033[0m");
        } catch (NoSuchElementException e) {
            logger.info("\033[33mLa sezione dei cookie non è stata trovata, procedi con il test.\033[0m");
        }

        try {
            //Scrivere sul campo di ricerca “samsung s23"
            DriverUtils.writeText(By.id("APjFqb"), "samsung s23");
            Thread.sleep(500);
            testReport.pass("Step 1 Passed");

            //Simula l'invio da tastiera
            new Actions(driver).sendKeys(Keys.RETURN).perform();

            //Selezionare il risultato che come URL abbia -> https://www.samsung.com/galaxy/s23
            WebElement searchResults = DriverUtils.getWebElement(By.id("rcnt"));
            assert searchResults != null;
            var risultati = searchResults.findElements(By.xpath(".//a"));
            boolean foundResult = false;
            for (WebElement result : risultati) {
                if (result.getText().contains("https://www.samsung.com")) {
                    result.click();
                    foundResult = true;
                    break;
                }
            }
            assertTrue(foundResult, "Non è stato trovato nessun risultato di ricerca con l'URL https://www.samsung.com/galaxy/s23");
            testReport.pass("Step 2 Passed");

            // AGGIUNTO "RIFIUTA COOKIE SE COMPARE NELLA SCHERMATA APPENA APERTA"
            try {
                DriverUtils.clickElement(By.xpath("//*[@id=\"truste-consent-required\"]")); // clicca il bottone "continua senza accettare" se esiste
                logger.info("\033[33mHo rifiutato i cookie della pagina samsung.\033[0m");
            } catch (NoSuchElementException e) {
                logger.info("\033[33mLa sezione dei cookie non è stata trovata, procedi con il test.\033[0m");
            }
            testReport.pass("Step 3 Passed");

            //Una volta caricata la pagina cliccare su “galaxy s23 | s23+”
            DriverUtils.clickElement(By.className("s-category-text"));

            //Controllare che il modello sia corretto (galaxy s23+)
            WebElement galaxyModel = DriverUtils.getWebElement(By.cssSelector("#device > div.hubble-product__options-content > ul > li:nth-child(2) > " +
                    "div.s-option-box.hubble-pd-radio.js-radio-wrap.is-checked > label > span.s-label > span > span.s-rdo-text"));
            assertTrue(DriverUtils.ifElementExist(galaxyModel, "Galaxy S23+"),"Il modello richiesto è errato!");
            assert galaxyModel != null;
            logger.info("\033[33mIl " + galaxyModel.getText() + " è stato trovato!\033[0m");
            testReport.pass("Step 4 Passed");

            //Controllare che la memoria sia corretta (512 gb | 8 gb)
            WebElement galaxyMemory = DriverUtils.getWebElement(By.cssSelector("#storage > div.hubble-product__options-content > ul > li:nth-child(3) > " +
                    "div.s-option-box.hubble-pd-radio.js-radio-wrap.is-checked > label > span.s-label > span > span.s-rdo-text"));
            assertTrue(DriverUtils.ifElementExist(galaxyMemory, "512GB | 8GB"),"La memoria richiesta è errata!");
            assert galaxyMemory != null;
            logger.info("\033[33mLa memoria " + galaxyMemory.getText() + " è corretta!\033[0m");

            //Opzioni di pagamento sia selezionato ACQUISTA TRAMITE LA PAROLA IS-CHECKED
            WebElement buySelection = DriverUtils.getWebElement(By.xpath("//*[@id=\"purchase\"]/div[2]/div[1]/div/div[1]/div[1]/div/div"));
            assert buySelection != null;
            String buySelectionClass = buySelection.getAttribute("class");
            boolean isChecked = buySelectionClass.contains("is-checked");
            assertTrue(isChecked, "L'elemento non è ancora stato selezionato");
            logger.info("\033[33mLa sezione ACQUISTA è selezionata\033[0m");
            testReport.pass("Step 5 Passed");

            //Opzioni di pagamento sia selezionato ACQUISTA TRAMITE BACKGROUND COLOR
            WebElement bg = DriverUtils.getWebElement(By.cssSelector(".hubble-product__options.s-option-purchase .hubble-pd-radio.s-type-color3.is-checked .hubble-pd-radio__label"));
            assert bg != null;
            String backgroundColor = bg.getCssValue("background-color");
            assertEquals("rgba(33, 137, 255, 1)", backgroundColor, "L'elemento non ha il colore di sfondo corretto");
            logger.info("\033[33mLa sezione ACQUISTA è selezionata\033[0m");

            //Controllare che nella sezione del carrello il totale sia 1349,00 €
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
            logger.info("\033[33mIl totale è: " + newPriceText + "\033[0m");
            assertTrue(DriverUtils.ifElementExist(totalPrice, "1.349,00 €"),"Il prezzo totale è errato!");
            testReport.pass("Step 6 Passed");

            //Controllare che il modello sia rimasto quello selezionato in partenza (Galaxy S23+)
            Thread.sleep(2000);
            WebElement namePhone = DriverUtils.getWebElement(By.xpath("//h3[contains(text(),'Galaxy S23+')]"));
            assertTrue(DriverUtils.ifElementExist(namePhone, "Galaxy S23+"),"Il modello che stai acquistando è diverso!");
            logger.info("\033[33mFinalmente stai acquistando il tuo Galaxy S23+ \033[0m");
            testReport.pass("Step 7 Passed");
            testReport.tearDown();

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @AfterAll
    public static void tearDown() {
        driverUtils.close();
    }

}
