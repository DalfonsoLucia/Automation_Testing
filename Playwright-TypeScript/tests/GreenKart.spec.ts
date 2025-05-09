import {test, expect} from '@playwright/test';

test('Calendar validations', async ({page}) => {

    const month: string = "August";
    //const monthNumber = "8";
    const date: any = 29;
    const year: string = "2027";
    //const dateNumber = "15";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
   

    await page.getByText(month).click();
    //puoi anche scrivere in questo modo 
    //await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    

    await page.getByText(date).nth(1).click();
    //Se volessimo inserire una data in cui numero è presente già nella pagina, inseriremo in ChroPath //abbr[text()='15']
    //scrivere nel nostro test await page.locator("//abbr[text()='"+dateNumber+"']").click();
    //abbr è l'attributo presente nel DOM, è il tag all'inizio del nodo dove è presente il aria-label (inserire parte del DOM)
   
    
    // Estrai il valore del mese
    const month_imput = await page.locator('.react-date-picker__inputGroup__month').inputValue();

    // Estrai il valore del giorno
    const day_imput = await page.locator('.react-date-picker__inputGroup__day').inputValue();

    // Estrai il valore dell'anno
    const year_imput = await page.locator('.react-date-picker__inputGroup__year').inputValue();

    // Combina i valori per ottenere la data completa
    const fullDate = `${year_imput}-${month_imput}-${day_imput}`;
    console.log(fullDate);

    const formattedFullDate = `${year_imput}-${String(month_imput).padStart(2, '0')}-${String(day_imput).padStart(2, '0')}`;
    console.log(formattedFullDate);

    // Esegui l'asserzione
    expect(formattedFullDate).toBe("2027-08-29"); // Usa toBe per confrontare direttamente le stringhe
});

test('Calendar validations_course', async ({page}) => {
    
    const monthNumber = "6";
    const date:string = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const inputs:any = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

});