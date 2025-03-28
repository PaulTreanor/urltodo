import { test, expect } from '@playwright/test';


test.describe('Main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await expect(page).toHaveTitle(/urltodo/);
  });
  
  test('renders default list heading', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await expect(page.getByText('Untitled List')).toBeVisible();
  });
  
  test('renders copy url button', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await expect(page.getByRole('button', { name: 'Copy URL' })).toBeVisible();
  });

  test('has working link to documentation', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();

    await page.getByRole('link', { name: 'Documentation' }).click();

    // Confirm we're on docs page
    await expect(page.getByText('GitHub')).toBeVisible();
  })
})

test.describe('Docs page', () => {
  test('renders default list heading', async ({ page }) => {
    await page.goto('http://localhost:8080/docs');
  
    await expect(page.getByText('GitHub')).toBeVisible();
  });
  
  test('back to App link works', async ({ page }) => {
    await page.goto('http://localhost:8080/docs');
  
    await expect(page.getByRole('button', { name: 'Back to App' })).toBeVisible();

    await page.getByRole('button').click()

    // Confirms we are back on main app page
    await expect(page.getByText('Untitled List')).toBeVisible();
  });
})

test.describe('404 page', () => {
  test('renders page not found heading', async ({ page }) => {
    await page.goto('http://localhost:8080/fakepage');

    await expect(page.getByText('Page Not Found')).toBeVisible();
  });
  
  test('shows link to return to app main page', async ({ page }) => {
    await page.goto('http://localhost:8080/fakepage');

    const link = page.getByRole('link', { name: 'Create a new list' });

    await expect(link).toBeVisible();

    await link.click();
    // console log helps fixes weird test race condition lmao
    console.log('Clicked on Create a new list link');

    // Confirms we are back on main app page
    await expect(page.getByText('Untitled List')).toBeVisible();
  });
})

