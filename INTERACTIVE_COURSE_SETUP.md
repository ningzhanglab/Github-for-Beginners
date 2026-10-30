# Publish the Websites (Route Map and Interactive Course)

This repository includes two single-file websites:

- [`workflows.html`](workflows.html) — the **GitHub route map**, showing every everyday workflow step by step.
- [`index.html`](index.html) — the **interactive course** with a clickable Desktop simulator.

Neither needs a build step, API, account connection, or external JavaScript library. People can also save either HTML file and open it locally.

## Turn on GitHub Pages (repository owner/maintainer)

1. Open this repository's [**Settings → Pages**](https://github.com/ningzhanglab/Github-for-Beginners/settings/pages).
2. Under **Build and deployment**, find **Source** and choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/(root)`**.
4. Click **Save**.
5. Once GitHub shows the published address, open:

   **https://ningzhanglab.github.io/Github-for-Beginners/** (interactive course)

   **https://ningzhanglab.github.io/Github-for-Beginners/workflows.html** (route map)

These URLs are the expected addresses for this repository, **not confirmed live websites until GitHub Pages has been enabled and publishing has succeeded**. In Settings → Pages, use **Visit site** to verify publication.

## Why this is easier for learners

Learners receive **one website link** rather than navigating multiple Markdown files. The course has six lessons, animated progress, a clickable Desktop simulator, a simple collaboration walkthrough, a bounded AI review exercise, and a quick glossary/quiz.

**Safety:** The simulation never creates, uploads, deletes, or merges real GitHub files. Its “Publish” and “Accept” buttons only change the on-screen example.

## Works offline too

From the repository's [`index.html` file page](index.html), choose **Download raw** and save the file. Open it in Chrome, Firefox, Edge, or Safari. The exercises and diagrams use inline HTML/CSS/JavaScript, so an internet connection isn't needed for the simulations; official documentation links do require internet.

## Editing the course

- Change `index.html` for the lesson experience and `workflows.html` for the route map. Each route's steps are written as plain data near the top of the page's script.
- Browser tests live in `tests/course.spec.cjs` and `tests/workflows.spec.cjs` and run through GitHub Actions.
- Check changes in a Pull Request before merging into `main`.
- GitHub Pages will republish the updated site after changes are pushed to the configured source.

Official reference: [GitHub Pages — configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

*GitHub Pages sites are publicly viewable; don't include personal or confidential information in the published site.*
