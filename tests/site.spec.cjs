const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

// Checks the lesson website (index.html + learn/) and the Markdown lessons it is built from.
(async () => {
  const root = path.join(__dirname, '..');
  const { PAGES_LIST } = require('../tools/build-site.cjs');

  // 1. Every lesson has a web page, and every local link or image in the Markdown and HTML exists.
  const problems = [];
  const checkFile = (file, re) => {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(re)) {
      const url = m[1];
      if (/^(https?:|mailto:|#|data:)/.test(url) || url.includes("'+")) continue;
      const target = path.normalize(path.join(path.dirname(file), url.split('#')[0]));
      if (!fs.existsSync(target)) problems.push(path.relative(root, file) + ' -> ' + url);
    }
  };
  const mdFiles = ['README.md', 'AGENTS.md', 'INTERACTIVE_COURSE_SETUP.md',
    ...fs.readdirSync(path.join(root, 'lessons')).map(f => 'lessons/' + f),
    ...['01_Start_Here', '02_GitHub_Desktop', '03_Work_With_AI', '04_Practice', '05_Help'].flatMap(d => fs.readdirSync(path.join(root, d)).map(f => d + '/' + f))];
  for (const f of mdFiles) {
    checkFile(path.join(root, f), /\]\(([^)\s]+)\)/g);
    checkFile(path.join(root, f), /<img src="([^"]+)"/g);
  }
  const htmlFiles = ['index.html', 'workflows.html', 'course.html', ...fs.readdirSync(path.join(root, 'learn')).map(f => 'learn/' + f)];
  for (const f of htmlFiles) checkFile(path.join(root, f), /(?:href|src)="([^"]+)"/g);
  assert.deepEqual(problems, [], 'Broken local links:\n' + problems.join('\n'));
  for (const p of PAGES_LIST) {
    assert(fs.existsSync(path.join(root, 'lessons', p.file + '.md')), 'Missing lesson ' + p.file);
    assert(fs.existsSync(path.join(root, 'learn', p.file + '.html')), 'Missing web page for ' + p.file);
  }

  // 2. The website works in a real browser.
  const outDir = path.join(root, 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => errors.push('Failed to load ' + r.url()));

  await page.goto('file://' + path.join(root, 'index.html'));
  assert(await page.getByRole('heading', { level: 1 }).isVisible());
  assert.equal(await page.locator('.cards .card').count(), 8, 'Home page should list eight lessons');
  await page.screenshot({ path: path.join(outDir, 'site-home.png'), fullPage: true });

  // Walk the whole path with the Next buttons.
  await page.getByRole('link', { name: 'Start lesson 1' }).click();
  for (let i = 0; i < PAGES_LIST.length; i++) {
    assert(page.url().endsWith('learn/' + PAGES_LIST[i].file + '.html'), 'Expected ' + PAGES_LIST[i].file + ', got ' + page.url());
    const broken = await page.evaluate(() => [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src));
    assert.deepEqual(broken, [], 'Images that did not load on ' + PAGES_LIST[i].file);
    if (i < PAGES_LIST.length - 1) await page.locator('.pager .next').click();
  }

  // Lesson 3 is made of step cards, each saying where it happens.
  await page.goto('file://' + path.join(root, 'learn', '03-your-first-project.html'));
  assert.equal(await page.locator('.step').count(), 6);
  assert.equal(await page.locator('.step .where').count(), 6);
  assert(await page.locator('img[src$="routes/first.svg"]').isVisible());
  await page.screenshot({ path: path.join(outDir, 'site-lesson-3.png'), fullPage: true });

  // Phones: no sideways scrolling on any page.
  await page.setViewportSize({ width: 390, height: 844 });
  for (const f of htmlFiles.filter(f => f === 'index.html' || f.startsWith('learn/'))) {
    await page.goto('file://' + path.join(root, f));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
    assert.equal(overflow, false, 'Mobile horizontal overflow on ' + f);
  }
  await page.goto('file://' + path.join(root, 'learn', '03-your-first-project.html'));
  await page.screenshot({ path: path.join(outDir, 'site-lesson-3-mobile.png'), fullPage: true });

  assert.deepEqual(errors, [], 'Browser errors: ' + errors.join(', '));
  console.log('PASS: ' + mdFiles.length + ' Markdown files and ' + htmlFiles.length + ' web pages with no broken links; full lesson path, step cards, images and mobile layouts');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
