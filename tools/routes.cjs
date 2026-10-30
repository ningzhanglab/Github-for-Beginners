// The eight workflows ("routes") shown as route pictures in the lessons.
// Lanes: 0 = your project folder, 1 = GitHub Desktop, 2 = GitHub.com.
// Each step: i = icon name (tools/icons.cjs), t = title, d = what to do,
// s = what you'll see, w = watch out, who = "ai" or "other" when someone else does it.
// Text helpers: {{mac|win}} differs by computer; **x** marks an on-screen label.
module.exports = [
 {id:"first", n:1, c:"--l1", goal:"Create my first project", when:"You have never used GitHub. You'll make a small private project, change one file, and see it online. About 15 minutes.",
  more:["learn/03-your-first-project.html","Lesson 3: Your first project"], stops:[
  {lane:1, i:"new-repo", t:"Create a repository", d:"Open GitHub Desktop and sign in. Choose **File → New repository…**. Name it `my-first-notes`, pick a folder you'll remember, tick **Initialize this repository with a README**, then click **Create repository**.", s:"Your new project appears at the top-left under **Current Repository**. The **Changes** tab says there are no local changes.", w:"Practise on your own new project, not on someone else's shared one."},
  {lane:0, i:"edit", t:"Edit one file", d:"Choose **Repository → {{Show in Finder|Show in Explorer}}**. Open `README.md` in any text editor (for example {{TextEdit in plain-text mode|Notepad}}), add one sentence, and save.", s:"Nothing changes in Desktop until you save the file.", w:"Make sure you edit the file inside the folder Desktop just opened, not a copy in Downloads."},
  {lane:1, i:"changes", t:"Review your change", d:"Go back to GitHub Desktop and click the **Changes** tab, then click `README.md`.", s:"Added lines are green with a +. Removed lines are red with a −. This is called the diff.", w:"If the file isn't listed, you probably saved it somewhere else, or haven't saved yet."},
  {lane:1, i:"commit", t:"Commit (save a checkpoint)", d:"In the **Summary** box at the bottom left, type a short description such as `Add my first note`, then click **Commit to main**.", s:"The Changes list empties and your checkpoint appears in the **History** tab.", w:"The checkpoint is saved on your computer only. It isn't online yet."},
  {lane:1, i:"publish", t:"Publish to GitHub.com", d:"Click **Publish repository** in the top bar. Keep **Keep this code private** ticked for practice, then click **Publish repository**.", s:"The top-bar button changes to **Fetch origin**, which means the project is now connected to GitHub.com.", w:"Public projects can be seen by anyone. Choose private unless you mean to share."},
  {lane:2, i:"view-online", t:"Check it online", d:"Choose **Repository → View on GitHub**.", s:"Your browser opens the project on GitHub.com, showing your README with the sentence you added.", w:""}
 ]},
 {id:"daily", n:2, c:"--l2", goal:"Save and upload a change", when:"Your project already exists and is published. This is the routine you'll repeat every day.",
  more:["learn/04-save-and-sync.html","Lesson 4: Save and sync every day"], stops:[
  {lane:1, i:"branch", t:"Check where you are", d:"Look at **Current Repository** and **Current Branch** in the top bar.", s:"The project name and a branch name, often `main`.", w:"Most \"where did my file go?\" moments start with being on the wrong branch or project."},
  {lane:0, i:"edit", t:"Edit and save", d:"Open the project with **Repository → Open in your editor** or **{{Show in Finder|Show in Explorer}}**. Make your change and save.", s:"Your editor shows the updated file.", w:""},
  {lane:1, i:"changes", t:"Review changes", d:"Click **Changes**. Read each file's diff. Untick any file you don't want in this checkpoint.", s:"Only the ticked files will be included in the commit.", w:"Look for surprise deletions or files you didn't mean to touch."},
  {lane:1, i:"commit", t:"Commit", d:"Write a Summary that says what changed, for example `Clarify wage units in table 1`, and click **Commit to main** (or to your branch).", s:"The Changes list empties. The top bar now offers **Push origin** with a small number: that's how many checkpoints are waiting to upload.", w:""},
  {lane:1, i:"push", t:"Push origin", d:"Click **Push origin** in the top bar.", s:"The number disappears. Your checkpoint is now on GitHub.com.", w:"Commit without Push means only your computer has the change."},
  {lane:2, i:"view-online", t:"Confirm online (optional)", d:"Choose **Repository → View on GitHub** and refresh the page.", s:"The file on GitHub.com matches your folder.", w:"If it looks old, check the branch selector on the website matches the branch you pushed."}
 ]},
 {id:"update", n:3, c:"--l3", goal:"Get changes someone else made", when:"A teammate, an AI assistant, or you on another computer changed the project on GitHub.com, and your folder still shows the old version.",
  more:["learn/04-save-and-sync.html","Lesson 4: Save and sync every day"], stops:[
  {lane:2, i:"people", t:"Something changed online", d:"For example, a teammate merged a Pull Request, or you edited a file on the website.", s:"GitHub.com shows the new version. Your folder still shows the old one. That's normal: your computer doesn't update by itself.", w:"", who:"other"},
  {lane:1, i:"commit", t:"Tidy up local work first", d:"Look at **Changes**. If you have unsaved edits, commit them (or finish them) before switching branches.", s:"An empty Changes list is the easiest starting point.", w:"Never click **Discard changes** just to make a message go away."},
  {lane:1, i:"branch", t:"Choose the branch", d:"Click **Current Branch** and choose the branch that changed, usually `main`.", s:"The top bar shows the branch you picked.", w:""},
  {lane:1, i:"fetch", t:"Fetch origin", d:"Click **Fetch origin** in the top bar.", s:"Desktop checks GitHub.com. If there's something new, the button turns into **Pull origin** with a number.", w:"Fetch only looks. It doesn't change your files yet."},
  {lane:1, i:"pull", t:"Pull origin", d:"Click **Pull origin**.", s:"The new checkpoints appear in **History**.", w:"If Desktop reports a conflict, stop and read both versions. See the \"Fix a mistake\" route."},
  {lane:0, i:"open-folder", t:"Open the updated files", d:"Open the project folder and the changed file in your editor.", s:"Your folder now matches GitHub.com.", w:""}
 ]},
 {id:"pr", n:4, c:"--l4", goal:"Propose a change for review", when:"You want to try something without touching the accepted version, then have it reviewed before it becomes part of main. This is the core collaboration pattern.",
  more:["learn/05-branches-and-pull-requests.html","Lesson 5: Branches and pull requests"], stops:[
  {lane:1, i:"pull", t:"Start from the latest main", d:"Choose **Current Branch → main**, then **Fetch origin** and **Pull origin** if offered.", s:"You're on an up-to-date `main`.", w:""},
  {lane:1, i:"branch", t:"Create a branch", d:"Click **Current Branch → New Branch**. Give it a short name such as `robustness/new-controls` and click **Create Branch**.", s:"The top bar now shows your new branch. Your files look the same; nothing has changed yet.", w:"A branch is a separate working version, not a separate copy of the folder."},
  {lane:0, i:"edit", t:"Edit and save", d:"Make your change in the editor and save.", s:"Changes appear in Desktop.", w:""},
  {lane:1, i:"commit", t:"Commit to your branch", d:"Review **Changes**, write a Summary, and click **Commit to robustness/new-controls**.", s:"The button names your branch, not main. That's how you know main is safe.", w:""},
  {lane:1, i:"publish", t:"Publish branch", d:"Click **Publish branch** in the top bar.", s:"Your branch now exists on GitHub.com.", w:""},
  {lane:2, i:"pull-request", t:"Open a Pull Request", d:"In Desktop click **Preview Pull Request**, then **Create pull request**. Your browser opens. Check **base: main** (the version to change) and **compare:** your branch, add a title and description, then click **Create pull request**.", s:"A review page with tabs: **Conversation**, **Commits**, **Files changed**.", w:"Use **Create draft pull request** if it isn't ready yet."},
  {lane:2, i:"review", t:"Review Files changed", d:"Open **Files changed** and read every file. Reviewers can leave comments on specific lines.", s:"The exact lines added and removed.", w:"If a **Checks** area appears, it shows automatic tests. Many beginner projects have none, and that's fine."},
  {lane:2, i:"merge", t:"Merge", d:"When the change is right, click **Merge pull request**, then **Confirm merge**.", s:"The PR is marked Merged, and main on GitHub.com now includes your change.", w:"Merging is the moment of acceptance. Only do it after review."},
  {lane:1, i:"pull", t:"Bring main home", d:"In Desktop choose **Current Branch → main**, then **Fetch origin** and **Pull origin**.", s:"Your local `main` now contains the accepted change.", w:""}
 ]},
 {id:"team", n:5, c:"--l5", goal:"Join a teammate's project", when:"A coauthor or classmate already has a project on GitHub.com and wants you to contribute.",
  more:["learn/06-work-with-other-people.html","Lesson 6: Work with other people"], stops:[
  {lane:2, i:"people", t:"Get access", d:"Ask the owner to add you under **Settings → Collaborators**. Accept the invitation from your email or GitHub notifications.", s:"You can open the project on GitHub.com.", w:"Without write access you can still read and clone, but you can't push.", who:"other"},
  {lane:1, i:"clone", t:"Clone the project", d:"In Desktop choose **File → Clone Repository…**, pick the project from the **GitHub.com** tab, choose a local folder, and click **Clone**.", s:"A connected copy of the project on your computer.", w:"Clone once. Later, use Fetch and Pull to get updates instead of cloning again or downloading a ZIP."},
  {lane:1, i:"branch", t:"Create your own branch", d:"**Current Branch → New Branch**, for example `docs/fix-variable-definitions`.", s:"Your work is kept separate from your teammate's main.", w:""},
  {lane:0, i:"edit", t:"Edit and save", d:"Make your change in the editor and save.", s:"", w:""},
  {lane:1, i:"publish", t:"Commit and publish", d:"Review **Changes**, **Commit to** your branch, then **Publish branch**.", s:"Your branch appears on GitHub.com.", w:""},
  {lane:2, i:"pull-request", t:"Open a PR and ask for review", d:"**Preview Pull Request → Create pull request**. On the page, use **Reviewers** to request your teammate.", s:"Your teammate gets a notification.", w:""},
  {lane:2, i:"review", t:"Teammate comments", d:"Your teammate reads **Files changed** and leaves comments or requests changes.", s:"Comments appear on the PR's Conversation tab.", w:"", who:"other"},
  {lane:1, i:"push", t:"Fix and push again", d:"Stay on the same branch. Edit, commit, and click **Push origin**.", s:"The same PR updates automatically. Don't open a new one.", w:""},
  {lane:2, i:"merge", t:"Teammate merges", d:"When everyone agrees, the owner clicks **Merge pull request**.", s:"The PR shows Merged.", w:"", who:"other"},
  {lane:1, i:"pull", t:"Update your main", d:"**Current Branch → main → Fetch origin → Pull origin**.", s:"Your folder has the accepted version.", w:""}
 ]},
 {id:"localai", n:6, c:"--l6", goal:"Let an AI assistant edit my folder", when:"Your AI tool can read and edit files on your own computer (for example, an AI-enabled editor).",
  more:["learn/07-work-with-ai.html","Lesson 7: Work with an AI assistant"], stops:[
  {lane:1, i:"branch", t:"Make a branch for the AI", d:"Pull the latest main, then **Current Branch → New Branch**, for example `agent/data-dictionary`.", s:"main is protected from the AI's edits.", w:""},
  {lane:0, i:"open-folder", t:"Point the AI at the exact folder", d:"Use **Repository → {{Show in Finder|Show in Explorer}}** to find the folder. Open that same folder in your AI tool. Give a small task with the files it may and may not touch, and ask it to report its folder and branch before editing.", s:"The AI confirms the same folder and branch you see in Desktop.", w:"If it names a different folder, stop. It's working on another copy."},
  {lane:0, i:"ai", t:"The AI edits", d:"The AI changes only the files you allowed. Ask it not to commit or push, so you can review first.", s:"Files change in your folder.", w:"", who:"ai"},
  {lane:1, i:"changes", t:"Review every change", d:"Open **Changes** in Desktop and read every file.", s:"Exactly the files you asked for, and nothing else.", w:"Look for deleted files, renamed files and data you said not to touch. If the AI already committed, look in **History** instead."},
  {lane:0, i:"check", t:"Check the result yourself", d:"Open the edited file and read it. Check numbers and links rather than trusting the AI's summary.", s:"", w:"\"Done\" from an AI is a claim, not proof."},
  {lane:1, i:"publish", t:"Commit and publish", d:"Commit to the agent branch and click **Publish branch** (or **Push origin**).", s:"", w:""},
  {lane:2, i:"pull-request", t:"Pull Request and merge", d:"**Preview Pull Request → Create pull request**, review **Files changed** once more, then merge.", s:"", w:""},
  {lane:1, i:"pull", t:"Update main", d:"**Current Branch → main → Fetch origin → Pull origin**.", s:"", w:""}
 ]},
 {id:"cloudai", n:7, c:"--l7", goal:"Let an AI assistant work on GitHub.com", when:"Your AI tool is connected to GitHub and can open Pull Requests. Availability depends on the product, plan and permissions.",
  more:["learn/07-work-with-ai.html","Lesson 7: Work with an AI assistant"], stops:[
  {lane:2, i:"issue", t:"Write a clear Issue", d:"On GitHub.com open **Issues → New issue**. Describe one goal, the files allowed, what's not allowed (for example: don't change the CSV or main), and how you'll check the result.", s:"A numbered task, like Issue #3 in this repository.", w:"Small, checkable tasks work far better than \"improve everything\"."},
  {lane:2, i:"ai", t:"The AI opens a Pull Request", d:"Assign the Issue to the AI if your service supports that, or ask your connected assistant to work on a new branch and open a draft PR.", s:"A new branch and a draft Pull Request appear.", w:"Never ask an AI to merge its own work or push directly to main.", who:"ai"},
  {lane:2, i:"review", t:"Check the PR really exists", d:"Open **Pull requests** and find it. Read **Files changed** for every file.", s:"The exact lines the AI added or removed.", w:"If there's no PR link, there's nothing to review yet, whatever the chat says."},
  {lane:1, i:"branch", t:"Look at it locally (optional)", d:"In Desktop choose **Current Branch → Pull Requests** and pick the AI's PR to open its branch, then open the files in your editor.", s:"Your folder temporarily shows the proposed version.", w:"Comments and merging still happen on GitHub.com."},
  {lane:2, i:"merge", t:"Ask for fixes or merge", d:"Comment with exact file names and what to change. When it's right, click **Merge pull request**.", s:"The PR shows Merged.", w:""},
  {lane:1, i:"pull", t:"Update main", d:"**Current Branch → main → Fetch origin → Pull origin**.", s:"Your folder has the accepted version.", w:"A cloud AI's work never appears in your folder until you pull."}
 ]},
 {id:"fix", n:8, c:"--l8", goal:"Fix a mistake", when:"Something went wrong. Work down the route and stop at the first step that matches your situation.",
  more:["learn/08-fix-mistakes.html","Lesson 8: Fix mistakes"], stops:[
  {lane:1, i:"history", t:"First, find where you are", d:"Check **Current Repository**, **Current Branch**, the **Changes** tab and the **History** tab before clicking anything else.", s:"You'll know if the change is unsaved, committed, pushed or merged.", w:"Many \"lost\" files are just on another branch."},
  {lane:1, i:"warning", t:"Unwanted edit, not committed", d:"In **Changes**, click the file and read what would be lost. Copy anything you want to keep. Then right-click the file and choose **Discard changes…**", s:"The file returns to its last checkpoint.", w:"Discarding can't easily be undone. When unsure, back up the folder first."},
  {lane:1, i:"undo", t:"Just committed, not pushed", d:"Right after committing, Desktop shows an **Undo** button below the commit box. Click it to turn the commit back into editable changes.", s:"Your edits reappear in Changes, uncommitted.", w:"Only use Undo on checkpoints you haven't pushed."},
  {lane:1, i:"revert", t:"Already pushed or merged", d:"In **History**, right-click the commit and choose **Revert changes in commit**. Then click **Push origin**.", s:"A new checkpoint that cancels the old one. History stays honest.", w:"Don't force-push or delete branches to hide a shared mistake."},
  {lane:0, i:"conflict", t:"Merge conflict", d:"If Desktop lists conflicted files, click **Open in your editor**. Read both versions between the markers, keep the right text, delete the markers, and save. Back in Desktop, click **Continue merge**.", s:"The conflict list empties and the merge completes.", w:"Never assume the AI's or your own version should win. Ask the file's owner if unsure."}
 ]}
];
