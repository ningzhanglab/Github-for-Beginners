const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

// Checks the guide page (index.html: one story, start to finish) and the Markdown lessons.
(async () => {
  const root = path.join(__dirname, '..');
  const { story } = require('../tools/build-guide.cjs');
  const steps = story.steps;
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  // 1. Every local link and image in the Markdown files exists.
  const problems = [];
  const check = (file, re) => {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(re)) {
      const url = m[1];
      if (/^(https?:|mailto:|#|data:)/.test(url)) continue;
      const target = path.normalize(path.join(path.dirname(file), url.split('#')[0]));
      if (!fs.existsSync(target)) problems.push(path.relative(root, file) + ' -> ' + url);
    }
  };
  const mdFiles = ['README.md', 'AGENTS.md', 'INTERACTIVE_COURSE_SETUP.md',
    ...fs.readdirSync(path.join(root, 'lessons')).map(f => 'lessons/' + f),
    ...['01_Start_Here', '02_GitHub_Desktop', '03_Work_With_AI', '04_Practice', '05_Help'].flatMap(d => fs.readdirSync(path.join(root, d)).map(f => d + '/' + f))];
  for (const f of mdFiles) {
    check(path.join(root, f), /\]\(([^)\s]+)\)/g);
    check(path.join(root, f), /<img src="([^"]+)"/g);
  }
  assert.deepEqual(problems, [], 'Broken local links:\n' + problems.join('\n'));

  // 2. The story data is consistent: every step has the three places, and the active one exists.
  for (const [i, s] of steps.entries()) {
    for (const k of ['folder', 'desktop', 'web']) assert(s[k], 'Step ' + (i + 1) + ' is missing ' + k);
    assert(['folder', 'desktop', 'web'].includes(s.active), 'Step ' + (i + 1) + ' has no active place');
    assert(s.do.length > 0, 'Step ' + (i + 1) + ' has no "Do this"');
  }

  // 3. index.html is one self-contained page, and every in-page link has a target.
  assert(!/<script[^>]+src=/.test(html), 'No external scripts allowed');
  assert(!/<img[^>]+src="(?!data:)/.test(html), 'Images must be embedded');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const missing = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]))].filter(id => !ids.has(id));
  assert.deepEqual(missing, [], 'In-page links without a target');
  for (const f of [...html.matchAll(/href="(?!#|https?:|mailto:|data:)([^"]+)"/g)].map(m => m[1])) {
    assert(fs.existsSync(path.join(root, f)), 'Missing linked file ' + f);
  }

  // 4. The page works in a real browser.
  const outDir = path.join(root, 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(root, 'index.html'));
  await page.screenshot({ path: path.join(outDir, 'guide-top.png') });

  // Every step shows all three places, with exactly one marked as "this step".
  assert.equal(await page.locator('section.step').count(), steps.length);
  for (let i = 1; i <= steps.length; i++) {
    assert.equal(await page.locator(`#step-${i} .pane`).count(), 3, 'Step ' + i + ' should show three places');
    assert.equal(await page.locator(`#step-${i} .pane.active`).count(), 1, 'Step ' + i + ' should highlight one place');
  }
  // The story shows the key moments: out-of-date folder, a pull request, and the AI's caught mistake.
  assert(await page.locator('#step-6 .pane-folder .flag').isVisible(), 'Step 6 shows the folder is out of date');
  assert.equal(await page.locator('#step-10 .status').innerText(), 'Open');
  assert.equal(await page.locator('#step-11 .status').innerText(), 'Merged');
  assert(await page.locator('#step-14 .pr-file.warn').isVisible(), 'Step 14 shows the AI’s mistake');

  // The contents follows you.
  await page.locator('.side a[data-nav="step-8"]').click();
  await page.waitForTimeout(200);
  assert.equal(await page.locator('.side a[data-nav="step-8"]').getAttribute('aria-current'), 'step');
  await page.locator('#step-14').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.getElementById('step-14').scrollIntoView());
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, 'guide-step-14.png') });

  // Phones: no sideways scrolling; the active place comes first; the step menu works.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('file://' + path.join(root, 'index.html#step-6'));
  await page.waitForTimeout(200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
  assert.equal(overflow, false, 'Sideways scrolling on a phone');
  const firstPane = await page.evaluate(() => {
    const panes = [...document.querySelectorAll('#step-6 .pane')];
    return panes.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0].className;
  });
  assert(firstPane.includes('active'), 'On phones the active place should come first');
  assert((await page.locator('#jumpLabel').innerText()).startsWith('Step 6 of'));
  await page.locator('.jump summary').click();
  await page.locator('.jump a[data-nav="step-12"]').click();
  await page.waitForTimeout(200);
  assert((await page.locator('#jumpLabel').innerText()).startsWith('Step 12 of'));
  await page.screenshot({ path: path.join(outDir, 'guide-mobile.png') });

  assert.deepEqual(errors, [], 'Browser errors: ' + errors.join(', '));
  console.log('PASS: ' + mdFiles.length + ' Markdown files with no broken links; ' + steps.length + ' story steps, each with three places and one highlighted; key moments, contents and phone layout');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
