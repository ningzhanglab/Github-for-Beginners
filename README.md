# GitHub for Beginners

**Learn GitHub by following one small project from start to finish.** No coding, no terminal: just the free GitHub Desktop app.

## 👉 [Open the guide](https://ningzhanglab.github.io/Github-for-Beginners/)

On one page, you follow Mia as she keeps the notes for a small wage study:

| Part | What happens | Steps |
|---|---|---|
| <img src="assets/icons/commit.svg" width="28" height="28" alt=""> **1. On your own** | Mia creates a project, writes a note, saves checkpoints, and puts it online | 1–5 |
| <img src="assets/icons/people.svg" width="28" height="28" alt=""> **2. With a coauthor** | Sam fixes a line online; Mia pulls it, tries a table on a branch, and Sam reviews and merges it | 6–12 |
| <img src="assets/icons/ai.svg" width="28" height="28" alt=""> **3. With an AI assistant** | An AI adds a data dictionary but also changes a number; Mia catches it before accepting | 13–15 |
| <img src="assets/icons/revert.svg" width="28" height="28" alt=""> **4. When something goes wrong** | Mia safely undoes a mistake she already shared | 16 |

**Every step shows all three places side by side**, so you can see what changed where:

| <img src="assets/icons/place-folder.svg" width="28" height="28" alt=""> Your folder | <img src="assets/icons/place-desktop.svg" width="28" height="28" alt=""> GitHub Desktop | <img src="assets/icons/place-web.svg" width="28" height="28" alt=""> GitHub.com |
|---|---|---|
| The files on your computer, which you edit as usual | The app that shows changes, saves checkpoints and syncs | The online copy, where people review and accept changes |

Steps 1 to 5 are all you need for personal work.

> **Link not opening?** The website may not be switched on yet ([how to switch it on](INTERACTIVE_COURSE_SETUP.md)). You can also download [`index.html`](index.html) (choose **Download raw file**) and double-click it: the whole guide is in that one file and works offline.

## Want more?

- **Detailed lessons** you can read here on GitHub: [start with Lesson 1](lessons/01-what-is-github.md), or see [all lessons](lessons/README.md).
- **A practice simulator**: a safe, pretend GitHub Desktop to click through ([open it](https://ningzhanglab.github.io/Github-for-Beginners/course.html)).
- **A real example**: this repository's [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) and [Pull Request #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) show a reviewed change to a fictional [economics project](examples/economics/README.md).

## For maintainers

| File or folder | What it is |
|---|---|
| [`index.html`](index.html) | **The guide page.** Generated; don't edit it by hand |
| [`tools/story.cjs`](tools/story.cjs) | **The story**: every step's words and what each place shows. Edit this to change the guide |
| [`tools/guide.css`](tools/guide.css), [`tools/guide.js`](tools/guide.js) | The page's look and its small script |
| [`lessons/`](lessons/README.md) | The detailed lessons in Markdown |
| [`course.html`](course.html) | The practice simulator |
| [`assets/`](assets/) | Icons, route pictures and illustrations |
| [`examples/`](examples/README.md) | The fictional example projects |
| `01_Start_Here/` … `05_Help/` | Old pages, kept only so old links still work |
| [`AGENTS.md`](AGENTS.md) | Rules for AI assistants that edit this repository |

How to publish and update the guide: [INTERACTIVE_COURSE_SETUP.md](INTERACTIVE_COURSE_SETUP.md).

*This guide teaches GitHub Desktop, not Git commands. Mia, Sam and the numbers are made up, and the screens are simplified drawings; see the [official GitHub Desktop documentation](https://docs.github.com/en/desktop) for exact labels.*
