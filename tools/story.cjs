// The story shown on the guide page (index.html): one small project, followed from start to finish.
// Each step shows what the three places look like AFTER the step:
//   folder  = Mia's project folder on her computer
//   desktop = GitHub Desktop
//   web     = GitHub.com
// Text: **bold** marks a button or menu label; `code` marks a file or branch name.

// ---- The file at each stage --------------------------------------------------
const TITLE = '# Wage study notes';
const UNEMP = 'Unemployment fell from 5.0% to 4.5%.';
const UNEMP_PP = 'Unemployment fell 0.5 percentage points (5.0% to 4.5%).';
const WAGE = 'Wages rose from $25 to $26 (+4%).';
const TABLE = ['', '| Year | Unemployment | Wage |', '| 2024 | 5.0%         | $25  |', '| 2025 | 4.5%         | $26  |'];
const DICT = ['# Data dictionary', 'unemployment: % of the labour force', 'wage: US dollars per hour'];

// lines(...) builds a file view; mark lines with { add: [i...], del: [i...], warn: [i...] }.
function lines(arr, marks = {}) {
  return arr.map((t, i) => ({ t, k: (marks.add || []).includes(i) ? 'add' : (marks.del || []).includes(i) ? 'del' : (marks.warn || []).includes(i) ? 'warn' : '' }));
}
const diff = (...rows) => rows.map(r => ({ k: r[0] === '+' ? 'add' : r[0] === '-' ? 'del' : '', t: r.slice(2) }));

const V1 = [TITLE, UNEMP];
const V2 = [TITLE, UNEMP, WAGE];
const V3 = [TITLE, UNEMP_PP, WAGE];
const V4 = [TITLE, UNEMP_PP, WAGE, ...TABLE];

const H1 = [{ t: 'Initial commit' }];
const H2 = [{ t: 'Add first note' }, ...H1];
const H3 = [{ t: 'Add wage change' }, ...H2];
const H4 = [{ t: 'Clarify percentage points', by: 'Sam' }, ...H3];
const H5 = [{ t: 'Add summary table' }, ...H4];
const H6 = [{ t: 'Merge pull request #1', by: 'Sam' }, ...H5];
const H7 = [{ t: 'Merge pull request #3' }, { t: 'Add data dictionary', by: 'AI assistant' }, ...H6];

module.exports = {
  cast: [
    { name: 'Mia', role: 'That’s you: a researcher writing notes for a small wage study', icon: 'account' },
    { name: 'Sam', role: 'Mia’s coauthor, who joins in part 2', icon: 'people' },
    { name: 'An AI assistant', role: 'Helps in part 3, and makes one mistake', icon: 'ai' },
  ],
  acts: [
    { id: 'part-1', title: 'Part 1: On your own', blurb: 'Create a project, save checkpoints, and put it online. This is all you need for personal work.' },
    { id: 'part-2', title: 'Part 2: With a coauthor', blurb: 'Get someone else’s changes, and propose your own for review.' },
    { id: 'part-3', title: 'Part 3: With an AI assistant', blurb: 'Let AI help, and check its work before you accept it.' },
    { id: 'part-4', title: 'Part 4: When something goes wrong', blurb: 'Undo a mistake safely.' },
  ],
  steps: [
    // ---------------- Part 1 ----------------
    {
      act: 'part-1', icon: 'new-repo', title: 'Create a project', who: 'Mia', active: 'desktop',
      story: 'Mia starts a project called `wage-study`. GitHub calls a project a **repository**: a folder that remembers its history.',
      do: ['In GitHub Desktop choose **File → New repository…**', 'Name: `wage-study`', 'Tick **Initialize this repository with a README**', 'Click **Create repository**'],
      why: 'A new folder appears on her computer. Nothing is online yet.',
      folder: { branch: 'main', files: [{ n: 'README.md', new: true }] },
      desktop: { branch: 'main', btn: { label: 'Publish repository' }, tab: 'changes', changes: [] },
      web: { view: 'none' },
    },
    {
      act: 'part-1', icon: 'edit', title: 'Write a note', who: 'Mia', active: 'folder',
      story: 'Mia writes her first finding in a new file, `notes.md`, using her usual text editor.',
      do: ['In Desktop choose **Repository → Show in Finder** (Mac) or **Show in Explorer** (Windows)', 'Create `notes.md` in that folder, type the note, and **save**'],
      why: 'GitHub Desktop notices the saved file by itself and lists it under **Changes**, with new lines in green.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', new: true, open: true }], doc: { name: 'notes.md', lines: lines(V1, { add: [0, 1] }) } },
      desktop: { branch: 'main', btn: { label: 'Publish repository' }, tab: 'changes', changes: [{ file: 'notes.md', lines: diff('+ ' + TITLE, '+ ' + UNEMP) }], commitBox: 'Add first note' },
      web: { view: 'none' },
    },
    {
      act: 'part-1', icon: 'commit', title: 'Commit: save a checkpoint', who: 'Mia', active: 'desktop',
      story: 'Mia saves a named checkpoint, called a **commit**, so she can always come back to this version.',
      do: ['In the **Summary** box type `Add first note`', 'Click **Commit to main**'],
      why: 'The checkpoint appears in **History**. It is saved on her computer only: GitHub.com still has nothing.',
      watch: 'Commit is not the same as uploading. Until she publishes or pushes, nobody else can see it.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V1) } },
      desktop: { branch: 'main', btn: { label: 'Publish repository' }, tab: 'history', history: [{ t: 'Add first note', new: true }, ...H1] },
      web: { view: 'none', note: 'Still only on Mia’s computer.' },
    },
    {
      act: 'part-1', icon: 'publish', title: 'Publish to GitHub.com', who: 'Mia', active: 'web',
      story: 'Mia puts the project online, so it’s backed up and she can share it later.',
      do: ['Click **Publish repository** in the top bar', 'Keep **Keep this code private** ticked', 'Click **Publish repository**'],
      why: 'GitHub.com now has the same files and checkpoints. The Desktop button changes to **Fetch origin**.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V1) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin', new: true }, tab: 'history', history: H2 },
      web: { view: 'repo', new: true, branch: 'main', commits: 2, latest: 'Add first note', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V1) } },
    },
    {
      act: 'part-1', icon: 'push', title: 'Edit, commit, push: the everyday routine', who: 'Mia', active: 'desktop',
      story: 'The next day Mia adds a second finding. She repeats the routine she’ll use every day.',
      do: ['Edit `notes.md` and **save**', 'Check **Changes**', 'Commit with Summary `Add wage change`', 'Click **Push origin** to upload'],
      why: 'Edit, commit, push. Now her folder, Desktop and GitHub.com all match.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V2, { add: [2] }) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: [{ t: 'Add wage change', new: true }, ...H2] },
      web: { view: 'repo', branch: 'main', commits: 3, latest: 'Add wage change', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V2, { add: [2] }) } },
    },
    // ---------------- Part 2 ----------------
    {
      act: 'part-2', icon: 'people', title: 'A coauthor changes the online copy', who: 'Sam', active: 'web',
      story: 'Mia invites Sam (**Settings → Collaborators → Add people** on GitHub.com). Sam notices that 5.0% to 4.5% is a fall of 0.5 **percentage points**, and fixes the line directly on GitHub.com.',
      do: ['Nothing for Mia to do yet. Sam edits and commits on the website'],
      why: 'GitHub.com now has Sam’s fix, but Mia’s folder still has the old line. Her computer does not update by itself.',
      folder: { branch: 'main', stale: true, files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V2) }, note: 'Out of date' },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: H3 },
      web: { view: 'repo', branch: 'main', commits: 4, latest: 'Clarify percentage points (Sam)', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V3, { add: [1] }) } },
    },
    {
      act: 'part-2', icon: 'pull', title: 'Fetch and pull: bring the changes home', who: 'Mia', active: 'desktop',
      story: 'Mia brings Sam’s fix down to her computer.',
      do: ['Click **Fetch origin** to check for news', 'It turns into **Pull origin**. Click it'],
      why: '**Fetch** only looks; **Pull** actually updates her folder. Everything matches again.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V3, { add: [1] }) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: [{ t: 'Clarify percentage points', by: 'Sam', new: true }, ...H3] },
      web: { view: 'repo', branch: 'main', commits: 4, latest: 'Clarify percentage points (Sam)', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V3) } },
    },
    {
      act: 'part-2', icon: 'branch', title: 'Make a branch to try something', who: 'Mia', active: 'desktop',
      story: 'Mia wants to add a summary table, but she wants Sam to check it first. She works on a **branch**: a separate working version, so `main` stays untouched.',
      do: ['Click **Current Branch → New branch**', 'Name it `add-table`', 'Click **Create branch**'],
      why: 'Same folder, same files. Only the branch name changed. Anything she commits now goes to `add-table`, not `main`.',
      folder: { branch: 'add-table', branchNew: true, files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V3) } },
      desktop: { branch: 'add-table', branchNew: true, btn: { label: 'Publish branch' }, tab: 'changes', changes: [] },
      web: { view: 'repo', branch: 'main', commits: 4, latest: 'Clarify percentage points (Sam)', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V3) } },
    },
    {
      act: 'part-2', icon: 'publish', title: 'Add the table, commit, publish the branch', who: 'Mia', active: 'folder',
      story: 'Mia adds the table to `notes.md`, commits it to her branch, and publishes the branch.',
      do: ['Edit `notes.md` and **save**', 'Commit with Summary `Add summary table`: the button now says **Commit to add-table**', 'Click **Publish branch**'],
      why: 'The branch is on GitHub.com too, but `main` there is still the version without the table.',
      folder: { branch: 'add-table', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4, { add: [3, 4, 5, 6] }) } },
      desktop: { branch: 'add-table', btn: { label: 'Fetch origin', new: true }, tab: 'history', history: [{ t: 'Add summary table', new: true }, ...H4] },
      web: { view: 'repo', branch: 'main', commits: 4, latest: 'Clarify percentage points (Sam)', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V3) }, note: 'Branch add-table was just published.' },
    },
    {
      act: 'part-2', icon: 'pull-request', title: 'Open a pull request', who: 'Mia', active: 'web',
      story: 'Mia asks Sam to review the table. A **pull request** is a review page that shows exactly what the branch would change.',
      do: ['Click **Preview Pull Request**, then **Create pull request**', 'In the browser check **base: main** and **compare: add-table**', 'Add a title and click **Create pull request**'],
      why: 'Nothing in `main` has changed yet. A pull request is only a proposal.',
      folder: { branch: 'add-table', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4) } },
      desktop: { branch: 'add-table', btn: { label: 'Fetch origin' }, tab: 'history', history: H5 },
      web: { view: 'pr', new: true, pr: { n: 1, title: 'Add summary table', status: 'Open', base: 'main', head: 'add-table', by: 'Mia', files: [{ name: 'notes.md', lines: diff('  ' + WAGE, '+ ', ...TABLE.slice(1).map(t => '+ ' + t)) }] } },
    },
    {
      act: 'part-2', icon: 'merge', title: 'Review and merge', who: 'Sam', active: 'web',
      story: 'Sam reads **Files changed**, checks the numbers, and accepts the proposal by **merging** it.',
      do: ['Sam opens the **Files changed** tab and reads every line', 'He clicks **Merge pull request**, then **Confirm merge**'],
      why: 'Now `main` on GitHub.com includes the table. Merging is the moment a change is accepted.',
      folder: { branch: 'add-table', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4) } },
      desktop: { branch: 'add-table', btn: { label: 'Fetch origin' }, tab: 'history', history: H5 },
      web: { view: 'pr', pr: { n: 1, title: 'Add summary table', status: 'Merged', statusNew: true, base: 'main', head: 'add-table', by: 'Mia', files: [{ name: 'notes.md', lines: diff('  ' + WAGE, '+ ', ...TABLE.slice(1).map(t => '+ ' + t)) }], comments: [{ by: 'Sam', t: 'Numbers match the data. Merging.' }] } },
    },
    {
      act: 'part-2', icon: 'pull', title: 'Switch back to main and pull', who: 'Mia', active: 'desktop',
      story: 'Mia updates her own `main` so it has the accepted table.',
      do: ['Click **Current Branch → main**', 'Click **Fetch origin**, then **Pull origin**'],
      why: 'Her folder’s `main` now matches the accepted version on GitHub.com.',
      folder: { branch: 'main', branchNew: true, files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4, { add: [3, 4, 5, 6] }) } },
      desktop: { branch: 'main', branchNew: true, btn: { label: 'Fetch origin' }, tab: 'history', history: [{ t: 'Merge pull request #1', by: 'Sam', new: true }, ...H5] },
      web: { view: 'repo', branch: 'main', commits: 6, latest: 'Merge pull request #1 (Sam)', files: [{ n: 'README.md' }, { n: 'notes.md' }], preview: { name: 'notes.md', lines: lines(V4) } },
    },
    // ---------------- Part 3 ----------------
    {
      act: 'part-3', icon: 'ai', title: 'Give an AI assistant a small task', who: 'Mia', active: 'web',
      story: 'Mia asks an AI assistant connected to GitHub to write a data dictionary. She sets clear limits, and the AI opens its own pull request.',
      do: ['Write the task as an **Issue** (**Issues → New issue**)', 'Tell the AI: *only add `dictionary.md`; don’t change `notes.md`; work on a new branch; don’t merge*'],
      why: 'The AI works on its own branch, `agent/dictionary`, so nothing reaches `main` without Mia’s review.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: H6 },
      web: { view: 'pr', new: true, pr: { n: 3, title: 'Add data dictionary', status: 'Open', base: 'main', head: 'agent/dictionary', by: 'AI assistant', ref: 'Fixes issue #2', files: [{ name: 'dictionary.md (new)', lines: diff(...DICT.map(t => '+ ' + t)) }, { name: 'notes.md', lines: diff('- | 2025 | 4.5%         | $26  |', '+ | 2025 | 4.6%         | $26  |') }] } },
    },
    {
      act: 'part-3', icon: 'review', title: 'Review the AI’s work, and catch a mistake', who: 'Mia', active: 'web',
      story: 'The AI says it’s done. Mia doesn’t take its word for it: she reads **Files changed** and spots that it also changed a number in `notes.md`, from 4.5% to 4.6%.',
      do: ['Open **Files changed** and read every file', 'Comment on the wrong line and choose **Request changes**'],
      why: 'This is why AI work goes through a pull request. "Done" is a claim; the diff is the proof.',
      watch: 'Always check files the AI was told not to touch.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }], doc: { name: 'notes.md', lines: lines(V4) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: H6 },
      web: { view: 'pr', pr: { n: 3, title: 'Add data dictionary', status: 'Changes requested', statusNew: true, base: 'main', head: 'agent/dictionary', by: 'AI assistant', ref: 'Fixes issue #2', files: [{ name: 'dictionary.md (new)', lines: diff(...DICT.map(t => '+ ' + t)) }, { name: 'notes.md', warn: true, lines: diff('- | 2025 | 4.5%         | $26  |', '+ | 2025 | 4.6%         | $26  |') }], comments: [{ by: 'Mia', t: 'Please don’t change notes.md. 2025 unemployment is 4.5%.', kind: 'warn' }] } },
    },
    {
      act: 'part-3', icon: 'check', title: 'Fixed, merged, pulled', who: 'Mia', active: 'folder',
      story: 'The AI undoes its change to `notes.md`. Now only the new dictionary is in the pull request, so Mia merges it and pulls.',
      do: ['Check **Files changed** again: only `dictionary.md`', 'Click **Merge pull request → Confirm merge**', 'In Desktop: **Fetch origin**, then **Pull origin**'],
      why: 'The dictionary is in her folder, and her numbers are untouched.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md' }, { n: 'dictionary.md', new: true, open: true }], doc: { name: 'dictionary.md', lines: lines(DICT, { add: [0, 1, 2] }) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: [{ t: 'Merge pull request #3', new: true }, { t: 'Add data dictionary', by: 'AI assistant', new: true }, ...H6] },
      web: { view: 'pr', pr: { n: 3, title: 'Add data dictionary', status: 'Merged', statusNew: true, base: 'main', head: 'agent/dictionary', by: 'AI assistant', ref: 'Fixes issue #2', files: [{ name: 'dictionary.md (new)', lines: diff(...DICT.map(t => '+ ' + t)) }], comments: [{ by: 'AI assistant', t: 'Restored notes.md. Only dictionary.md changes now.' }] } },
    },
    // ---------------- Part 4 ----------------
    {
      act: 'part-4', icon: 'revert', title: 'Undo a mistake that was already pushed', who: 'Mia', active: 'desktop',
      story: 'While tidying up, Mia accidentally deletes the wage line, commits `Tidy notes`, and pushes. Sam already has it. She needs a safe undo.',
      do: ['Open **History** and right-click `Tidy notes`', 'Choose **Revert changes in commit**', 'Click **Push origin**'],
      why: 'Revert adds a new checkpoint that cancels the bad one. The line is back, and the history honestly shows what happened.',
      watch: 'Not pushed yet? Right after committing, the **Undo** button is simpler. Never "force push" to hide a shared mistake.',
      folder: { branch: 'main', files: [{ n: 'README.md' }, { n: 'notes.md', open: true }, { n: 'dictionary.md' }], doc: { name: 'notes.md', lines: lines(V4, { add: [2] }) } },
      desktop: { branch: 'main', btn: { label: 'Fetch origin' }, tab: 'history', history: [{ t: 'Revert "Tidy notes"', new: true }, { t: 'Tidy notes', bad: true }, ...H7] },
      web: { view: 'repo', branch: 'main', commits: 10, latest: 'Revert "Tidy notes"', files: [{ n: 'README.md' }, { n: 'notes.md' }, { n: 'dictionary.md' }], preview: { name: 'notes.md', lines: lines(V4, { add: [2] }) } },
    },
  ],
};
