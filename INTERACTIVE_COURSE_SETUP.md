# Publish and Update the Guide

*This page is for the repository's maintainer. Learners don't need any of it.*

The whole guide is **one web page**, [`index.html`](index.html). It is a single self-contained file: icons and pictures are embedded, so it also works when downloaded and opened offline. An optional extra page, [`course.html`](course.html), is the clickable Desktop simulator.

## Turn on GitHub Pages (once)

1. Open this repository's [**Settings → Pages**](https://github.com/ningzhanglab/Github-for-Beginners/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/ (root)`**, then click **Save**.
4. After a minute or two, use **Visit site** to check. The guide's address is https://ningzhanglab.github.io/Github-for-Beginners/

The address only works once Pages is on and publishing has succeeded. Old links to `workflows.html` automatically forward to the matching lesson.

## Update the guide after editing a lesson

The lessons in [`lessons/`](lessons/README.md) are the source. **Edit those, never `index.html`, `assets/icons/` or `assets/routes/`**, which are generated.

After editing, rebuild the page. This needs [Node.js](https://nodejs.org/) and runs in a terminal, so it's a maintainer task (an AI coding assistant can also do it):

```text
npm install --no-save marked@15
node tools/build-site.cjs
```

Commit the rebuilt `index.html` together with your lesson edit. The automatic checks on every pull request rebuild the page and fail if it doesn't match the lessons, so a forgotten rebuild is caught before merging.

| To change… | Edit |
|---|---|
| A lesson's words | `lessons/*.md` |
| The order of sections, titles and times | the list at the top of `tools/build-site.cjs` |
| The page's look | `tools/site.css` |
| Contents highlighting, progress ticks | `tools/site.js` |
| An icon | `tools/icons.cjs` |
| A workflow's steps (route pictures) | `tools/routes.cjs` |

## Automatic checks

Pull requests that touch the guide run browser tests in `tests/`: the guide (`site.spec.cjs`) and the simulator (`course.spec.cjs`). Screenshots are saved with each run.

Official reference: [GitHub Pages: configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

*GitHub Pages sites are public. Don't put personal or confidential information in the repository.*
