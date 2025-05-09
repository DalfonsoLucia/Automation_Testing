import {test, expect} from '@playwright/test';

test('Screenshot & Visual comparision', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'Screenshot/partialScreenshot.jpg'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'Screenshot/screenshot.jpg'})
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual Test', async ({page})=>
{
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
    
});

