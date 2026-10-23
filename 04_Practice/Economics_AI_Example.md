# An AI Agent Working on an Economics Research Project: A Complete Example

**Goal:** show *what to ask the AI agent to do*, which GitHub features keep it accountable, and exactly how to review it through GitHub Desktop and GitHub.com.

The toy research question uses **four fictional counties** and eight invented county-year records from 2024–2025. **Do not use this dataset for empirical claims.**

![Local agent versus remote agent changes](../assets/illustrations/agent-local-cloud-econ.svg)

## The research situation

A student writes a draft about county unemployment and nominal wages. They want an agent to **document the dataset's variables and check two arithmetic statements**, but **not change the data or infer causality**.

**Task captured in a real Issue:** [#3 — Document variables and verify calculations](https://github.com/ningzhanglab/Github-for-Beginners/issues/3).

### The exact prompt

> Work on `ningzhanglab/Github-for-Beginners`, restricted to `08_Live_Demo/econ-research-project/`. Create a separate branch called `demo/econ-review-checklist`. Explain all variables in the CSV and their units. Check Alpha's unemployment-rate change (5.0% to 4.5%) and nominal wage growth ($25 to $26). Do not alter the underlying CSV, other folders, or `main`. Do not estimate a model or make causal claims. Provide a readable checklist, state what remains unverified, and open a PR for human review if the GitHub connection allows it. Do not merge automatically.

This is deliberately **small and testable**. A good AI agent response lists actual files changed and verifiable evidence, not merely "finished".

## Step 1 — Separate the proposed work

**With a local agent:** in Desktop choose the intended repository; **Current Branch → New Branch**, enter `demo/econ-review-checklist`; open the same folder in your AI-enabled editor; verify the path and current branch before editing.

**With a cloud agent:** give the agent access to the intended repository only (if supported). Request a separate branch and PR targeting `main`.

**Why:** a failed experiment or incorrect AI edit should not replace your accepted draft automatically.

## Step 2 — Check the actual files, not just the agent message

The example proposed four changes:

| Proposed change | Review question |
|---|---|
| Add [data_dictionary.md](../examples/economics/data_dictionary.md) | Are units and variable meanings consistent with CSV? |
| Add [verification_checklist.md](../examples/economics/verification_checklist.md) | Are calculations correctly distinguished from model estimates? |
| Update [draft_results.md](../examples/economics/draft_results.md) | Are changes described in percentage points versus percent? |
| Update [research_log.md](../examples/economics/research_log.md) | Does the log distinguish actual checks from claims? |

**This is a real GitHub PR, not a separate independent AI experiment:** [PR #4 — Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). ChatGPT created it using authorized GitHub tools in response to the tutorial-building request. It illustrates the review workflow; no separate econometric analysis agent was run.

**Verification:** four tracked files changed, the synthetic CSV was not modified, and Alpha's simple calculations are `-0.5 percentage points` and `+4.0%`. No regression tests or statistical analysis were run.

## Step 3 — Review in GitHub Desktop

If the agent edits the **same local folder**, inspect **Changes** before Commit/Push. If it already committed, inspect **History**.

If the agent works **in the cloud**, open its PR on GitHub.com, and if still open select **Current Branch → Pull Requests** in Desktop to inspect the proposed branch locally. Our example PR #4 was **merged**, so you should read its historical diff online or the recorded commits in Desktop instead of expecting it to appear in an open-PR list.

To comment or request changes, use the PR in GitHub.com.

## Step 4 — Ask for corrections

A realistic PR review comment might say:

> In `draft_results.md`, describe 5.0% to 4.5% as a **0.5 percentage-point decline**, not a 0.5% decline. Mark wage numbers as nominal and do not make a causal claim. Keep the CSV unchanged and update the existing PR rather than creating unrelated new work.

The agent can edit the branch further if authorized, but the human should re-review the new diff.

## Step 5 — Merge and synchronize

Once a human approves an appropriate PR, merge it using GitHub.com. Then in Desktop, switch to `main`, **Fetch origin**, and **Pull origin**. Reopen `draft_results.md` in your local editor to verify the accepted result is present.

The actual example PR #4 was merged as a teaching demonstration; its closing of Issue #3 is visible in GitHub.

## Common failure modes

| Agent problem | Human response |
|---|---|
| It adds a plausible but unsourced "study finding" | Reject unsupported factual claims |
| It modifies `synthetic_county_panel.csv` unasked | Review diff and request restoration |
| It writes a regression coefficient but ran no model | Reject or label unverified; ask for reproducible evidence |
| It edits `main` directly | Use branch/PR practice and proper permissions before next task |
| It claims success without PR or file evidence | Verify repository/branch/commit or treat work as unconfirmed |
| It deletes old datasets/tables | Stop and inspect deletions; do not merge blindly |
| Its PR merges but your laptop still shows old data | Desktop `main` → Fetch → Pull |

## Three related ideas for your own economics project

1. **Agent reviews the data dictionary:** allowed to update documentation, not original data.
2. **Agent proposes a robustness specification:** work on `robustness/...`; include exact analysis script, output, assumptions, and tests. A PR should not be merged on the strength of an unsupported "robust" claim.
3. **Agent prepares a paper handoff:** summarize current `main` commit, reviewed experiments, unresolved issues, and reproducibility steps without inventing results.

**Official:** [Viewing PRs in GitHub Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop) · [Desktop branch management](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop).