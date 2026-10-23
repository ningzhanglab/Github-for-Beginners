# Local Agent + GitHub Desktop: A Step-by-Step Workflow

Use this when your agent can **read or edit a folder on your own computer** (for example through a supported code editor or local agent environment). The agent may not know which GitHub Desktop branch you have selected, so coordinate carefully.

## Step 1 — Choose the exact folder

1. Open GitHub Desktop and select the intended **Current Repository**.
2. Choose **Repository → Show in Finder / Show in Explorer** and note the folder path.
3. Open that **same path** in your editor/agent. Avoid a separate ZIP copy, stale clone, or Downloads folder.
4. Verify the editor shows the repository's current project files.

Ask the agent to **report its working directory** before it edits. If it reports a different location, stop.

## Step 2 — Protect the accepted version

1. In Desktop, switch to `main` and **Fetch origin → Pull origin**.
2. Select **Current Branch → New Branch**.
3. Name it, for example, `agent/improve-beginner-exercise`.
4. Confirm Desktop shows the new branch.
5. Tell the agent the branch name and explicitly prohibit changes to `main`.

If the agent uses its own separate worktree or copy, have it tell you the exact branch and folder; Desktop may not immediately show that work until you open the correct worktree or switch to the branch.

## Step 3 — Give an exact, limited task

Example:

> You are working in the local clone of `owner/project`. Confirm the folder path and current branch before editing. On `agent/improve-beginner-exercise`, improve only `04_Practice/Try_It_Yourself.md`: add one simple exercise on the difference between Commit and Push. Keep all existing exercises. Do not change settings, other files, or `main`. After editing, summarize the changed lines and report verification. Do not commit or push until I review.

**Why?** This lets Desktop show the agent's edits before publication. Some autonomous agents may act on their own unless explicitly constrained or controlled by platform permissions.

## Step 4 — Review in Desktop

Return to GitHub Desktop. Under **Changes**:

- Did only the intended file change?
- Are there unexplained deletions, renamed files, or binary data?
- Does the diff preserve existing useful content?
- Can you open the rendered Markdown and read it successfully?
- Is the edit complete, or does it need another revision?

Tell the agent to fix a narrow issue without making unrelated "improvements."

## Step 5 — Save and share

After your approval:

1. Select the files that belong in the change.
2. Write Summary: `Add safe beginner commit/push exercise`.
3. Click **Commit to agent/improve-beginner-exercise**.
4. Click **Publish branch** or **Push origin**.
5. **Preview Pull Request** → open a PR on GitHub. Review once more before merge.

If the agent already committed locally, check **History** instead of expecting its work in **Changes**. If the agent pushed too, compare the online PR; verify the actual commit rather than committing again.

## Step 6 — Sync after the PR is merged

Once the change has been reviewed and merged on GitHub.com:

1. Switch to `main` in Desktop.
2. **Fetch origin**, then **Pull origin**.
3. Open the finished file from the local folder and verify it matches the accepted change.

Do not copy the agent branch's files into `main` manually and then also merge the PR; you may duplicate or conflict with work.

## Local agent safety checklist

- [ ] Exact folder path confirmed
- [ ] Correct non-`main` branch in Desktop
- [ ] Agent task has explicit allowed/forbidden files
- [ ] Unrelated local edits preserved
- [ ] All modified files reviewed in Desktop
- [ ] Actual output previewed / available tests run
- [ ] Commit, push, PR completed only with intended changes
- [ ] Merged version pulled into local `main`

## If you need parallel work

For a simple beginner project, **one agent task at a time** is easiest. When two independent tasks must run concurrently, use different branches and, ideally, separate working folders/worktrees. Current GitHub Desktop releases support creating worktrees through **Repository → New Worktree…**; this is optional and more advanced.

[Worktree docs](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-worktrees-in-github-desktop) · [Desktop change review](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop).

Return to [Agent Collaboration Guide](AI_Guide.md).