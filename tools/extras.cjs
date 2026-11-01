// Extra content for the guide page (index.html) and the help page (help.html).
// Wording comes from lessons/dictionary.md, lessons/cheat-sheet.md and lessons/08-fix-mistakes.md.
// Text: **bold** marks a button or menu label; `code` marks a file or branch name.

// "What do you want to do?" cards on the guide page. `step` is a step number in tools/story.cjs.
const goals = [
  { icon: 'new-repo', title: 'Start a project and put it online', hint: 'Steps 1 to 4', step: 1 },
  { icon: 'push', title: 'Save my work, every day', hint: 'Edit, commit, push', step: 5 },
  { icon: 'pull', title: 'Get a coauthor’s changes', hint: 'Fetch and pull', step: 7 },
  { icon: 'branch', title: 'Try something without risking my files', hint: 'Make a branch', step: 8 },
  { icon: 'pull-request', title: 'Get my changes reviewed', hint: 'Open a pull request', step: 10 },
  { icon: 'ai', title: 'Let an AI assistant help', hint: 'And check its work', step: 13 },
  { icon: 'undo', title: 'Undo a mistake', hint: 'Safely, even after pushing', step: 16 },
  { icon: 'question', title: 'Something looks different', hint: 'Find your symptom', href: 'help.html#wrong' },
];

// Words that get a pop-up definition the first time they appear in a step.
// `match` is a regular expression source; longer terms must come first ("pull request" before "pull").
const glossary = [
  { term: 'pull request', match: 'pull requests?', def: 'A review page proposing to bring one branch’s changes into another.' },
  { term: 'repository', match: 'repositor(?:y|ies)', def: 'A project folder that remembers its history.' },
  { term: 'commit', match: 'commit(?:s|ted|ting)?', def: 'A named checkpoint, saved on your computer.' },
  { term: 'push', match: 'push(?:es|ed|ing)?', def: 'Upload your checkpoints to GitHub.com.' },
  { term: 'fetch', match: 'fetch(?:es|ed|ing)?', def: 'Check GitHub.com for anything new, without changing your files.' },
  { term: 'pull', match: 'pull(?:s|ed|ing)?', def: 'Bring new checkpoints from GitHub.com into your folder.' },
  { term: 'branch', match: 'branch(?:es)?', def: 'A separate working version of the project.' },
  { term: 'merge', match: 'merg(?:e|es|ed|ing)', def: 'Accept a pull request, so its changes join the other branch.' },
  { term: 'publish', match: 'publish(?:es|ed|ing)?', def: 'Put a new project or branch on GitHub.com for the first time.' },
  { term: 'revert', match: 'revert(?:s|ed|ing)?', def: 'A new checkpoint that cancels an earlier one.' },
  { term: 'conflict', match: 'conflicts?', def: 'Two edits to the same lines that GitHub can’t combine by itself.' },
];

// ---- Help page ---------------------------------------------------------------
// "I see this, what do I do?"  `step` links to the guide step that shows the situation.
const symptoms = [
  { icon: 'push', see: 'GitHub.com shows the old file', means: 'You committed but didn’t push, or you’re viewing another branch.', do: '**Push origin**; check the branch selector on the website.', step: 5 },
  { icon: 'pull', see: 'Your folder shows the old file', means: 'Someone changed it online.', do: '**Fetch origin**, then **Pull origin**, on the right branch.', step: 7 },
  { icon: 'branch', see: 'Files “disappeared” after switching branches', means: 'That branch has a different version.', do: 'Switch back with **Current Branch**. Check it before anything else.', step: 8 },
  { icon: 'ai', see: 'An AI says it finished, but nothing changed', means: 'It worked on GitHub.com, or on a different folder.', do: 'Ask for the pull request link or the folder path.', step: 13 },
  { icon: 'clone', see: 'Desktop doesn’t know about your folder', means: 'It’s a ZIP download, not a clone.', do: '**File → Clone repository…** once, then work there.' },
  { icon: 'conflict', see: 'Desktop lists conflicted files (a merge conflict)', means: 'Two people changed the same lines.', do: 'Click **Open in** *your editor*. Keep the right text, delete the marker lines (`<<<<<<<`, `=======`, `>>>>>>>`), save, then click **Continue merge**. Don’t assume your version (or the AI’s) should win; ask the person who wrote the other one.' },
  { icon: 'lock', see: 'Push was rejected: permission denied', means: 'You may be signed into the wrong account, or you may not have write access.', do: 'Check **Accounts** in Desktop settings. If you have no write access, ask the owner, or open a pull request instead.' },
  { icon: 'fetch', see: 'Push was rejected: the online branch has newer commits', means: 'Someone pushed since you last pulled.', do: 'Click **Fetch origin**, then **Pull origin**, then push again.' },
  { icon: 'warning', see: 'Push was rejected: file too large', means: 'A very large file can be refused.', do: 'Keep big datasets outside the repository.' },
  { icon: 'undo', see: 'I just committed something wrong, and haven’t pushed', means: 'The checkpoint is only on your computer.', do: 'Click **Undo** below the commit box. Your edits come back to **Changes**. Only undo checkpoints you haven’t pushed.', step: 16 },
  { icon: 'revert', see: 'A mistake is already pushed or merged', means: 'Other people may already have it.', do: 'In **History**, right-click the commit and choose **Revert changes in commit**. Then click **Push origin**. Never force-push or delete shared branches to hide a mistake.', step: 16 },
  { icon: 'warning', see: 'An unwanted edit I haven’t committed', means: 'It’s only in your folder.', do: 'In **Changes**, click the file and read what would be lost. Copy anything you want to keep. Then right-click the file and choose **Discard changes…** This is hard to undo, so copy the folder first if unsure.' },
];

// "I want to…" lookup: the one-page cheat sheet.
const wants = [
  { icon: 'new-repo', want: 'Start a new project', click: '**File → New repository…**' },
  { icon: 'clone', want: 'Get someone’s project onto my computer', click: '**File → Clone repository…**' },
  { icon: 'open-folder', want: 'Find my project’s folder', click: '**Repository → Show in Finder** (Mac) or **Show in Explorer** (Windows)' },
  { icon: 'edit', want: 'Edit files', click: '**Repository → Open in** *your editor*, then save' },
  { icon: 'changes', want: 'See what I changed', click: '**Changes** tab' },
  { icon: 'commit', want: 'Save a checkpoint', click: 'Type a Summary, then **Commit to** *branch*' },
  { icon: 'publish', want: 'Put a new project or branch online', click: '**Publish repository** or **Publish branch**' },
  { icon: 'push', want: 'Upload my checkpoints', click: '**Push origin**' },
  { icon: 'fetch', want: 'Check for online changes', click: '**Fetch origin**' },
  { icon: 'pull', want: 'Download online changes', click: '**Pull origin**' },
  { icon: 'history', want: 'See older versions', click: '**History** tab' },
  { icon: 'branch', want: 'Try something safely', click: '**Current Branch → New branch**' },
  { icon: 'pull-request', want: 'Ask for a review', click: '**Preview Pull Request → Create pull request**' },
  { icon: 'review', want: 'Read proposed changes', click: 'Pull request → **Files changed**' },
  { icon: 'merge', want: 'Accept a pull request', click: '**Merge pull request → Confirm merge**' },
  { icon: 'issue', want: 'Write down a task', click: '**Issues → New issue**' },
  { icon: 'undo', want: 'Undo the commit I just made', click: '**Undo** (below the commit box)' },
  { icon: 'revert', want: 'Cancel a pushed commit', click: '**History** → right-click → **Revert changes in commit**' },
  { icon: 'warning', want: 'Throw away an uncommitted edit', click: '**Changes** → right-click → **Discard changes…**' },
];

// Every GitHub word used in the guide, in everyday language.
const words = [
  ['Repository (repo)', 'A project folder that remembers its history'],
  ['Local', 'On your computer'],
  ['Remote / origin', 'The online copy on GitHub.com'],
  ['Clone', 'A connected copy of an online project on your computer'],
  ['Changes', 'What’s different since your last checkpoint'],
  ['Diff', 'The view showing added (green) and removed (red) lines'],
  ['Commit', 'A named checkpoint, saved on your computer'],
  ['Publish', 'Put a new project or branch on GitHub.com for the first time'],
  ['Push', 'Upload your checkpoints to GitHub.com'],
  ['Fetch', 'Check GitHub.com for anything new, without changing your files'],
  ['Pull', 'Bring new checkpoints from GitHub.com into your folder'],
  ['History', 'The list of all checkpoints'],
  ['Branch', 'A separate working version of the project'],
  ['main', 'The usual name of the accepted, official branch'],
  ['Pull request (PR)', 'A review page proposing to bring one branch’s changes into another'],
  ['Base / compare', 'In a pull request: the branch to change (base) and the branch with the proposal (compare)'],
  ['Draft pull request', 'A pull request marked “not ready yet”'],
  ['Review', 'Reading a pull request and commenting, approving or asking for changes'],
  ['Checks', 'Automatic tests some projects run on pull requests; many beginner projects have none'],
  ['Merge', 'Accept a pull request, so its changes join the other branch'],
  ['Issue', 'A written task or question on GitHub.com'],
  ['Collaborator', 'Someone the owner has allowed to upload to a project'],
  ['Fork', 'Your own online copy of someone else’s project, used when you can’t upload to theirs'],
  ['Agent / AI assistant', 'AI software that may suggest, edit, or open pull requests, if allowed'],
  ['Undo', 'Turn the commit you just made back into editable changes'],
  ['Revert', 'A new checkpoint that cancels an earlier one'],
  ['Discard', 'Throw away uncommitted edits (hard to undo)'],
  ['Conflict', 'Two edits to the same lines that GitHub can’t combine by itself'],
];

// Four easy mix-ups, shown at the top of the help page.
const pairs = [
  { icon: 'commit', a: 'Commit', b: 'Push', text: 'Commit saves on your computer. Push puts it online.' },
  { icon: 'fetch', a: 'Fetch', b: 'Pull', text: 'Fetch only checks for news. Pull brings it into your folder.' },
  { icon: 'pull-request', a: 'Pull request', b: 'Merge', text: 'A pull request proposes. Merging accepts.' },
];

module.exports = { goals, glossary, symptoms, wants, words, pairs };
