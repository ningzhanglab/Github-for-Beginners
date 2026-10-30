const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Browser test for workflows.html, the GitHub route map.
(async () => {
  const root = path.join(__dirname, '..');
  const file = path.join(root, 'workflows.html');
  const html = fs.readFileSync(file, 'utf8');
  const inline = html.match(/<script>([\s\S]*?)<\/script>/);
  assert(inline, 'Expected a standalone inline script');
  new vm.Script(inline[1]); // JavaScript syntax check.
  assert(!/<script[^>]+src=/.test(html), 'No external scripts allowed');
  const ids = [...html.split('<script>')[0].matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate static HTML id');

  // Every "Learn more" link must point to a file that exists in the repository.
  for (const m of inline[1].matchAll(/more:\["([^"]+)"/g)) {
    assert(fs.existsSync(path.join(root, m[1])), 'Missing linked lesson: ' + m[1]);
  }

  const outDir = path.join(root, 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('file://' + file);

  // Eight routes, each with a matching overview card.
  assert.equal(await page.locator('.line-btn').count(), 8);
  assert.equal(await page.locator('.mini').count(), 8);
  assert.equal(await page.locator('#routeName').innerText(), 'Create my first project');
  assert.equal(await page.locator('.stn').count(), 6);
  await page.screenshot({ path: path.join(outDir, 'workflows-desktop.png'), fullPage: true });

  // Stepping forward and back, by button, by station and by keyboard.
  assert(await page.locator('#prevStop').isDisabled());
  await page.locator('#nextStop').click();
  assert((await page.locator('#stopWhere').innerText()).startsWith('Step 2 of 6, in Your project folder'));
  await page.locator('.stn[data-stop="4"]').click();
  assert.equal(await page.locator('#stopTitle').innerText(), 'Publish to GitHub.com');
  await page.locator('body').press('ArrowLeft');
  assert.equal(await page.locator('#stopTitle').innerText(), 'Commit (save a checkpoint)');

  // Mac/Windows switch changes on-screen labels.
  await page.locator('.stn[data-stop="1"]').click();
  assert((await page.locator('#stopDo').innerText()).includes('Show in Finder'));
  await page.locator('[data-platform="win"]').click();
  assert((await page.locator('#stopDo').innerText()).includes('Show in Explorer'));
  assert.equal(await page.locator('[data-platform="win"]').getAttribute('aria-pressed'), 'true');

  // Choosing a route from the list or from the overview.
  await page.locator('.line-btn[data-line="cloudai"]').click();
  assert.equal(await page.locator('#routeName').innerText(), 'Let an AI assistant work on GitHub.com');
  assert((await page.locator('#stopWhere').innerText()).includes('GitHub.com'));
  await page.locator('#nextStop').click();
  assert((await page.locator('#stopWhere').innerText()).includes('the AI assistant does this'));
  assert(await page.locator('.stn.ai').count() >= 1);
  await page.locator('.mini[data-mini="fix"]').click();
  assert.equal(await page.locator('#routeName').innerText(), 'Fix a mistake');

  // The last step of a route offers the next route.
  for (let i = 0; i < 4; i++) await page.locator('#nextStop').click();
  assert.equal(await page.locator('#nextStop').innerText(), 'Back to start');

  // A shared link opens the right route.
  await page.goto('file://' + file + '#pr');
  assert.equal(await page.locator('#routeName').innerText(), 'Propose a change for review');

  // Narrow phones: vertical map and no sideways scrolling on any route.
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ['first', 'daily', 'update', 'pr', 'team', 'localai', 'cloudai', 'fix']) {
    await page.locator('.line-btn[data-line="' + id + '"]').click();
    await page.waitForTimeout(150);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
    assert.equal(overflow, false, 'Mobile horizontal overflow on route ' + id);
  }
  await page.screenshot({ path: path.join(outDir, 'workflows-mobile.png'), fullPage: true });
  assert.deepEqual(errors, [], 'Unexpected browser errors: ' + errors.join(', '));

  console.log('PASS: eight routes, overview, stepping, keyboard, Mac/Windows labels, deep links and mobile layouts');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
