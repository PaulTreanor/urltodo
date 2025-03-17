import { test, expect } from '@playwright/test';

const exampleListUrl = "http://localhost:8080/#eyJ0YXNrcyI6W3siaWQiOiIxNzQyMjAxOTQ4MDUwIiwidGV4dCI6IkFwcGxlcyIsImNvbXBsZXRlZCI6ZmFsc2V9LHsiaWQiOiIxNzQyMjAxOTUwNTg3IiwidGV4dCI6Ik9yYW5nZXMiLCJjb21wbGV0ZWQiOnRydWV9LHsiaWQiOiIxNzQyMjAxOTUzNjQzIiwidGV4dCI6IkJhbmFuYXMiLCJjb21wbGV0ZWQiOmZhbHNlfV0sInRpdGxlIjoiU2hvcHBpbmcgbGlzdCJ9"

test.describe('Render list from URL', () => {
  test('has list name in title', async ({ page }) => {
    await page.goto(exampleListUrl);
  
    await expect(page).toHaveTitle("Shopping list | urltodo");
  });

  test('has list name header', async ({ page }) => {
    await page.goto(exampleListUrl);
  
    await expect(page.getByText('Shopping list')).toBeVisible();
  });

  test('has list items', async ({ page }) => {
    await page.goto(exampleListUrl);
  
    await expect(page.locator('ul > li')).toContainText(['Apples', 'Oranges', 'Bananas']);
  });

  test('checks the state of list items', async ({ page }) => {
    await page.goto(exampleListUrl);

    // Check that the first list item (Apples) is not checked
    const firstItemCheckbox = page.locator('ul > li:nth-child(1) > button[role="checkbox"]');
    await expect(firstItemCheckbox).toHaveAttribute('aria-checked', 'false');

    // Check that the second list item (Oranges) is checked
    const secondItemCheckbox = page.locator('ul > li:nth-child(2) > button[role="checkbox"]');
    await expect(secondItemCheckbox).toHaveAttribute('aria-checked', 'true');

    // Check that the third list item (Bananas) is not checked
    const thirdItemCheckbox = page.locator('ul > li:nth-child(3) > button[role="checkbox"]');
    await expect(thirdItemCheckbox).toHaveAttribute('aria-checked', 'false');
  });
})