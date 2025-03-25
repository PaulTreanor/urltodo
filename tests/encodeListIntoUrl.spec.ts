import { test, expect } from '@playwright/test';

const urlListWithJustTitle = "http://localhost:8080/#eyJ0YXNrcyI6W10sInRpdGxlIjoiU2hvcHBpbmcgbGlzdCJ9"

test.describe('Create URL from list', () => {
  test('- give list a name', async ({ page }) => {
    await page.goto("http://localhost:8080/");

    await page.getByRole('heading', { name: 'Untitled List' }).click();
    await page.getByRole('textbox', { name: 'Untitled List' }).fill('Shopping list');
    await page.getByRole('textbox', { name: 'Untitled List' }).press('Enter')
  
    await expect(page).toHaveTitle("Shopping list | urltodo");

	  await expect(page.url()).toBe(urlListWithJustTitle);
  });

  test('- add list items to url', async ({ browser, page }) => {
    await page.goto(urlListWithJustTitle);
  
    await expect(page).toHaveTitle("Shopping list | urltodo");

    await page.getByRole('textbox', { name: 'Add a new task' }).click();
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Apples');
    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByRole('textbox', { name: 'Add a new task' }).click();
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Oranges');
    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByRole('checkbox', { name: 'Oranges' }).click();

    await page.getByRole('textbox', { name: 'Add a new task' }).click();
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Bananas');
    await page.getByRole('button', { name: 'Add' }).click();

    const generatedUrl = await page.url();

    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto(generatedUrl);
  
    // Testing that the generated URL is correct with a new page 
    // I can't just compare the generated URL with a known URL that creates that list 
    // because the task ids have a timestamp component which is encoded
    await expect(newPage.getByRole('heading')).toHaveText('Shopping list');
    await expect(newPage.getByLabel('Apples')).not.toBeChecked();
    await expect(newPage.getByLabel('Oranges')).toBeChecked();
    await expect(newPage.getByLabel('Bananas')).not.toBeChecked();
  
    // Clean up
    await newContext.close();

  });
})