# GitHub for Beginners

**Learn GitHub one picture at a time.** Keep versions of your work, collaborate with coauthors, and check what an AI assistant changed, using the free GitHub Desktop app. No coding, no terminal.

**For:** students, researchers and anyone writing papers, notes or documentation who has never used GitHub. Every example uses a small, made-up economics project.

[![The route for proposing a change: each numbered circle is one step, placed in the band where it happens](assets/routes/pr.svg)](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#pr)

*Every lesson shows its workflow as a route like this one: each circle is a step, placed in the band where it happens.*

## Every step happens in one of three places

| | Place | What you do there |
|---|---|---|
| <img src="assets/icons/place-folder.svg" width="28" height="28" alt=""> | **Your project folder** | Edit files with your usual editor |
| <img src="assets/icons/place-desktop.svg" width="28" height="28" alt=""> | **GitHub Desktop** | See what changed, save checkpoints, upload and download |
| <img src="assets/icons/place-web.svg" width="28" height="28" alt=""> | **GitHub.com** | Review and accept changes with others |

The icon colours in every lesson match these places, so you always know where a step happens.

## The eight lessons

| | Lesson | You'll be able to… | Time |
|---|---|---|---|
| <img src="assets/icons/idea.svg" width="28" height="28" alt=""> | [1. What is GitHub?](lessons/01-what-is-github.md) | Explain the three places and six key words | 10 min |
| <img src="assets/icons/install.svg" width="28" height="28" alt=""> | [2. Get set up](lessons/02-get-set-up.md) | Have an account and GitHub Desktop ready | 10 min |
| <img src="assets/icons/new-repo.svg" width="28" height="28" alt=""> | [3. Your first project](lessons/03-your-first-project.md) | Create, edit, commit and publish a project | 15 min |
| <img src="assets/icons/push.svg" width="28" height="28" alt=""> | [4. Save and sync every day](lessons/04-save-and-sync.md) | Push your work and pull others' work | 10 min |
| <img src="assets/icons/branch.svg" width="28" height="28" alt=""> | [5. Branches and pull requests](lessons/05-branches-and-pull-requests.md) | Try changes safely and accept them after review | 20 min |
| <img src="assets/icons/people.svg" width="28" height="28" alt=""> | [6. Work with other people](lessons/06-work-with-other-people.md) | Join a project, write Issues, get reviews | 20 min |
| <img src="assets/icons/ai.svg" width="28" height="28" alt=""> | [7. Work with an AI assistant](lessons/07-work-with-ai.md) | Let AI help while you decide what's accepted | 20 min |
| <img src="assets/icons/undo.svg" width="28" height="28" alt=""> | [8. Fix mistakes](lessons/08-fix-mistakes.md) | Undo safely at every stage | 15 min |

Lessons 1 to 4 are all you need for a personal project.

**Also:** <img src="assets/icons/practice.svg" width="20" height="20" alt=""> [Practise everything](lessons/practice.md) · <img src="assets/icons/list.svg" width="20" height="20" alt=""> [Cheat sheet](lessons/cheat-sheet.md) · <img src="assets/icons/book.svg" width="20" height="20" alt=""> [Dictionary](lessons/dictionary.md) · <img src="assets/icons/ai-chat.svg" width="20" height="20" alt=""> [AI prompt library](lessons/ai-prompts.md)

## Prefer a website?

The same lessons are published as a website, together with two interactive tools. None of them connect to a GitHub account or change real files.

| | Website | What it's for |
|---|---|---|
| <img src="assets/icons/book.svg" width="28" height="28" alt=""> | [Lesson website](https://ningzhanglab.github.io/Github-for-Beginners/) | The eight lessons with easy next/previous navigation |
| <img src="assets/icons/map.svg" width="28" height="28" alt=""> | [Route map](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html) | Step through all eight workflows interactively |
| <img src="assets/icons/practice.svg" width="28" height="28" alt=""> | [Desktop simulator](https://ningzhanglab.github.io/Github-for-Beginners/course.html) | Click through a safe, pretend GitHub Desktop |

> **Website not opening?** GitHub Pages may not be switched on yet; see [Publish the website](INTERACTIVE_COURSE_SETUP.md). The Markdown lessons above always work.

## A real example to look at

This repository contains a fictional economics project with real GitHub records: [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) asked for variable definitions, and [Pull Request #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) proposed them for review before they were accepted. The project files are in [examples/economics](examples/economics/README.md). The counties and numbers are invented.

## What's in this repository

| Folder or file | What's inside |
|---|---|
| [`lessons/`](lessons/README.md) | **The lessons.** Edit these to change the guide. |
| [`learn/`](learn/) and [`index.html`](index.html) | The lesson website, generated from `lessons/` |
| [`workflows.html`](workflows.html) | The route map website |
| [`course.html`](course.html) | The Desktop simulator website |
| [`assets/`](assets/) | Icons, route pictures and illustrations |
| [`examples/`](examples/README.md) | The fictional economics project and a reading-notes example |
| [`tools/`](tools/) | The script that builds the website, icons and route pictures |
| `01_Start_Here/` … `05_Help/` | Older pages, kept only so old links still work. Each points to its new lesson. |
| [`AGENTS.md`](AGENTS.md) | Rules for AI assistants that edit this repository |

**Maintainers:** after editing a lesson, rebuild the website as described in [Publish the website](INTERACTIVE_COURSE_SETUP.md#update-the-website-after-editing-a-lesson). Automatic checks will flag a pull request if the website is out of date.

*This guide teaches GitHub Desktop, not Git commands. Pictures are illustrations, and exact button positions can change; see the [official GitHub Desktop documentation](https://docs.github.com/en/desktop). Don't publish confidential information or give AI assistants more access than they need.*
