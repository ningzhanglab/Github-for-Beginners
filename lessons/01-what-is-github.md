# Lesson 1: What is GitHub, and why use it?

> **You'll learn:** what GitHub does, the three places where your work lives, and the six words you'll see most.
> **Time:** 10 minutes. **You need:** nothing yet. Just read.

## The problem GitHub solves

You're writing an economics paper. After a few weeks your folder looks like this:

```text
paper_final.docx
paper_final_v2.docx
paper_final_v2_fixed.docx
paper_final_REALLY_final.docx
```

A coauthor fixed a table. An AI assistant rewrote a paragraph. Which file is right? What changed, and who approved it?

![Many final copies compared with one project and its history](../assets/illustrations/why-github-econ.svg)

*Illustration of a fictional project, not a screenshot.*

**GitHub keeps one project with a history of named checkpoints.** You can look back at any earlier version, see exactly which lines changed, and decide whether to accept someone else's edit before it becomes the official version.

## The three places your work lives

Every lesson in this guide uses these three places. Each has its own colour on the icons, so you always know where a step happens.

| | Place | What it is | What you do there |
|---|---|---|---|
| <img src="../assets/icons/place-folder.svg" width="20" height="20" alt=""> | **Your project folder** | Ordinary files on your computer | Open and edit them with your usual editor |
| <img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> | **GitHub Desktop** | A free app for Mac and Windows | See what changed, save checkpoints, upload and download |
| <img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> | **GitHub.com** | The shared online copy | View files, discuss tasks, review and accept changes |

You never type commands. GitHub Desktop has buttons for everything in this guide.

## Six words you'll see everywhere

| | Word | Plain meaning | Example |
|---|---|---|---|
| <img src="../assets/icons/new-repo.svg" width="20" height="20" alt=""> | **Repository** (repo) | A project folder that remembers its history | All files for one paper |
| <img src="../assets/icons/changes.svg" width="20" height="20" alt=""> | **Changes** | What's different since your last checkpoint | You edited one paragraph |
| <img src="../assets/icons/commit.svg" width="20" height="20" alt=""> | **Commit** | Save a named checkpoint, on your computer | "Explain wage units in table 1" |
| <img src="../assets/icons/push.svg" width="20" height="20" alt=""> | **Push** | Upload your checkpoints to GitHub.com | Share your updated notes |
| <img src="../assets/icons/pull.svg" width="20" height="20" alt=""> | **Pull** | Download changes from GitHub.com to your folder | Get a coauthor's corrections |
| <img src="../assets/icons/branch.svg" width="20" height="20" alt=""> | **Branch** | A separate working version for trying things | Test a new specification safely |

**The one rule to remember:** commit saves on your computer; push puts it online. Until you push, nobody else can see your checkpoint.

## When is GitHub a good idea?

| | Situation | Use GitHub? |
|---|---|---|
| <img src="../assets/icons/check.svg" width="20" height="20" alt=""> | Revising notes, Markdown, LaTeX, R or Python files over weeks | **Yes.** You'll see every change. |
| <img src="../assets/icons/check.svg" width="20" height="20" alt=""> | A coauthor or an AI assistant proposes edits you want to check first | **Yes.** Review pages were made for this. |
| <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> | Writing together at the same moment, like in Google Docs | **Not ideal.** A shared document editor is easier. |
| <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> | Word files and PDFs | **Works, but** GitHub can't show what changed inside them. |
| <img src="../assets/icons/lock.svg" width="20" height="20" alt=""> | Confidential data, student records, passwords | **No**, unless your institution has approved it. |

## See a real example (nothing to install)

This repository contains a tiny, made-up economics project with real GitHub records you can click:

1. <img src="../assets/icons/commit.svg" width="20" height="20" alt=""> [The first saved version](https://github.com/ningzhanglab/Github-for-Beginners/commit/ef5dc6484fa1b9027c1e28eed92f9d2a7fccf6b4): a checkpoint of the original files.
2. <img src="../assets/icons/issue.svg" width="20" height="20" alt=""> [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3): a written task asking for variable definitions and a calculation check.
3. <img src="../assets/icons/pull-request.svg" width="20" height="20" alt=""> [Pull Request #4, Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files): the proposed edits, line by line, before they were accepted.

The counties and numbers are fictional. The GitHub records are real.

## Check yourself

<details><summary>You clicked Commit. Can your coauthor see your change yet?</summary>

No. A commit is saved on your computer only. You need to **Push** before it appears on GitHub.com.
</details>

<details><summary>Where do you actually edit a file: GitHub Desktop or your editor?</summary>

Your editor (for example TextEdit, Notepad, Word or VS Code). GitHub Desktop shows and saves the changes; it isn't where you type.
</details>

---

**Next:** [Lesson 2: Get set up](02-get-set-up.md) · [All lessons](README.md)
