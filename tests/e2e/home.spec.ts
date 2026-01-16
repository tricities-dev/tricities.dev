import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test('should load without errors', async ({ page }) => {
		// Collect console errors
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		const response = await page.goto('/');

		// Page should return 200
		expect(response?.status()).toBe(200);

		// Should not have critical JS errors (ignore network/favicon/RSS errors when Netlify functions aren't running)
		const criticalErrors = errors.filter(e =>
			!e.includes('favicon') &&
			!e.includes('net::') &&
			!e.includes('Failed to load resource') &&
			!e.includes('Error fetching RSS feeds') // Expected when not running Netlify functions
		);
		expect(criticalErrors).toHaveLength(0);
	});

	test('should have main page structure', async ({ page }) => {
		await page.goto('/');

		// Should have navbar (uses div.nav, not <nav>)
		const navbar = page.locator('div.nav');
		await expect(navbar).toBeVisible();

		// Should have main content area
		const main = page.locator('main');
		await expect(main).toBeVisible();

		// Should have footer
		const footer = page.locator('footer');
		await expect(footer).toBeVisible();
	});

	test('should display Member Feed section with content', async ({ page }) => {
		await page.goto('/');

		// Should have the member feed container
		const memberFeed = page.locator('#member-feed');
		await expect(memberFeed).toBeVisible();

		// Wait for loading to complete (either real feed or fallback)
		await page.waitForSelector('.member-feed-item', { timeout: 10000 });

		// Should have at least one feed item
		const feedItems = page.locator('.member-feed-item');
		const count = await feedItems.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should display Discord join section', async ({ page }) => {
		await page.goto('/');

		// Should have Discord card with CTA
		const discordCard = page.locator('.discord-card');
		await expect(discordCard).toBeVisible();

		// Should have Discord CTA link
		const discordLink = page.locator('a.discord-cta');
		await expect(discordLink).toBeVisible();
		await expect(discordLink).toHaveAttribute('href', 'https://discord.gg/B3JAaXvkCt');
	});

	test('should display Sponsors section', async ({ page }) => {
		await page.goto('/');

		// Should have sponsors container
		const sponsors = page.locator('#sponsors');
		await expect(sponsors).toBeVisible();

		// Should have sponsor links
		const sponsorLinks = page.locator('.sponsors-grid a');
		await expect(sponsorLinks).toHaveCount(3);
	});

	test('should have working theme system', async ({ page }) => {
		await page.goto('/');

		// HTML element should have data-theme attribute
		const html = page.locator('html');
		const theme = await html.getAttribute('data-theme');
		expect(['dark', 'light']).toContain(theme);
	});

	test('should display Hero with dual CTAs', async ({ page }) => {
		await page.goto('/');

		// Should have hero section
		const hero = page.locator('.hero');
		await expect(hero).toBeVisible();

		// Should have social proof text
		const socialProof = page.locator('.hero-social-proof');
		await expect(socialProof).toBeVisible();

		// Should have two CTAs (Meetup and Discord)
		const ctaButtons = page.locator('.hero-cta-group .cta-button');
		await expect(ctaButtons).toHaveCount(2);

		// First CTA should link to Meetup
		const meetupCta = ctaButtons.first();
		await expect(meetupCta).toContainText('Meetup');

		// Second CTA should link to Discord
		const discordCta = ctaButtons.nth(1);
		await expect(discordCta).toContainText('Discord');
		await expect(discordCta).toHaveAttribute('href', 'https://discord.gg/B3JAaXvkCt');
	});

	test('should have proper SEO meta tags', async ({ page }) => {
		await page.goto('/');

		// Check title contains key terms
		const title = await page.title();
		expect(title).toContain('TriDev');
		expect(title).toContain('Johnson City');

		// Check meta description
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description).toContain('developer meetup');
		expect(description).toContain('Johnson City');
	});
});
