const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

(async () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const inline = html.match(/<script>([\s\S]*?)<\/script>/);
  assert(inline, 'Expected a standalone inline script');
  new vm.Script(inline[1]); // JavaScript syntax check.
  assert(!/<script[^>]+src=/.test(html), 'No external scripts allowed');
  for (let i = 0; i < 6; i++) assert(html.includes('id="chapter-' + i + '"'), 'Missing lesson ' + i);
  const ids = [...html.split('<script>')[0].matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate static HTML id');
  const outDir = path.join(root, 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('file://' + path.join(root, 'index.html'));
  await page.locator('#chapter-0').waitFor({ state: 'visible' });
  await page.screenshot({ path: path.join(outDir, 'lesson-1-desktop.png'), fullPage: true });

  // Beginner entry points should let readers choose between basics and practice.
  assert(await page.getByText('See it. Try it. Understand it.').isVisible());
  await page.locator('#showDiff').click();
  assert(await page.locator('#introDiff').isVisible());
  await page.locator('.launch-panel button[data-go="1"]').click();
  assert(await page.locator('#chapter-1').isVisible());
  await page.locator('[data-place="2"]').click();
  assert((await page.locator('#placeDetail').innerText()).includes('GitHub.com'));

  // The simulator is safe, offers platform-specific guidance, and allows easy editing.
  await page.locator('.nav-btn[data-go="2"]').click();
  await page.screenshot({ path: path.join(outDir, 'practice-desktop.png'), fullPage: true });
  await page.locator('#showSimHint').click();
  assert(await page.locator('#simHintText').isVisible());
  await page.locator('[data-platform="windows"]').click();
  assert.equal(await page.locator('[data-platform="windows"]').getAttribute('aria-pressed'), 'true');
  assert((await page.locator('#simHelp').innerText()).includes('File → New repository'));
  await page.locator('#repoName').fill('a');
  await page.locator('#createRepo').click();
  assert((await page.locator('#simError').innerText()).includes('Choose a name'));
  await page.locator('#repoName').fill('my-econ-notes');
  await page.locator('#createRepo').click();
  assert((await page.locator('#simHelp').innerText()).includes('Show in Explorer'));
  await page.locator('#fillExample').click();
  assert((await page.locator('#editorText').inputValue()).includes('I use GitHub'));
  await page.locator('#backToCreate').click();
  assert(await page.locator('#createRepo').isVisible());
  await page.locator('#createRepo').click();
  assert((await page.locator('#editorText').inputValue()).includes('I use GitHub'));
  await page.locator('#saveEdit').click();
  assert(await page.locator('.diff-line.plus').count() > 0);
  await page.locator('#reviewDone').click();
  await page.locator('#commitSummary').fill('Explain my research note');
  await page.locator('#commitNow').click();
  await page.locator('#makePrivate').check();
  await page.locator('#publishNow').click();
  assert(await page.getByText('You completed the practice!').isVisible());
  assert((await page.locator('#simBody').innerText()).includes('Push origin'));

  await page.locator('#afterSim').click();
  assert(await page.locator('#chapter-3').isVisible());
  await page.locator('[data-collab="2"]').click();
  assert(await page.getByText('Pull Request: show the exact difference').isVisible());

  await page.locator('.nav-btn[data-go="4"]').click();
  await page.locator('[data-mode="cloud"]').click();
  assert((await page.locator('#agentModeText').innerText()).includes('Pull Request'));
  await page.locator('#requestFix').click();
  assert(await page.locator('#approveFix').isVisible());
  await page.locator('#approveFix').click();
  assert((await page.locator('#agentReview').innerText()).includes('Review complete'));

  await page.locator('.nav-btn[data-go="5"]').click();
  await page.locator('#termSearch').fill('commit');
  assert(await page.locator('#glossary .term').count() >= 1);
  await page.locator('input[name="quiz"][value="b"]').check();
  await page.locator('#checkQuiz').click();
  assert((await page.locator('#quizResponse').innerText()).includes('Correct'));

  // Test narrow devices across all lessons, not only the welcome screen.
  await page.setViewportSize({ width: 390, height: 844 });
  for (let i = 0; i < 6; i++) {
    await page.locator('.nav-btn[data-go="' + i + '"]').click();
    assert(await page.locator('#chapter-' + i).isVisible());
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 3);
    assert.equal(overflow, false, 'Mobile horizontal overflow on lesson ' + (i + 1));
  }
  await page.locator('.nav-btn[data-go="2"]').click();
  await page.screenshot({ path: path.join(outDir, 'practice-mobile.png'), fullPage: true });
  assert.deepEqual(errors, [], 'Unexpected browser errors: ' + errors.join(', '));

  console.log('PASS: six lessons, beginner entry, screenshots, platform hints, full Desktop simulation, PR flow, AI review, quiz, and all six mobile layouts');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
