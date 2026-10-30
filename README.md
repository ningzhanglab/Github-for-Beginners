# GitHub Desktop for Beginners

**Learn to keep versions of your work, collaborate with people, and review an AI assistant's changes, using the GitHub Desktop app. No coding, no terminal.**

**Who it's for:** students, researchers, and anyone writing papers, notes or documentation who has never used GitHub. Every example uses a small, made-up economics project.

---

## Start here

Pick the way you like to learn. All three cover the same ideas.

| If you want to… | Open | Time |
|---|---|---|
| **See every workflow at a glance**, step by step | [GitHub route map](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html) (website) | Browse freely |
| **Practise clicking** in a safe GitHub Desktop simulator | [Interactive course](https://ningzhanglab.github.io/Github-for-Beginners/) (website) | About 20 minutes |
| **Do it for real** with your own first project | [Your First 15 Minutes](01_Start_Here/First_15_Minutes.md) (written lesson) | About 15 minutes |

The two websites never connect to a GitHub account or change real files.

> **Website link not opening?** GitHub Pages may not be switched on yet; a maintainer can follow [Publish the websites](INTERACTIVE_COURSE_SETUP.md). Meanwhile, open [`workflows.html`](workflows.html) or [`index.html`](index.html) here on GitHub, choose **Download raw file**, and double-click the downloaded file.

Not sure? Read the short overview below first. Each section ends with a link to its route on the map and to the full lesson.

---

## 1. Why use GitHub?

You have `paper_final.docx`, `paper_final_v2.docx` and `paper_final_revised.docx`. A classmate fixed a table and an AI assistant rewrote a paragraph. Which version is right, and who approved what?

**GitHub keeps a history of your project.** Instead of guessing from filenames, you can see every saved version, read exactly what changed, and decide whether to accept someone's proposed edit.

![Version history compared with confusing final-version filenames](assets/illustrations/why-github-econ.svg)

*Illustration using a fictional economics project; not a screenshot or a real research result.*

**Good fit:** revising papers and notes over time, working with coauthors, checking what an AI assistant changed, keeping text files such as Markdown, LaTeX, Python or R organized.

**Not the best fit:** editing the same document at the same moment with others (Google Docs is easier); comparing changes inside Word files or PDFs (GitHub can store them but can't show edits clearly); storing confidential research data or passwords (never upload these without authorization).

**Read more:** [Why GitHub? An economics research story](01_Start_Here/Why_GitHub.md)

---

## 2. The three places, and the six words you need

| Place | What it is | What you do there |
|---|---|---|
| **Your project folder** | The files on your computer | Edit with your usual editor |
| **GitHub Desktop** | The app that tracks and syncs changes | Review changes, save checkpoints, upload and download |
| **GitHub.com** | The shared online copy | View files, discuss tasks, review and accept proposals |

| Word | Meaning | Economics example |
|---|---|---|
| **Repository (repo)** | A project folder with a recorded history | All files for one paper |
| **Clone** | A connected copy of an online project on your computer | Download the shared project so you can keep it updated |
| **Commit** | Save a named checkpoint (on your computer) | "Explain wage variable units" |
| **Push** | Upload your checkpoints to GitHub.com | Share your updated notes |
| **Pull** | Download online changes into your folder | Receive a coauthor's accepted corrections |
| **Changes** | What's different since your last checkpoint | One paragraph edited |

**Commit is not Push.** A commit stays on your computer until you push it.

More words: [Plain-English dictionary](05_Help/Simple_Dictionary.md)

---

## 3. Your first project

You don't need branches or pull requests to start. The goal is to create a project, edit one file, and see it online.

![Illustrated map of important GitHub Desktop controls](assets/illustrations/desktop-controls-econ.svg)

*Simplified drawing, not an actual screenshot. Button positions can differ by app version.*

1. **Create:** install [GitHub Desktop](https://desktop.github.com/), sign in, choose **File → New repository…**, name it `my-first-notes`, tick **Initialize this repository with a README**.
2. **Edit:** choose **Repository → Show in Finder** (Mac) or **Show in Explorer** (Windows), open `README.md` in a plain-text editor, add a sentence, save.
3. **Check:** back in Desktop, click **Changes** to see exactly what you changed.
4. **Save:** type a Summary such as `Add my first note` and click **Commit to main**.
5. **Publish:** click **Publish repository** and keep it **private**.

After that, your everyday routine is: edit → **Commit** → **Push origin**. When someone else changed the online copy: **Fetch origin** → **Pull origin**.

**See it as a route:** [Create my first project](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#first) · [Save and upload a change](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#daily) · [Get changes someone else made](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#update)

**Full lesson:** [Your First 15 Minutes](01_Start_Here/First_15_Minutes.md) · [GitHub Desktop guide](02_GitHub_Desktop/README.md)

---

## 4. Working with others: branches, issues and pull requests

Learn these once you've done a first personal edit. They matter when a coauthor or an AI assistant is involved.

- **Branch:** a separate working version, so you can try a new specification without touching the accepted `main` version.
- **Issue:** a written task on GitHub.com, such as "Say whether the unemployment change is in percent or percentage points."
- **Pull Request (PR):** a review page proposing changes from a branch. You read the exact added and removed lines, then **Merge** (accept) or ask for fixes.

![From an Issue to a reviewed change and an updated project](assets/illustrations/econ-issue-to-merge.svg)

**A real example in this repository:** [Issue #3, the task](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) → [PR #4, what changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). The GitHub records are real; the counties and numbers are fictional.

**See it as a route:** [Propose a change for review](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#pr) · [Join a teammate's project](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#team)

**Full lesson:** [GitHub features through economics research](04_Practice/Economics_Examples.md)

---

## 5. Working with an AI assistant

An AI assistant can draft notes, document variables, or propose edits. **You still check its work before it becomes part of your project.**

![Where local and cloud AI assistants make their edits](assets/illustrations/agent-local-cloud-econ.svg)

| Your AI assistant… | Where its work shows up |
|---|---|
| Edits files on **your computer** | GitHub Desktop **Changes** (or **History** if it already committed) |
| Works on **GitHub.com** | A **Pull Request**; after you merge it, use **Pull origin** in Desktop |
| Can **only chat** | Nowhere until you paste its text into your file and commit it yourself |

**An instruction you can copy:**

> Please add a short data dictionary explaining my variables and their units. **Do not change the original CSV or `main`.** Use a separate branch if you can edit the repository. Tell me exactly which files you changed and what you verified. **Do not merge anything without my approval.** If you cannot edit files, give me the text to paste myself.

When an assistant says "done," ask which files, branch or pull request changed. A message is not proof.

**See it as a route:** [AI edits my folder](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#localai) · [AI works on GitHub.com](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#cloudai)

**Full lesson:** [Work with an AI assistant](03_Work_With_AI/README.md) · [Copy-paste prompts](03_Work_With_AI/Copy_Paste_Prompts.md)

---

## 6. A complete example to inspect

A small, fictional study of wages and unemployment in four counties over two years. The values are **invented** so you can learn safely.

| Step | Inspect it | What it shows |
|---|---|---|
| First research files saved | [First commit](https://github.com/ningzhanglab/Github-for-Beginners/commit/ef5dc6484fa1b9027c1e28eed92f9d2a7fccf6b4) | A checkpoint preserves what existed before any edit |
| A problem reported | [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) | A specific task is easier to hand to someone |
| A fix proposed | [PR #4, Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) | You can see every added and removed line before accepting |
| The fix accepted | [Current results](examples/economics/draft_results.md) | The reviewed version is now part of the project |

In the example, unemployment falls from **5.0% to 4.5%** (**0.5 percentage points**) and the hourly wage rises from **$25 to $26** (**4%**). This is arithmetic on made-up numbers, **not an economic estimate or causal finding**.

**Practise it yourself:** [Four hands-on labs](04_Practice/Try_It_Yourself.md) · [Economics + AI walkthrough](04_Practice/Economics_AI_Example.md)

---

## 7. When something looks wrong

| What you see | First thing to check |
|---|---|
| "I committed, but GitHub.com still shows the old file." | Did you click **Push origin**? Is the website showing the same branch? |
| "The AI says it finished, but my files haven't changed." | It may have worked on GitHub.com. Find its Pull Request, merge it if it's right, then **Fetch origin → Pull origin**. |
| "My files disappeared after switching branches." | Check **Current Branch** first. Different branches show different versions. |

Don't click **Discard**, delete branches or force-push just to make an error go away.

**See it as a route:** [Fix a mistake](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#fix)

**Full lesson:** [Fix problems](05_Help/Fix_Problems.md) · [One-page cheat sheet](02_GitHub_Desktop/Quick_Reference.md)

---

## What's in this repository

| Folder or file | What's inside |
|---|---|
| [`workflows.html`](workflows.html) | The GitHub route map website |
| [`index.html`](index.html) | The interactive course website |
| [`01_Start_Here/`](01_Start_Here/README.md) | Why GitHub, your first 15 minutes, illustrated examples |
| [`02_GitHub_Desktop/`](02_GitHub_Desktop/README.md) | The Desktop guide, workflow diagrams and cheat sheet |
| [`03_Work_With_AI/`](03_Work_With_AI/README.md) | Working with local and cloud AI assistants, ready-made prompts |
| [`04_Practice/`](04_Practice/README.md) | Hands-on labs and economics examples |
| [`05_Help/`](05_Help/README.md) | Fixing problems and a plain-English dictionary |
| [`examples/`](examples/README.md) | The fictional economics project and a reading-notes example |
| [`AGENTS.md`](AGENTS.md) | Rules for AI assistants that edit this repository |

**Official help:** [GitHub Desktop documentation](https://docs.github.com/en/desktop)

*This guide teaches GitHub Desktop, not Git commands. Interface images are illustrations, and exact layouts can change. Don't publish confidential information or give AI assistants more access than they need.*
