package Test.utils;

import org.apache.commons.io.FileUtils;
import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.time.Duration;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DriverUtils {
    private static WebDriver driver;
    private final String baseUrl = "https://automationteststore.com";
    private final String googleUrl = "https://www.google.it";
    private static WebDriverWait wait;
    private final int waitTimeInSeconds = 30;
    private final Duration duration = Duration.ofSeconds(waitTimeInSeconds);
    private static final Logger logger = Logger.getLogger(DriverUtils.class.getName());

    public void init() {

        try {
            // Inizializza il driver di Chrome dinamico in base alla versione che trova di Chrome
            WebDriverManager.chromedriver().setup();

            // Avvia le opzioni
            ChromeOptions options = new ChromeOptions();

            // Aggiungi le opzioni che ti servono
            options.addArguments("--start-maximized");

            // Avvia il browser con le opzioni aggiuntive
            driver = new ChromeDriver(options);

            wait = new WebDriverWait(driver, duration);

            // Visita la pagina
            driver.get(baseUrl);

            logger.info("\033[33mBrowser avviato in " + baseUrl + "\033[0m");

        } catch (Exception e) {
            logger.severe("Errore durante l'inizializzazione del browser: " + e.getMessage());
        }
    }

    public void initGoogle() {
        try {
            // Inizializza il driver di Chrome dinamico in base alla versione che trova di Chrome
            WebDriverManager.chromedriver().setup();

            // Avvia le opzioni
            ChromeOptions options = new ChromeOptions();

            // Aggiungi le opzioni che ti servono
            options.addArguments("--start-maximized");

            // Avvia il browser con le opzioni aggiuntive
            driver = new ChromeDriver(options);

            wait = new WebDriverWait(driver, duration);

            // Visita la pagina
            driver.get(googleUrl);

            logger.info("\033[33mAccesso al sito " + driver.getCurrentUrl() + "\033[0m");

        } catch (Exception e) {
            logger.severe("Errore durante l'accesso al sito: " + e.getMessage());
        }
    }

    public static void takeScreenshot(WebDriver webdriver, String fileWithPath) {

        try {
            // Convertire l'oggetto driver Web in TakeScreenshot
            TakesScreenshot scrShot = ((TakesScreenshot) webdriver);

            // Chiamare il metodo getScreenshotAs per creare il file di immagine
            File srcFile = scrShot.getScreenshotAs(OutputType.FILE);

            // Spostare il file immagine nella nuova destinazione
            File destFile = new File(fileWithPath);

            // Copia il file a destinazione
            FileUtils.copyFile(srcFile, destFile);

            logger.warning("Screenshot fatto e salvato in " + fileWithPath);

        } catch (Exception e) {
            logger.severe("Errore durante la cattura dello screenshot: " + e.getMessage());
        }
    }

    public void close() {
        try {
            driver.quit();
            logger.info("\033[33mBrowser chiuso\033[0m");

        } catch (Exception e) {
            logger.severe("Errore durante la chiusura del browser: " + e.getMessage());
        }
    }

    public static WebElement getWebElement(By by) {
        try {
            return wait.until(driver -> driver.findElement(by));
        } catch (TimeoutException e) {
            System.err.println("Timed out: " + by);
            return null;
        } catch (NoSuchElementException e) {
            System.err.println("Elemento non trovato: " + by);
            return null;
        }
    }


    public static List<WebElement> getWebElements(By by) {
        try {
            return wait.until(driver -> driver.findElements(by));
        } catch (TimeoutException e) {
            System.err.println("Timed out: " + by);
            return null;
        } catch (NoSuchElementException e) {
            System.err.println("Elemento non trovato: " + by);
            return null;
        }
    }

    public static void clickElement(By by) {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(by)).click();
        } catch (TimeoutException e) {
            System.err.println("Timed out: " + by);

        } catch (NoSuchElementException e) {
            System.err.println("Elemento non trovato: " + by);

        }
    }

    public static boolean titleInPage(String expectedTitle) {
        try {
            return wait.until(ExpectedConditions.titleContains(expectedTitle));
        } catch (TimeoutException e) {
            System.err.println("Timed out: " + expectedTitle);
            return false;
        }
    }


    public static boolean hrefContains(WebElement element, String hrefValue) {
        try {
            return element.getAttribute("href").contains(hrefValue);
        } catch (NoSuchElementException | NullPointerException e) {
            return false;
        }
    }

    public static void writeText(By by, String text) {
        try {
            WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(by));
            element.clear();
            element.sendKeys(text);
        } catch (TimeoutException e) {
            System.err.println("Timed out: " + by);
        } catch (NoSuchElementException e) {
            System.err.println("Elemento non trovato: " + by);
        }
    }

    public static boolean ifElementExist(WebElement element, String text){
        try {
            String actualText = element.getText();
            return actualText.contains(text);
        } catch (NoSuchElementException | StaleElementReferenceException | NullPointerException e) {
            return false;
        }
    }

    public static String getElementText(By element) {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(element));
            return DriverUtils.getDriver().findElement(element).getText();
        } catch (NoSuchElementException | StaleElementReferenceException | TimeoutException e) {
            logger.log(Level.WARNING, "\033[33mImpossibile trovare l'elemento: " + element, e + "\033[0m");
            return "";
        }
    }

    public static void assertTrueCustom(TestReport testReport, boolean condition, String messagePass, String messageFail) {
        if (condition) {
            testReport.pass(messagePass);
        } else {
            testReport.fail(messageFail);
            Assert.fail(messageFail);
        }
    }

    public static WebDriver getDriver() {
        return driver;
    }

    public static WebDriverWait getWait() {
        return wait;
    }

}
