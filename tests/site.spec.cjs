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
  for (const f of [...html.matchAll(/href="(?!#|https?:|mailto:|data:)([^"#]+)(#[^"]*)?"/g)].map(m => m[1])) {
    assert(fs.existsSync(path.join(root, f)), 'Missing linked file ' + f);
  }

  // 3b. The help page is also one self-contained page, with working in-page links and local links.
  const help = fs.readFileSync(path.join(root, 'help.html'), 'utf8');
  assert(!/<script[^>]+src=/.test(help), 'Help page: no external scripts allowed');
  assert(!/<img[^>]+src="(?!data:)/.test(help), 'Help page: images must be embedded');
  const helpIds = new Set([...help.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const helpMissing = [...new Set([...help.matchAll(/href="#([^"]+)"/g)].map(m => m[1]))].filter(id => !helpIds.has(id));
  assert.deepEqual(helpMissing, [], 'Help page: in-page links without a target');
  for (const f of [...help.matchAll(/href="(?!#|https?:|mailto:|data:)([^"#]+)(#[^"]*)?"/g)].map(m => m[1])) {
    assert(fs.existsSync(path.join(root, f)), 'Help page: missing linked file ' + f);
  }
  // Every "See step N" link and every "jump to" card points at a step or id that exists.
  for (const m of help.matchAll(/href="index\.html#step-(\d+)"/g)) assert(+m[1] >= 1 && +m[1] <= steps.length, 'Help page links to missing step ' + m[1]);
  for (const g of require('../tools/extras.cjs').goals) {
    if (g.step) assert(g.step >= 1 && g.step <= steps.length, 'Goal card points at missing step ' + g.step);
    else assert(fs.existsSync(path.join(root, g.href.split('#')[0])), 'Goal card points at missing page ' + g.href);
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

  // "Jump to what you need" cards go to the right steps.
  assert.equal(await page.locator('.goal').count(), require('../tools/extras.cjs').goals.length);
  assert.equal(await page.locator('.goal[href="#step-13"]').count(), 1, 'AI card should open step 13');
  await page.evaluate(() => window.scrollTo(0, 0));

  // Progress: tick a step, see it counted and remembered after a reload; "Continue" picks up at the next step.
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  assert(await page.locator('#progress').isHidden(), 'Progress should be hidden before any step is done');
  await page.locator('[data-done="1"]').click();
  await page.locator('[data-done="2"]').click();
  assert.equal(await page.locator('#progressText').innerText(), '2 of ' + steps.length + ' done');
  assert.equal(await page.locator('.side a[data-nav="step-1"]').getAttribute('class'), 'done');
  await page.reload();
  assert.equal(await page.locator('[data-done="2"]').getAttribute('aria-pressed'), 'true', 'Progress should survive a reload');
  assert.equal(await page.locator('#continueBtn').innerText(), 'Continue at step 3');
  assert.equal(await page.locator('#continueBtn').getAttribute('href'), '#step-3');
  assert(await page.locator('#startBtn').isHidden(), 'Start button should give way to Continue');
  await page.locator('[data-done="2"]').click();
  assert.equal(await page.locator('#continueBtn').innerText(), 'Continue at step 2', 'Un-ticking a step moves Continue back');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Pop-up definitions: the first use of a word in a step is a button that explains it.
  const term = page.locator('#step-3 .term').first();
  assert(await term.count() > 0, 'Step 3 should have a pop-up word');
  await term.hover();
  assert(await page.locator('#tip').isVisible(), 'Hovering a word should show its meaning');
  assert((await page.locator('#tip').innerText()).length > 20, 'The pop-up should contain a definition');
  await page.keyboard.press('Escape');
  assert(await page.locator('#tip').isHidden(), 'Escape should close the pop-up');
  assert.equal(await page.locator('#step-3 .term[data-term="commit"]').count() <= 1, true, 'Each word is explained once per step');
  assert.equal(await page.locator('.step b.ui .term, .step code .term').count(), 0, 'Button labels and file names are never turned into pop-ups');

  // The help page: search narrows the answers; "no match" appears; print and links work.
  await page.goto('file://' + path.join(root, 'help.html'));
  const total = await page.locator('tr[data-s]').count();
  assert(total > 40, 'Help page should list many answers, found ' + total);
  await page.fill('#q', 'conflict');
  const shown = await page.locator('tr[data-s]:not([hidden])').count();
  assert(shown >= 2 && shown < total, 'Searching "conflict" should narrow the list, shown ' + shown);
  assert((await page.locator('#count').innerText()).includes('found'));
  await page.fill('#q', 'zzzz-nothing');
  assert(await page.locator('#none').isVisible(), 'No-match message should appear');
  assert.equal(await page.locator('section.hsec:not([hidden])').count(), 0, 'Empty sections should hide');
  await page.fill('#q', '');
  assert.equal(await page.locator('tr[data-s]:not([hidden])').count(), total, 'Clearing the search restores everything');
  await page.screenshot({ path: path.join(outDir, 'help-top.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const helpOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
  assert.equal(helpOverflow, false, 'Help page: sideways scrolling on a phone');
  assert(await page.locator('.top-links').isVisible(), 'Help page keeps its navigation on phones');
  await page.screenshot({ path: path.join(outDir, 'help-mobile.png') });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file://' + path.join(root, 'index.html'));

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
  console.log('PASS: ' + mdFiles.length + ' Markdown files with no broken links; ' + steps.length + ' story steps, each with three places and one highlighted; key moments, contents, progress, pop-up words, help-page search and phone layouts');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
