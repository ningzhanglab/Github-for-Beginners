# Cloud Agent + GitHub Desktop: From Task to Approved PR

> **Level:** optional / advanced · **Read first:** [AI collaboration guide](AI_Guide.md)
>
> **New words on this page:** **Cloud agent** (an AI that works on GitHub.com, not on your computer), **Assignees** (the box on an Issue that says who should do it), **draft PR** (a proposal marked "not ready yet"), **Checks** (automatic tests; may be absent).

This is for an agent that **works on GitHub remotely**, not inside your current local folder. Examples include GitHub Copilot cloud agent when available, or a third-party/connected service that has permission to make branches and pull requests.

> Some agent features require a subscription, repository enablement, access approval, or a specific connector. A normal chat assistant may have only read access. Do not assume every agent can make commits or PRs.

## Step 1 — Write a focused issue/task on GitHub.com

Open your repository in the browser → **Issues → New issue** (if Issues is enabled) and describe:

- **Goal:** one thing that must be done
- **Allowed files:** exact folders or filenames
- **Not allowed:** deleting or renaming unrelated files, writing to `main`
- **Acceptance:** what a human should be able to check
- **Deliverable:** branch/PR and summary with verification evidence

A [copyable issue template](../.github/ISSUE_TEMPLATE/agent-task.md) is included in this repository.

## Step 2 — Delegate to an available agent

**GitHub Copilot cloud agent (when enabled):** assign an appropriate Issue to **Copilot** using the **Assignees** selector, optionally with extra instructions. It may work on a branch and open a PR. GitHub's exact Agents UI and access rules can change; follow the [official cloud-agent start guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview).

**Other connected agents:** ask the tool to inspect the correct repository, work on a dedicated branch, and open a PR if its permissions support it. Some agents can read but not write; some can prepare changes but cannot open PRs. If an action is unavailable, use a local editor workflow rather than claiming the PR exists.

**Do not** request automatic merge or force push to `main` for an unsupervised beginner task.

## Step 3 — Obtain concrete output links

The agent should report:

- repository and branch
- PR URL (if one was opened)
- changed/renamed/deleted files
- summary of behavior or documentation changes
- tests/checks performed and their results
- limitations and unresolved questions

A chat statement "I updated everything" is insufficient without repository evidence.

## Step 4 — Review online first

Open the PR on GitHub.com:

1. Check **Conversation** for what was requested and what was delivered.
2. Open **Files changed** and read every relevant file difference (including removed files).
3. Check any **Checks** or test results, if configured.
4. Comment with specific revisions; do not simply approve a summary.

A PR with a green check can still contain a logical or data-quality error.

## Step 5 — Review locally through GitHub Desktop

1. Open Desktop and select the project.
2. Select **Current Branch → Pull Requests**, then select the agent's PR. Desktop can check out that PR branch.
3. Use **History** and **Open in [editor]** to review the actual files.
4. Run the program, preview the website, or read the document locally as applicable.
5. To leave review comments or to merge, return to the PR on GitHub.com (Desktop does not submit PR review comments).

Alternative route: on the GitHub PR, select **Code → Local → Checkout with GitHub Desktop** if that option is visible.

## Step 6 — Request fixes or approve

If anything is wrong, comment on the PR with **exact file names and expected changes**. Have the agent update the same PR/branch if the tool supports it; re-review the new diff.

Once correct, merge the PR according to repository policy. After merging:

1. GitHub Desktop → **Current Branch → main**
2. **Fetch origin**
3. **Pull origin**
4. Open the accepted files locally and verify them.

Remember: a cloud agent's branch does not instantly update your local `main`.

## Two common collaboration mistakes

**You start editing the same file locally while the cloud agent is changing it remotely.** This can cause conflicts. Keep separate branches, or wait for the agent's PR and pull it first.

**You assume an agent has "merged" because it opened a PR.** Check the actual PR status. **Open ≠ merged**. A draft PR is not ready for final acceptance.

## Cloud-agent review checklist

- [ ] Agent was given only necessary repository access
- [ ] Issue/task had bounded scope
- [ ] Work occurred off `main`
- [ ] Actual PR exists and targets the expected base
- [ ] Full diff and unexpected deletions reviewed
- [ ] Tests/previews independently checked
- [ ] Limitations stated; no confidential data exposed
- [ ] Human reviewed and merged
- [ ] Local `main` updated in Desktop

**Official resources:** [Viewing PR in Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop) · [Copilot cloud-agent overview](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview).

Return to [Agent Collaboration Guide](AI_Guide.md).