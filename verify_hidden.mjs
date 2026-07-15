import { chromium } from 'playwright';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext()).newPage();
page.on('pageerror', (err) => console.log('[pageerror]', err.message));
await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
await page.locator('#agenda').scrollIntoViewIfNeeded();
await page.screenshot({ path: 'agenda-live.png' });
console.log('ok');
await browser.close();
