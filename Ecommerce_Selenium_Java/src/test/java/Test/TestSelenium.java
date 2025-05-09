package Test;

import Test.utils.DriverUtils;
import Test.utils.TestReport;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static Test.utils.DriverUtils.assertTrueCustom;
import static org.junit.jupiter.api.Assertions.*;

public class TestSelenium {

    private static DriverUtils driverUtils;
    private static WebDriver driver;
    private static WebDriverWait wait;
    private static TestReport testReport;
    private static final Logger logger = Logger.getLogger(TestSelenium.class.getName());

    @BeforeAll
    public static void setUpReport() {
        testReport = new TestReport();
        testReport.setupReport();
    }

    @BeforeEach
    public void setUp() {
        driverUtils = new DriverUtils();
        driverUtils.init();
        driver = DriverUtils.getDriver();
        wait = DriverUtils.getWait();
    }

    @Test
    void test2() {
        testReport.startTest("test2 - SELENIUM", "Verifica vari passaggi");

        // Controllare che tutte le sezioni di acquisto siano cliccabili
        WebElement categoryMenu = DriverUtils.getWebElement(By.id("categorymenu"));

        assert categoryMenu != null;
        var categoryMenuBar = categoryMenu.findElements(By.xpath(".//a"));
        var clickableSections = new ArrayList<WebElement>();
        for (WebElement section : categoryMenuBar) {
            if (!section.getText().isEmpty()) {
                clickableSections.add(section);
            }
        }
        for (WebElement sectionHref : clickableSections) {
            String href = "";
            assertTrue(DriverUtils.hrefContains(sectionHref, href), "Sezione non cliccabile");
            logger.info("\033[33mSezione cliccabile: " + sectionHref.getText() + "\033[0m");
        }

        // Selezionare la prima sezione di acquisto (APPAREL & ACCESSORIES)
        List<WebElement> apparelEAccessories = categoryMenu.findElements(By.xpath("//*[@id=\"categorymenu\"]/nav/ul/li[2]/a"));
        WebElement firstElement = apparelEAccessories.get(0);
        firstElement.click();

        assertTrueCustom(testReport, DriverUtils.titleInPage("Apparel & accessories"),
                "Hai cliccato il primo elemento di Apparel & accessories", "Non hai cliccato il primo elemento di Apparel & accessories");

        // Cliccare sul primo prodotto di apparelEAccessories
        DriverUtils.clickElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div[1]/div[2]/div[3]/a/i"));

        assertTrueCustom(testReport, DriverUtils.titleInPage("New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals"),
                "Hai cliccato il primo prodotto di Apparel & accessories", "Non hai cliccato sul primo prodotto di apparelEAccessories");

        // Inserire nel carrello il primo elemento una volta (AGGIUNTA SELEZIONE DELLA TAGLIA 3 UK)
        DriverUtils.clickElement(By.xpath("//*[@id=\"option344747\"]"));

        DriverUtils.clickElement(By.xpath("//*[@id=\"product\"]/fieldset/div[6]/ul/li/a"));

        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Hai inserito il primo elemento al carrello e non hai selezionato la taglia",
                "Non hai inserito il primo elemento al carrello e non hai selezionato la taglia");

        // Selezionare la seconda sezione di acquisto (MAKEUP)
        DriverUtils.clickElement(By.xpath("//*[@id=\"categorymenu\"]/nav/ul/li[3]"));

        // Cliccare sul secondo elemento di makeUp
        DriverUtils.clickElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/ul/li[2]/div/a"));
        assertTrueCustom(testReport, DriverUtils.titleInPage("Eyes"), "Hai cliccato il secondo elemento di MakeUp",
                "Non hai cliccato il secondo elemento di MakeUp");

        // Cliccare sul terzo prodotto di makeUp
        DriverUtils.clickElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div[3]/div[2]/a/img"));
        assertTrueCustom(testReport, DriverUtils.titleInPage("Waterproof"), "Hai cliccato il terzo prodotto di MakeUp",
                "Non hai cliccato il terzo prodotto di MakeUp");

        // Inserire nel carrello il terzo elemento 3 volte
        DriverUtils.writeText(By.xpath("//*[@id=\"product_quantity\"]"), "3");

        WebElement addToCartButton = DriverUtils.getWebElement(By.xpath("//*[@id=\"product\"]/fieldset/div[5]/ul/li/a"));
        assert addToCartButton != null;
        addToCartButton.click();
        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Hai inserito il terzo elemento per 3 volte nel carrello",
                "Non hai inserito il terzo elemento per 3 volte nel carrello");

        // Selezionare il carrello
        WebElement cartLink = DriverUtils.getWebElement(By.xpath("//*[@id=\"main_menu_top\"]/li[3]/a/span"));
        assert cartLink != null;
        cartLink.click();

        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Hai cliccato il carello",
                "Non hai cliccato il carello");

        // Controllare che il prezzo visualizzato nella home sia uguale al sub-totale nella sezione del carrello
        WebElement prizeHome = DriverUtils.getWebElement(By.xpath("//*[@id=\"top_cart_product_list\"]/table/tbody/tr[1]/td[2]/span"));
        WebElement subTotal = DriverUtils.getWebElement(By.xpath("//*[@id=\"totals_table\"]/tbody/tr[1]"));

        assert subTotal != null;
        assertTrueCustom(testReport, DriverUtils.ifElementExist(prizeHome, subTotal.getText()), "Il prezzo è uguale!",
                "Il prezzo è diverso");
        logger.info("\033[33mIl subtotal dell'items è uguale al subtotal del carrello\033[0m");

        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Il prezzo del carrello e il sub-totale sono uguali",
                "Controlla che il prezzo del carrello e il sub-totale siano uguali");

        // Controllare che la somma del prezzo compreso di spedizione sia uguale al totale nel carrello
        prizeHome = DriverUtils.getWebElement(By.xpath("//*[@id=\"top_cart_product_list\"]/table/tbody/tr[1]/td[2]/span"));
        WebElement Total = DriverUtils.getWebElement(By.xpath("//*[@id=\"totals_table\"]/tbody/tr[3]"));

        // CI ASPETTIAMO CHE L'ASSERZIONE SIA VERA POICHE' IL VALORE RESTITUITO DALLA COMPARAZIONE DEI PREZZI E' DIVERSA
        assert Total != null;
        assertTrueCustom(testReport, wait.until(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(prizeHome, Total.getText()))), "Il prezzo è diverso!",
                "Il prezzo è uguale");

        logger.info("\033[33mIl total dell'items è diverso al total del carrello\033[0m");

        // Rimuovere tutti gli elementi dal carrello
        DriverUtils.clickElement(By.xpath("//*[@id=\"main_menu_top\"]/li[3]/a/span"));
        DriverUtils.clickElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[7]/a"));
        DriverUtils.clickElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[7]/a"));

        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Hai rimosso tutti gli articoli dal carrello!",
                "Controlla che hai rimosso tutti gli elementi del carrello");

        // Controllare che il totale nella home sia uguale a 0
        prizeHome = DriverUtils.getWebElement(By.xpath("/html/body/div/header/div[2]/div/div[3]/ul/li/a/span[2]"));

        assertTrueCustom(testReport, DriverUtils.ifElementExist(prizeHome, "$0.00"), "il totale è $0.00",
                "il totale non è $0.00");

        logger.info("\033[33mIl totale è $0.00\033[0m");

        assertTrueCustom(testReport, DriverUtils.titleInPage("Shopping Cart"), "Il totale nella home è uguale a 0!",
                "Controlla che il totale nella home sia uguale a 0");

        // Controllare che nella sezione carrello non ci siano più elementi
        cartLink = DriverUtils.getWebElement(By.xpath("//*[@id=\"main_menu_top\"]/li[3]/a/span"));
        assert cartLink != null;
        cartLink.click();

        WebElement mainContainer = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div"));

        assertTrueCustom(testReport, wait.until(ExpectedConditions.visibilityOf(mainContainer)).isDisplayed(), "Il carrello è vuoto!",
                "Il carrello è ancora pieno!");

        logger.info("\033[33mIl carrello è vuoto!\033[0m");

        // Controllare che nella sezione carrello sia presente il testo "Your shopping cart is empty!"
        cartLink = DriverUtils.getWebElement(By.xpath("//*[@id=\"main_menu_top\"]/li[3]/a/span"));
        assert cartLink != null;
        cartLink.click();

        WebElement shoppingCartIsEmpty = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div"));
//            String[] shoppingCartIsEmptyText = shoppingCartIsEmpty.getText().split("\n");
//            String cartEmpty = shoppingCartIsEmptyText[0];
//            System.out.println(cartEmpty);
//            if (cartEmpty.equals("Your shopping cart is empty!")){
//                logger.info("La scritta richiesta è presente!");
//            } else {
//                logger.info("La scritta richiesta è assente!");
//            }
        assertTrueCustom(testReport, DriverUtils.ifElementExist(shoppingCartIsEmpty, "Your shopping cart is empty!"), "La scritta richiesta è presente!",
                "La scritta richiesta è assente!");

        logger.info("\033[33mLa scritta richiesta è presente!\033[0m");
    }

    @Test
    void test3() {
        try {
            // cliccare sulla ricerca
            DriverUtils.clickElement(By.xpath("//*[@id=\"filter_keyword\"]"));

            //controlla che il campo esiste, scrivere makeUp e cliccarlo
            By existField = By.id("filter_keyword");
            DriverUtils.writeText(existField, "makeUp");
            DriverUtils.clickElement(By.xpath("//*[@id=\"search_form\"]/div/div/i"));
            logger.info("\033[33mHai scritto makeUp sulla barra di ricerca\033[0m");

            //selezionare il secondo item recuperato
            WebElement secondElement = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[3]/div[2]/div[2]/a/img"));
            assert secondElement != null;
            secondElement.click();
            logger.info("\033[33mHai selezionato" + secondElement + "\033[0m");

            //cliccare su add to cart
            WebElement addToShoppingCart = DriverUtils.getWebElement(By.xpath("//*[@id=\"product\"]/fieldset/div[4]/ul/li/a"));
            assert addToShoppingCart != null;
            addToShoppingCart.click();
            assertTrue(DriverUtils.titleInPage("Shopping Cart"), "Controlla che l'elemento è stato aggiunto");

            //fare check che sul carrello ho 1 elemento
            WebElement shoppingCartWith1Element = DriverUtils.getWebElement(By.xpath("/html/body/div/header/div[2]/div/div[3]/ul/li/a/span[1]"));
            assert shoppingCartWith1Element != null;
            String shoppingCartText = shoppingCartWith1Element.getText();
            assertTrue(shoppingCartText.contains("1"), "Il numero di elementi nel carrello non è 1!");
            logger.info("\033[33mUn articolo aggiunto correttamente!\033[0m");
            assertTrue(DriverUtils.titleInPage("Shopping Cart"), "Controlla che nella sezione carrello sia presente il prodotto scelto");

            //rimuovere l'elemento dal carrello
            WebElement removeElement = DriverUtils.getWebElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[7]/a"));
            assert removeElement != null;
            removeElement.click();
            assertTrue(DriverUtils.titleInPage("Shopping Cart"), "Controlla che hai rimosso l'elemento dal carrello");

            //fare check che sul carrello ho 0 elementi
            WebElement mainContainer = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div"));
            assertTrue(wait.until(ExpectedConditions.visibilityOf(mainContainer)).isDisplayed(), "Il carrello è ancora pieno!");
            logger.info("\033[33mIl carrello è vuoto!\033[0m");
            assertTrue(DriverUtils.titleInPage("Shopping Cart"), "Controlla che nella sezione carrello non ci siano più elementi");

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @Test
    void test4() {
        try {
            //cliccare su books
            WebElement books = DriverUtils.getWebElement(By.xpath("//*[@id=\"categorymenu\"]/nav/ul/li[8]/a"));
            assert books != null;
            books.click();
            assertTrue(DriverUtils.titleInPage("Books"), "Non hai cliccato il primo elemento di Apparel & accessories");

            //salvare su un elemento il primo item recuperato
            List<WebElement> firstList = DriverUtils.getWebElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[3]"));
            assert firstList != null;
            WebElement firstItem = firstList.get(0);
            logger.info("\033[33mPrimo elemento della lista: \033[0m" + firstItem.getText());

            //cambiare ordine di visualizzazione mettendo "rating lowest"
            DriverUtils.clickElement(By.xpath("//*[@id=\"categorymenu\"]/nav/ul/li[8]"));

            WebElement sortDropdown = DriverUtils.getWebElement(By.id("sort"));
            assert sortDropdown != null;
            sortDropdown.click();
            List<WebElement> sortDropdownRatingLowest = sortDropdown.findElements(By.xpath("//*[@id=\"sort\"]/option"));

            for (WebElement element : sortDropdownRatingLowest){
                if (element.getText().equals("Rating Lowest")){
                    element.click();
                    break;
                }
            }

            //salvare su un elemento il primo item recuperato
            List<WebElement> secondList = DriverUtils.getWebElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[3]"));
            assert secondList != null;
            WebElement newFirstItem = secondList.get(0);
            logger.info("\033[33mPrimo elemento della nuova lista ordinata per prezzo: \033[0m" + newFirstItem.getText());

            //controllare che il primo item sia diverso dal secondo item
            assertNotEquals(firstItem, newFirstItem, "Gli elementi sono uguali dopo la modifica dell'ordinamento");

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }

    }

    @Test
    void test5() {
        try {
            //fare uno scroll in basso alla pagina web
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

            // cliccare su "site map" (lo scroll si ferma quando trova l'elemento "site map")
            WebElement siteMap = DriverUtils.getWebElement(By.linkText("Site Map"));
            js.executeScript("arguments[0].click();", siteMap);
            logger.info("\033[33mHai cliccato su Site Map\033[0m");

            //trovare il testo "shampoo" e cliccare
            WebElement shampooElement = DriverUtils.getWebElement(By.linkText("Shampoo"));
            assert shampooElement != null;
            shampooElement.click();

            //cliccare l'item con test "Eau Parfumee au The Vert Shampoo" CASE INSENSITIVE
            String linkText = "Eau Parfumee au The Vert Shampoo";
            WebElement parfume = DriverUtils.getWebElement(By.xpath("//a[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + linkText.toLowerCase() + "')]"));
            assert parfume != null;
            parfume.click();

            //controllare che il model sia 522823
            WebElement model = DriverUtils.getWebElement(By.xpath("//*[@id=\"description\"]/ul/li[2]"));
            assertTrue(DriverUtils.ifElementExist(model, "522823"),"Il model richiesto è assente!");
            assert model != null;
            logger.info("\033[33mIl " + model.getText() + " è stato trovato!\033[0m");

            // controllare che ci sia il button add to cart
            WebElement addToCartButton = DriverUtils.getWebElement(By.xpath("//*[@id=\"product\"]/fieldset/div[4]/ul/li/a"));
            assertFalse(DriverUtils.ifElementExist(addToCartButton, "Il pulsante Add to Cart non è stato trovato!"));

            //controllare che ci sia il button print
            WebElement printButton = DriverUtils.getWebElement(By.xpath("//*[@id=\"product\"]/fieldset/div[4]/a"));
            assertFalse(DriverUtils.ifElementExist(printButton, "Il pulsante Print non è stato trovato!"));

            //controllare che la description non sia vuota
            WebElement description = DriverUtils.getWebElement(By.xpath("//*[@id=\"description\"]/p"));
            assert description != null;
            assertFalse(description.getText().isEmpty(), "La descrizione è vuota!");
            logger.info("\033[33mLa descrizione è: " + description.getText() + "\033[0m");


        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @Test
    void test6() {
        try {
            // creare un nuovo account
            DriverUtils.clickElement(By.xpath("//*[@id=\"customer_menu_top\"]/li/a"));

            DriverUtils.clickElement(By.xpath("//*[@id=\"accountFrm\"]/fieldset/button"));

            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_firstname\"]"), "Gustavo");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_lastname\"]"), "La Pasta");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_email\"]"), "gustavolapasta@hotmail.it");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_telephone\"]"), "166 10 10 10");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_address_1\"]"), "Via le dita dal naso 5");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_city\"]"), "Grottascura");

            // Seleziona il paese scorrendo la lista
            WebElement countryDropdown = DriverUtils.getWebElement(By.id("AccountFrm_country_id"));
            assert countryDropdown != null;
            countryDropdown.click();
            List<WebElement> selectedCountry = countryDropdown.findElements(By.xpath("//*[@id=\"AccountFrm_country_id\"]/option"));

            for (WebElement element : selectedCountry){
                if (element.getText().equals("Italy")){
                    element.click();
                    break;
                }
            }

            // Seleziona la regione scorrendo la lista
            WebElement regionDropdown = DriverUtils.getWebElement(By.id("AccountFrm_zone_id"));
            assert regionDropdown != null;
            regionDropdown.click();
            List<WebElement> selectedRegion = regionDropdown.findElements(By.xpath("//*[@id=\"AccountFrm_zone_id\"]/option"));

            for (WebElement element : selectedRegion){
                if (element.getText().equals("Bolzano")){
                    element.click();
                    break;
                }
            }

            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_postcode\"]"), "12345");

            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_loginname\"]"), "GustavoTanto");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_password\"]"), "gigino1234!!?");
            DriverUtils.writeText(By.xpath("//*[@id=\"AccountFrm_confirm\"]"), "gigino1234!!?");

            DriverUtils.clickElement(By.xpath("//*[@id=\"AccountFrm_newsletter0\"]"));
            DriverUtils.clickElement(By.xpath("//*[@id=\"AccountFrm_agree\"]"));

            DriverUtils.clickElement(By.xpath("//*[@id=\"AccountFrm\"]/div[5]/div/div/button"));
            logger.info("\033[33mInseriti tutti i dati per la registrazione e click su Continue\033[0m");

            // controllare che la creazione sia avvenuta con successo (ESEGUIAMO IL LOGIN)

            DriverUtils.clickElement(By.xpath("//*[@id=\"customer_menu_top\"]/li/a"));
            DriverUtils.writeText(By.xpath("//*[@id=\"loginFrm_loginname\"]"), "GustavoTanto");
            DriverUtils.writeText(By.xpath("//*[@id=\"loginFrm_password\"]"), "gigino1234!!?");
            DriverUtils.clickElement(By.xpath("//*[@id=\"loginFrm\"]/fieldset/button"));

            WebElement model = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div[1]/div/h1"));
            assertTrue(DriverUtils.ifElementExist(model, "Gustavo"),"L'utente è errato, effettuare una nuova registrazione o controllare login!");

            logger.info("\033[33mEffettuata login per controllare l'avvenuta creazione controllando il nome di chi effettua l'accesso\033[0m");

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @Test
    void test7() {
        try {
            //cliccare su specials
            DriverUtils.clickElement(By.xpath("//*[@id=\"main_menu_top\"]/li[1]/a/span"));

            //controllare che ci sia l'item "sale" negli elementi recuperati
            List<WebElement> specialItemsList = DriverUtils.getWebElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]"));

            boolean allContainElement = true;
            assert specialItemsList != null;
            for (WebElement wordSale : specialItemsList) {
                List<WebElement> elements = wordSale.findElements(By.className("sale"));
                if (elements.size() == 0) {
                    allContainElement = false; // se trovo un elemento che non ha la classe Sale nella lista, setto la variabile a false.
                    break;
                }
                logger.info("\033[33mTutti gli elementi della lista hanno la classe sale al loro interno\033[0m");
            }
            assertTrue(allContainElement, "L'elemento Sale non è presente in ogni elemento della lista Special");

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @Test
    void test8() {
        try {

            //cliccare sulla barra di ricerca e scrivere "qwerty"
            DriverUtils.writeText(By.xpath("//*[@id=\"filter_keyword\"]"), "qwerty");
            DriverUtils.clickElement(By.xpath("//*[@id=\"search_form\"]/div/div/i"));

            //controllare che nessun risultato sia recuperato
            WebElement emptyResults = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]"));
            assertTrue(DriverUtils.ifElementExist(emptyResults, "There is no product that matches the search criteria."),"La scritta richiesta è assente!");

            logger.info("\033[33mNon hai trovato nessun risultato per 'qwerty'\033[0m");


        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }

    @Test
    void test9() {
        try {

            //cliccare su men
            DriverUtils.clickElement(By.xpath("//*[@id=\"categorymenu\"]/nav/ul/li[6]/a"));

            //cambiare ordine di visualizzazione degli elementi recuperati
            WebElement sortDropdown = DriverUtils.getWebElement(By.id("sort"));
            assert sortDropdown != null;
            sortDropdown.click();
            List<WebElement> sortDropdownDate = sortDropdown.findElements(By.xpath("//*[@id=\"sort\"]/option"));

            for (WebElement element : sortDropdownDate){
                if (element.getText().equals("Date New > Old")){
                    element.click();
                    break;
                }
            }

            //controllare che adesso si veda il button "view" ed il button "write review"
            List<WebElement> itemList = DriverUtils.getWebElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div"));
            Actions action = new Actions(driver);

            assert itemList != null;
            for (WebElement item : itemList) {
                action.moveToElement(item).perform();

                if (item.findElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div[4]/div[2]/div[1]/a[1]")).size() > 0 &&
                        item.findElements(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div[4]/div[2]/div[1]/a[2]")).size() > 0) {
                    System.out.println("View and Write Review buttons are visible for item: " + item.getText());
                } else {
                    System.out.println("View and Write Review buttons are NOT visible for item: " + item.getText());
                }
            }

            //aggiungere il primo elemento al carrello
            DriverUtils.clickElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div/div[2]/div[1]/div[2]/a/img"));
            DriverUtils.clickElement(By.xpath("//*[@id=\"product\"]/fieldset/div[4]/ul/li/a"));

            //aprire il carrello
            DriverUtils.clickElement(By.xpath("//*[@id=\"main_menu_top\"]/li[3]/a/span"));

            //salvare il prezzo in una variabile
            WebElement oldPrice = DriverUtils.getWebElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[6]"));
            assert oldPrice != null;
            String oldPriceText = oldPrice.getText();
            logger.info("\033[33mIl primo prezzo del totale è: " + oldPriceText + "\033[0m");

            //modificare la quantity da 1 a 2
            DriverUtils.writeText(By.xpath("//*[@id=\"cart_quantity75\"]"), "2");

            //cliccare sul button update
            DriverUtils.clickElement(By.xpath("//*[@id=\"cart_update\"]"));

            //salvare il nuovo prezzo in una seconda variabile
            WebElement newPrice = DriverUtils.getWebElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[6]"));
            assert newPrice != null;
            String newPriceText = newPrice.getText();
            logger.info("\033[33mIl secondo prezzo del totale è: " + newPriceText + "\033[0m");

            //controllare che il primo prezzo sia minore del secondo prezzo
            oldPriceText = oldPriceText.replace("$", ""); // trasformiamo il primo prezzo in valori numerici
            double oldPriceValue = Double.parseDouble(oldPriceText);

            newPriceText = newPriceText.replace("$", ""); // trasformiamo il secondo prezzo in valori numerici
            double newPriceValue = Double.parseDouble(newPriceText);

            if (oldPriceValue < newPriceValue) {
                logger.info("\033[33mil primo prezzo " + oldPriceValue + " è minore del secondo " + newPriceValue + "\033[0m");
            }

            //rimuovere i due item inseriti nel carrello
            DriverUtils.clickElement(By.xpath("//*[@id=\"cart\"]/div/div[1]/table/tbody/tr[2]/td[7]/a"));

            //controllare che compaia l'elemento col testo "your shopping cart is empty!"
            WebElement shoppingCartIsEmpty = DriverUtils.getWebElement(By.xpath("//*[@id=\"maincontainer\"]/div/div/div/div"));
            assertTrue(DriverUtils.ifElementExist(shoppingCartIsEmpty, "Your shopping cart is empty!"),"La scritta richiesta è assente!");
            logger.info("\033[33mIl carrello è vuoto!\033[0m");

        } catch (Exception e) {
            // Se qualcosa va in errore, cattura l'eccezione e stampa il messaggio di errore insieme allo screenshot
            logger.warning("Errore: " + e.getMessage());
            DriverUtils.takeScreenshot(driver, "../takeScreenshotTestFailure/test.png");
            fail();
        }
    }
    @AfterAll
    public static void teardown() {
        driverUtils.close();
        testReport.tearDown();
    }
}
