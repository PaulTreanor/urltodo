import { test, expect } from '@playwright/test';

const urlListWithTitleAndItems = "http://localhost:8080/#eyJ0YXNrcyI6W3siaWQiOiIxNzQyOTM5OTE1MDA1IiwidGV4dCI6IkFwcGxlcyIsImNvbXBsZXRlZCI6ZmFsc2V9LHsiaWQiOiIxNzQyOTM5OTE1MTU0IiwidGV4dCI6Ik9yYW5nZXMiLCJjb21wbGV0ZWQiOnRydWV9LHsiaWQiOiIxNzQyOTM5OTE1NDM4IiwidGV4dCI6IkJhbmFuYXMiLCJjb21wbGV0ZWQiOmZhbHNlfV0sInRpdGxlIjoiU2hvcHBpbmcgbGlzdCJ9";

test.describe('Test list interactions', () => {
  test('- editing the title', async ({ page }) => {
    await page.goto(urlListWithTitleAndItems);

    await page.getByRole('heading', { name: 'Shopping list' }).click();
    await page.getByRole('textbox', { name: 'Untitled List' }).fill('To do list');
    await page.getByRole('textbox', { name: 'Untitled List' }).press('Enter');
  
    await expect(page).toHaveTitle("To do list | urltodo");
    await expect(page.getByRole('heading', { name: 'To do list' })).toBeVisible();
  });

  test('- checking and unchecking items', async ({ page }) => {
    await page.goto(urlListWithTitleAndItems);

    await expect(page.getByLabel('Oranges')).toBeChecked();
    await page.getByRole('checkbox', { name: 'Oranges' }).click();
    await expect(page.getByLabel('Oranges')).not.toBeChecked();

    await expect(page.getByLabel('Apples')).not.toBeChecked();
    await page.getByRole('checkbox', { name: 'Apples' }).click();
    await expect(page.getByLabel('Apples')).toBeChecked();
  });

  test('- removing a list item', async ({ page }) => {
    await page.goto(urlListWithTitleAndItems);

    await expect(page.getByText('Oranges')).toBeVisible(); 
    await page.getByRole('listitem').filter({ hasText: 'Oranges' }).getByRole('button').click();
    await expect(page.getByText('Oranges')).not.toBeVisible();
  });
})