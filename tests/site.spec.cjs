const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

// Checks the one-page guide (index.html) and the Markdown lessons it is built from.
(async () => {
  const root = path.join(__dirname, '..');
  const { SECTIONS, LESSONS } = require('../tools/build-site.cjs');
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

  // 2. index.html is one self-contained page: no external scripts or images, every in-page link has a target.
  assert(!/<script[^>]+src=/.test(html), 'No external scripts allowed');
  assert(!/<img[^>]+src="(?!data:)/.test(html), 'Images must be embedded');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const missing = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]))].filter(id => !ids.has(id));
  assert.deepEqual(missing, [], 'In-page links without a target');
  for (const f of [...html.matchAll(/href="(?!#|https?:|mailto:|data:)([^"]+)"/g)].map(m => m[1])) {
    assert(fs.existsSync(path.join(root, f)), 'Missing linked file ' + f);
  }

  // 3. The page works in a real browser.
  const outDir = path.join(root, 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(root, 'index.html'));

  // Everything is on the page.
  for (const s of SECTIONS) assert.equal(await page.locator('#' + s.id).count(), 1, 'Missing section ' + s.id);
  assert.equal(await page.locator('section.lesson').count(), LESSONS.length);
  assert.equal(await page.locator('#lesson-3 .step').count(), 6, 'Lesson 3 should have six step cards');
  assert.equal(await page.locator('#lesson-3 .step .where').count(), 6, 'Every step says where it happens');
  assert(await page.locator('.route svg').count() >= 8, 'Route pictures are shown');
  await page.screenshot({ path: path.join(outDir, 'guide-top.png') });

  // The contents follows you, and "Next" moves down the page.
  await page.locator('.side a[data-nav="lesson-5"]').click();
  await page.waitForTimeout(200);
  assert.equal(await page.locator('.side a[data-nav="lesson-5"]').getAttribute('aria-current'), 'true');
  await page.locator('#lesson-5 .lesson-end .next').click();
  await page.waitForTimeout(200);
  assert.equal(await page.locator('.side a[data-nav="lesson-6"]').getAttribute('aria-current'), 'true');

  // Progress is remembered.
  await page.locator('[data-done="1"]').check();
  await page.locator('[data-done="2"]').check();
  assert.equal(await page.locator('#progressText').innerText(), '2 of ' + LESSONS.length + ' lessons done');
  await page.reload();
  assert.equal(await page.locator('#progressText').innerText(), '2 of ' + LESSONS.length + ' lessons done');
  assert(await page.locator('.side a[data-nav="lesson-1"].is-done').count() === 1);

  // Folded extras open when linked to.
  assert.equal(await page.locator('#dictionary details').getAttribute('open'), null);
  await page.locator('.side a[data-nav="dictionary"]').click();
  await page.waitForTimeout(200);
  assert.notEqual(await page.locator('#dictionary details').getAttribute('open'), null);
  await page.locator('#lesson-3').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(outDir, 'guide-lesson-3.png') });

  // Phones: no sideways scrolling, and the contents menu works.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('file://' + path.join(root, 'index.html#lesson-4'));
  await page.waitForTimeout(200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
  assert.equal(overflow, false, 'Sideways scrolling on a phone');
  assert((await page.locator('#mobileNavLabel').innerText()).startsWith('Lesson 4'));
  await page.locator('.mobile-nav summary').click();
  await page.locator('.mobile-nav a[data-nav="lesson-7"]').click();
  await page.waitForTimeout(200);
  assert((await page.locator('#mobileNavLabel').innerText()).startsWith('Lesson 7'));
  await page.screenshot({ path: path.join(outDir, 'guide-mobile.png') });

  assert.deepEqual(errors, [], 'Browser errors: ' + errors.join(', '));
  console.log('PASS: ' + mdFiles.length + ' Markdown files with no broken links; one self-contained page with ' + LESSONS.length + ' lessons and ' + (SECTIONS.length - LESSONS.length) + ' extras; contents, next buttons, progress, folded extras and phone menu');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
