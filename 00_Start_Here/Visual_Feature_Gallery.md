# Visual Gallery — GitHub Desktop and Economics Research

**Four annotated illustrations** show why GitHub matters and how its important features work in a small economics research project. Every diagram is intentionally simplified and is **not an actual GitHub Desktop screenshot**.

## 1. Why would an economics researcher use GitHub?

![Versioned economics research files versus multiple final copies](../assets/illustrations/why-github-econ.svg)

**Takeaway:** history gives context to research file changes. A filename such as `table_final_v5.tex` doesn't tell you which edit was reviewed and accepted.

**See it happen:** [initial research commit](https://github.com/ningzhanglab/Github-for-Beginners/commit/ef5dc6484fa1b9027c1e28eed92f9d2a7fccf6b4).

## 2. Where are the main buttons in GitHub Desktop?

![Annotated GitHub Desktop controls](../assets/illustrations/desktop-controls-econ.svg)

**Takeaway:** select repository, choose branch, inspect **Changes** or **History**, **Commit**, then **Push**. The diagram explains the function of each control, not its exact location in every version.

**Official real screenshots:** [GitHub Desktop first-repository guide](https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop) and [GitHub Desktop PR guide](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop).

## 3. How do Issue, Branch, Commit, PR and Merge fit together?

![Issue through merge example with a small economics project](../assets/illustrations/econ-issue-to-merge.svg)

**Takeaway:** an **Issue** defines the problem; a **Branch** isolates proposed work; a **Commit** saves changes; a **Pull Request** exposes the diff; **Merge** accepts reviewed work. Then the researcher uses **Fetch / Pull** to update the local `main` branch.

**Real examples:** [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) → [PR #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files).

## 4. What is different about local and cloud AI agents?

![Local edits versus remote agent branch changes](../assets/illustrations/agent-local-cloud-econ.svg)

**Takeaway:** a local agent edits your computer's folder; a remote agent (if authorized) writes to a GitHub branch. **The diff exists in different places.** An agent's chat summary is not proof of a saved, reviewed change.

**Deep dive:** [Economics research with AI Agent](../07_Econ_Research/Econ_Agent_Workflow.md).

## Try it in five minutes

1. Open [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3). Identify the requested files and acceptance criteria.
2. Open [PR #4 — Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). Count the changed files and verify the synthetic CSV was *not* changed.
3. Open [current descriptive results](../08_Live_Demo/econ-research-project/draft_results.md). Check the Alpha calculations and the warning against causal interpretation.
4. In **your own practice repository**, repeat the workflow in GitHub Desktop using an ordinary Markdown file.

All people, counties and data used for the economics scenario are fictional. The linked GitHub commits, Issue and PR are real teaching records.

Return to [Why GitHub Matters](Why_GitHub_Matters_Examples.md) or [the README](../README.md).
