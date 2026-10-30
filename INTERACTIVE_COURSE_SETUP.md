# Publish the Website

*This page is for the repository's maintainer. Learners don't need any of it.*

The repository publishes one website with three parts:

| Page | What it is | Made from |
|---|---|---|
| [`index.html`](index.html) and [`learn/`](learn/) | The home page and the eight lessons | Generated from [`lessons/`](lessons/README.md) |
| [`workflows.html`](workflows.html) | The route map | Hand-written single file |
| [`course.html`](course.html) | The Desktop simulator | Hand-written single file |

No server, database or account connection is needed.

## Turn on GitHub Pages (once)

1. Open this repository's [**Settings → Pages**](https://github.com/ningzhanglab/Github-for-Beginners/settings/pages).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/ (root)`**, then click **Save**.
4. After a minute or two, use **Visit site** to check it. The expected addresses are:
   - https://ningzhanglab.github.io/Github-for-Beginners/ (home and lessons)
   - https://ningzhanglab.github.io/Github-for-Beginners/workflows.html (route map)
   - https://ningzhanglab.github.io/Github-for-Beginners/course.html (simulator)

These addresses only work once Pages is turned on and publishing has succeeded.

## Update the website after editing a lesson

The lessons in `lessons/` are the source. **Edit those, never the generated files in `learn/`, `index.html`, `assets/icons/` or `assets/routes/`.**

After editing, rebuild the website. This needs [Node.js](https://nodejs.org/) and runs in a terminal, so it's a maintainer task; an AI coding assistant can also do it for you:

```text
npm install --no-save marked@15
node tools/build-site.cjs
```

Then commit the changed files together with your lesson edit. The automatic checks on every pull request rebuild the website and fail if it doesn't match the lessons, so a forgotten rebuild is caught before merging.

| To change… | Edit |
|---|---|
| A lesson's words | `lessons/*.md` |
| The order or titles on the website | the list at the top of `tools/build-site.cjs` |
| The website's look | `tools/site.css` |
| An icon | `tools/icons.cjs` |
| A route's steps (route map and route pictures) | the route data near the top of the script in `workflows.html` |

## Automatic checks

Every pull request that touches the website runs browser tests in `tests/`: the simulator (`course.spec.cjs`), the route map (`workflows.spec.cjs`) and the lesson website (`site.spec.cjs`). Screenshots are saved with each run.

Official reference: [GitHub Pages: configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

*GitHub Pages sites are public. Don't put personal or confidential information in the repository.*
