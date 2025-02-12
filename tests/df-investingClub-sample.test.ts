import { test, expect } from '@playwright/test';

test('Validate Home Tab View of Investing Club with Articles', async ({ page }) => {
    // Step 1: Navigate to the DragonFi website
    await page.goto('https://dragonfi.com'); // Replace with the actual URL
    
    // Step 2: Click on Investing Club in the navigation bar
    await page.click('text=Investing Club');
    
    // Step 3: Verify the Home tab is active
    const homeTab = page.locator('text=Home');
    await expect(homeTab).toHaveClass(/active/);
    
    // Step 4: Validate Portfolio Banners
    const dividendBanner = page.locator('text=Dividend Harvest Portfolio');
    await expect(dividendBanner).toBeVisible();
    
    const strategicBanner = page.locator('text=Strategic Growth Portfolio');
    await expect(strategicBanner).toBeVisible();
    
    // Step 5: Validate Portfolio Image Placeholders (900x400)
    const imagePlaceholders = page.locator('img[src*="900x400"]');
    await expect(imagePlaceholders).toHaveCount(3);
    
    // Step 6: Verify at least three articles are visible
    const articles = page.locator('article');
    await expect(articles).toHaveCountGreaterThan(2);
    
    // Step 7: Validate each article contains title, timestamp, and description
    for (const article of await articles.all()) {
        await expect(article.locator('h2')).toBeVisible(); // Title
        await expect(article.locator('text=ago')).toBeVisible(); // Timestamp
        await expect(article.locator('p')).toBeVisible(); // Description
    }
    
    // Step 8: Validate SHOW MORE button loads more articles
    const showMoreButton = page.locator('text=SHOW MORE');
    if (await showMoreButton.isVisible()) {
        await showMoreButton.click();
        await expect(articles).toHaveCountGreaterThan(3);
    }
    
    // Step 9: Click an article and validate navigation
    const firstArticle = articles.first();
    const firstArticleTitle = await firstArticle.locator('h2').textContent();
    await firstArticle.click();
    await expect(page).toHaveURL(/article/);
    await expect(page.locator('h1')).toHaveText(firstArticleTitle);
});
