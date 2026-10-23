# GitHub Desktop for Beginners

**Understand GitHub, manage your work, and collaborate with AI — no coding or terminal required.**

This page is the **complete beginner's overview**. Read straight down to learn the main ideas. Each section gives you a simple example, what the feature does, and **one link to a full step-by-step lesson** when you're ready.

**Who is this for?** Students, researchers, people writing papers or documentation, and anyone who has never used GitHub. We focus on the **GitHub Desktop app** for Windows and Mac, not Git commands.

---

## 🎮 New: Learn by clicking — interactive HTML course

Want to **practice instead of only reading**? The new six-lesson course lets you click through an illustrated GitHub Desktop simulator:

**Why GitHub? → Your project folder vs Desktop vs website → Create a repo → Edit a README → Review → Commit → Publish → Work with others and AI.**

It's **safe practice**: the simulator does not connect to a real GitHub account or edit real projects. It works as a single standalone HTML file, without installing dependencies.

- **[Open the interactive HTML file](index.html)** — from its GitHub file page, select **Download raw**, then open the downloaded `index.html` in a web browser.
- **[Publish it as an easy one-click website](INTERACTIVE_COURSE_SETUP.md)** — a repository maintainer can enable GitHub Pages (no extra hosting required).

The rest of this README is a quick written overview; the HTML course is for hands-on learning.

---

## 1. Why use GitHub?

### The problem: “Which version is the right one?”

Imagine working on an economics paper. You have `paper_final.docx`, `paper_final_v2.docx`, and `paper_final_revised.docx`. A classmate fixes the table, and an AI assistant rewrites the explanation. Now it's hard to remember **what changed, which version was correct, and what was approved**.

**GitHub helps keep a history of your project.** Instead of relying only on filenames, you can see earlier saved versions, inspect changes, and decide whether to accept a collaborator's proposal.

![Version history compared with confusing final-version filenames](assets/illustrations/why-github-econ.svg)

*Illustration using a fictional economics project; not a screenshot or a real research result.*

### When is GitHub useful?

- **Writing and revising:** save checkpoints as a paper or project develops.
- **Working with others:** let a classmate suggest a change without immediately replacing your accepted version.
- **Working with AI:** check exactly which files an assistant changed before accepting them.
- **Research projects:** organize notes, scripts, small examples, and documentation in one place.

**It's not the best tool for everything.** Google Docs is usually easier for editing the same document simultaneously. Ordinary GitHub history works best for **text-based files** (such as Markdown, LaTeX, Python, or R); changes inside Word files or PDFs are harder to compare. Never upload private research data or credentials without appropriate authorization.

**Want the longer explanation?** [Read: Why GitHub? — an economics research story](01_Start_Here/Why_GitHub.md).

---

## 2. How does GitHub actually work?

You only need to understand **three places**:

| Place | In plain English | What you do there |
|---|---|---|
| **Your computer's project folder** | The files you are working on | Open and edit your paper or notes with your usual editor |
| **GitHub Desktop** | The app that tracks and shares changes | Look at changed files, save a checkpoint, and sync |
| **GitHub.com** | The shared online version of the project | View files, discuss tasks, and review proposed updates |

**A typical personal workflow:** Open your project folder → edit a file → review it in Desktop → **Commit** (save a checkpoint) → **Push** (upload to GitHub.com).

**When someone else changes the online project:** use **Pull** in Desktop to bring those updates back to your computer.

### The six words you'll see most often

| Term | What it really means | Economics example |
|---|---|---|
| **Repository (repo)** | A project folder with a recorded history | All files for one economics paper |
| **Clone** | Make a connected copy of an online project on your computer | Download the shared research project so you can keep it updated |
| **Changes** | Show what's different since the last saved checkpoint | A paragraph or table note was edited |
| **Commit** | Save a named checkpoint | “Explain wage variable units” |
| **Push** | Send your saved changes to GitHub.com | Publish your updated notes |
| **Pull** | Bring online changes into your local project | Receive a teammate's accepted corrections |

**Want a visual explanation?** [Read: GitHub Desktop — beginner guide](02_GitHub_Desktop/Desktop_Guide.md).

---

## 3. Your first project in GitHub Desktop

You don't need to understand branches or pull requests to start. Your first goal is simply to **create a project, edit one file, and see it online**.

![Illustrated map of important GitHub Desktop controls](assets/illustrations/desktop-controls-econ.svg)

*Simplified interface drawing, not an actual screenshot. Button labels or positions can differ by app version.*

### Try these five steps

1. **Create:** Download [GitHub Desktop](https://desktop.github.com/), sign in, and choose **File → New repository…**. Name it `my-first-notes` and initialize it with a README.
2. **Edit:** Open the project folder using **Repository → Show in Finder / Explorer**. Open `README.md` in any plain-text editor, add one sentence, and save it.
3. **Check:** Return to Desktop → **Changes**. You can see exactly what you changed.
4. **Save:** Type a short Summary, such as `Add my first note`, and click **Commit to main**.
5. **Publish:** Click **Publish repository**, keep it **private** for practice, and view it on GitHub.com.

**That's your first complete GitHub workflow.** Next time, make another edit, Commit, and use **Push origin** to upload your new checkpoint.

**Want the full click-by-click instructions?** [Read: Your First 15 Minutes](01_Start_Here/First_15_Minutes.md).

---

## 4. What are branches, tasks, and pull requests?

These features become useful **when more than one person — or an AI assistant — works on a project**. You can learn them after your first personal edit.

### Branch = a safe place to try changes

Suppose your current economics paper is correct, but you want to try a different regression specification. Create a **Branch**: a separate line of work where you can experiment without changing the accepted `main` version immediately.

### Issue = a task or question

Instead of saying “please fix the dataset,” create an **Issue**, such as: “Explain whether the unemployment change is measured in percent or percentage points.” Now everyone knows what needs to be done.

### Pull Request (PR) = a proposal to review

Your classmate or agent makes changes on a branch and opens a **Pull Request**. You can compare the old and new lines, request corrections, and choose whether to **Merge** (accept) the proposal into `main`.

![From an Issue to a reviewed change and an updated project](assets/illustrations/econ-issue-to-merge.svg)

**Real demonstration:** [Issue #3 — the task](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) → [PR #4 — see what changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). The GitHub records are real teaching examples, but the counties and economic data are fictional.

**Want more examples of each feature?** [Read: GitHub Features Through Economics Research](04_Practice/Economics_Examples.md).

---

## 5. How can an AI assistant work with you?

An AI assistant can draft notes, document variables, or propose edits. **But you should see and check its work before treating it as finished.**

### There are two common situations

![Where local and cloud AI assistants make their edits](assets/illustrations/agent-local-cloud-econ.svg)

- **Local assistant:** edits files in the project folder on your computer. Look in GitHub Desktop's **Changes** or **History** to see its work.
- **Cloud/connected assistant:** may edit a branch on GitHub.com and open a Pull Request, if it has permission. Check **Pull requests** on GitHub.com; then use Desktop to pull the accepted changes after merging.

Some AI chats can **only suggest text**, not directly access your repository. In that case, paste the suggestion into your editor, check it in Desktop, and commit it yourself.

### A simple collaboration example

Ask the agent to explain the variables in your economics dataset. Don't let it silently change the data:

> Please add a short data dictionary explaining my variables and their units. **Do not change the original CSV or `main`.** Use a separate branch if you can edit the repository. Tell me exactly which files you changed and what you verified. **Do not merge anything without my approval.** If you cannot edit files, give me the text to paste myself.

**The important lesson:** AI can propose the work; **you review the differences and approve the result**.

**Want a detailed local/cloud workflow and more ready-made prompts?** [Read: Working With AI](03_Work_With_AI/README.md).

---

## 6. See a whole economics example, then practice

Here is a small, fictional study of wages and unemployment in four counties across two years. The values are **invented** so you can learn the workflow without using real private research data.

| What happened | What you can inspect | Why it matters |
|---|---|---|
| Initial research files were saved | [First project commit](https://github.com/ningzhanglab/Github-for-Beginners/commit/ef5dc6484fa1b9027c1e28eed92f9d2a7fccf6b4) | A checkpoint preserves what existed before an edit |
| A documentation problem was reported | [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) | A specific task is easier to delegate |
| An improved explanation was proposed | [PR #4 — Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) | You can see what was added or removed before accepting |
| The proposed change was merged | [Current example results](examples/economics/draft_results.md) | The accepted version is now part of the project |

In the example, unemployment drops from **5.0% to 4.5%**, which is **0.5 percentage points**, while a fictional hourly wage rises from **$25 to $26**, or **4%**. This is arithmetic on made-up numbers — **not an economic estimate or causal finding**.

**Want to try this yourself?** [Read: Practice exercises and economics examples](04_Practice/README.md).

---

## 7. Quick help when something looks wrong

**“I saved a change, but I don't see it on GitHub.com.”** A Commit saves it locally; you may still need **Push origin**. Also check you're looking at the correct online branch.

**“The agent says it finished, but my computer's files haven't changed.”** It might have worked on an online branch. Find the actual Pull Request, check whether it was merged, then use **Fetch / Pull** in Desktop.

**“My files disappeared after I changed branches.”** Check the **Current Branch** selector first. Different branches can show different versions of the same project. Don't delete files or discard changes until you're sure.

**Need more help?** [Read: Common Problems and Plain-English Dictionary](05_Help/README.md).

---

### Where to go next

If you've only read the overview, your best next step is **[Your First 15 Minutes](01_Start_Here/First_15_Minutes.md)**. You'll make one real project using the Desktop app, and the rest of the guide will feel much more familiar.

**Extra resources (optional):** [Four illustrated explanations](01_Start_Here/Pictures_And_Examples.md) · [Quick Desktop cheat sheet](02_GitHub_Desktop/Quick_Reference.md) · [Example project files](examples/README.md) · [Official GitHub Desktop help](https://docs.github.com/en/desktop).

*This guide teaches graphical GitHub Desktop workflows; no terminal commands. All interface images above are explicitly illustrative, and exact layouts can change. Don't publish confidential information or grant AI assistants more access than they need.*
