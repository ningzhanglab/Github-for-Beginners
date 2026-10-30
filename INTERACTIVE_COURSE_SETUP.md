# Publish and Update the Guide

*This page is for the repository's maintainer. Learners don't need any of it.*

The guide is **one web page**, [`index.html`](index.html): a single story (Mia's wage-study notes) followed through 16 steps, each showing her folder, GitHub Desktop and GitHub.com side by side. It is one self-contained file, so it also works when downloaded and opened offline. The optional practice simulator is [`course.html`](course.html).

## Turn on GitHub Pages (once)

1. Open this repository's [**Settings → Pages**](https://github.com/ningzhanglab/Github-for-Beginners/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/ (root)`**, then click **Save**.
4. After a minute or two, use **Visit site** to check. The guide's address is https://ningzhanglab.github.io/Github-for-Beginners/

The address only works once Pages is on and publishing has succeeded. Old links to `workflows.html` forward to the matching step.

## Change the guide

`index.html` is generated. **Don't edit it by hand.** Edit the sources below, then rebuild.

| To change… | Edit |
|---|---|
| A step's words, or what a place shows in a step | [`tools/story.cjs`](tools/story.cjs) |
| The page's look | [`tools/guide.css`](tools/guide.css) |
| Contents highlighting and the phone step menu | [`tools/guide.js`](tools/guide.js) |
| The page's layout, intro and closing sections | [`tools/build-guide.cjs`](tools/build-guide.cjs) |
| An icon | [`tools/icons.cjs`](tools/icons.cjs) |
| The route pictures in the Markdown lessons | [`tools/routes.cjs`](tools/routes.cjs) |

Rebuilding needs [Node.js](https://nodejs.org/) and runs in a terminal, so it's a maintainer task (an AI coding assistant can also do it). Nothing needs installing:

```text
node tools/build-guide.cjs
```

Commit the rebuilt `index.html` with your change. The automatic checks on every pull request rebuild the page and fail if it doesn't match the sources, so a forgotten rebuild is caught before merging.

## Automatic checks

Pull requests that touch the guide run browser tests in `tests/`: the guide (`site.spec.cjs`) and the simulator (`course.spec.cjs`). Screenshots are saved with each run.

Official reference: [GitHub Pages: configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

*GitHub Pages sites are public. Don't put personal or confidential information in the repository.*
