# Publish the Interactive Course as a Website

This repository now includes a complete, single-file, interactive course at [`index.html`](index.html). It needs **no build step, API, account connection, or external JavaScript library**. People can also save the HTML file and open it locally.

## Turn on GitHub Pages (repository owner/maintainer)

1. Open this repository's [**Settings → Pages**](https://github.com/ningzhanglab/Github-for-Beginners/settings/pages).
2. Under **Build and deployment**, find **Source** and choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/(root)`**.
4. Click **Save**.
5. Once GitHub shows the published address, open:

   **https://ningzhanglab.github.io/Github-for-Beginners/**

The URL is the expected address for this repository, **not a confirmed live website until GitHub Pages has been enabled and publishing has succeeded**. In Settings → Pages, use **Visit site** to verify publication.

## Why this is easier for learners

Learners receive **one website link** rather than navigating multiple Markdown files. The course has six lessons, animated progress, a clickable Desktop simulator, a simple collaboration walkthrough, a bounded AI review exercise, and a quick glossary/quiz.

**Safety:** The simulation never creates, uploads, deletes, or merges real GitHub files. Its “Publish” and “Accept” buttons only change the on-screen example.

## Works offline too

From the repository's [`index.html` file page](index.html), choose **Download raw** and save the file. Open it in Chrome, Firefox, Edge, or Safari. The exercises and diagrams use inline HTML/CSS/JavaScript, so an internet connection isn't needed for the simulations; official documentation links do require internet.

## Editing the course

- Change `index.html` for the lesson experience.
- A browser-based test lives in `tests/course.spec.cjs` and runs through GitHub Actions.
- Check changes in a Pull Request before merging into `main`.
- GitHub Pages will republish the updated site after changes are pushed to the configured source.

Official reference: [GitHub Pages — configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

*GitHub Pages sites are publicly viewable; don't include personal or confidential information in the published site.*
