# GitHub Desktop Beginner Handbook

> **Level:** second step, after your first project · **Read first:** [Your First 15 Minutes](../01_Start_Here/First_15_Minutes.md)
>
> **New words on this page:** **Branch** (a separate working version), **Pull Request / PR** (a review page proposing changes), **Checks** (automatic tests GitHub may run on a PR; many beginner projects have none), **worktree** (an optional second working folder — you can skip it).

![Annotated illustration of GitHub Desktop controls](../assets/illustrations/desktop-controls-econ.svg)

**First-time reader?** Try the [Economics Research Visual Walkthrough](../01_Start_Here/Why_GitHub.md) and its real [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) / [PR #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) examples.

This handbook teaches the everyday **graphical workflow**, not command-line Git. It is for managing research files, class projects, documentation, and code—especially when another person or an AI agent makes changes.

## 1. The four things in your workflow

| Component | What it does | What it does **not** do |
|---|---|---|
| GitHub website | Stores and shares repositories; manages Issues and PR reviews | Does not automatically update an offline folder |
| GitHub Desktop | Tracks changes and syncs branches | Is not your primary document editor or AI agent |
| Local editor | Edits, previews, runs files | Does not necessarily upload changes |
| Agent | Suggests and sometimes edits files according to access | Does not replace your review |

The central routine: **choose branch → edit → inspect → commit → push → review PR → merge → pull**.

## 2. Know the GitHub Desktop screen

- **Current Repository**: which project folder you are operating on.
- **Current Branch**: which version/line of work is active. Before editing, check this.
- **Changes**: files changed on the current local branch, including additions/deletions.
- **History**: past commits, their messages, and their affected files.
- **Fetch origin**: check whether GitHub has new changes.
- **Pull origin**: bring available changes from GitHub into the selected local branch.
- **Commit to …**: save a named local checkpoint of selected changes.
- **Publish branch / Push origin**: send your committed work to GitHub.
- **Preview Pull Request**: compare your branch against a target branch before opening a PR.

The toolbar action may change based on the state of the repository.

## 3. Clone instead of downloading ZIP

**Clone** when you intend to keep editing, collaborating, or syncing. From **File → Clone Repository…**, select **GitHub.com** or **URL**, choose a local folder, and click **Clone**. Remember the folder path.

**Download ZIP** when you only want to read or copy files. It will not appear as an automatically connected repository in Desktop.

If you already cloned the project, do not repeatedly clone it to "get the latest": use **Fetch origin** and **Pull origin**.

## 4. Your first normal edit

1. In Desktop, verify the correct repository and branch.
2. For shared projects, make a new branch: **Current Branch → New Branch**.
3. Use **Repository → Open in [editor]** or open the same folder manually.
4. Edit one or two related files; save them in the editor.
5. Return to Desktop → **Changes**. Read the preview and filenames.
6. Select only the files intended for this checkpoint.
7. Write a meaningful short Summary such as `Document wage variable units`.
8. **Commit to [branch]**. Then **Publish branch** or **Push origin**.

**Commit is not Push.** After commit, the changes may still exist only on your computer. Publishing/pushing makes them available to others.

## 5. Branches explained without technical jargon

`main` is normally the accepted version of a project. A new branch gives a person or agent space to propose changes without rewriting the accepted version.

Example:

```text
main (approved documentation)
  ├─ docs/rewrite-introduction      ← you
  └─ agent/add-first-exercise       ← agent
```

The branch is not a separate GitHub repository and it is not necessarily a second physical project folder. Switching a branch in Desktop can change which files appear in the local folder; save or commit your uncommitted work first.

**Good names:** `docs/fix-setup-guide`, `agent/intro-examples`, `practice/first-pr`. Start from the current `main` when creating new work.

## 6. Pull requests: proposing, reviewing, merging

1. Finish the branch's local changes, commit, and push/publish the branch.
2. Select **Preview Pull Request** in Desktop, check what differs from `main`, and open the PR in your browser.
3. Give it a purpose-focused title and description.
4. On GitHub, use **Files changed** to examine additions and deletions, **Conversation** to discuss, and **Checks** to see any automated tests (if your project has none, this tab may be empty — that is normal).
5. Only approve/merge when the result looks correct; choose **Squash and merge** if it fits the project's policy.
6. In Desktop, switch to `main` → **Fetch origin → Pull origin** to obtain the accepted changes.

**Important:** GitHub Desktop can help open and inspect a PR branch, but **PR comments, reviews, and merging are performed on the GitHub website**.

## 7. When someone or an agent changed the website

Your local folder does not update itself just because someone committed online.

For normal updates to `main`:

1. Save or commit your current local work before switching branches.
2. Select `main` in **Current Branch**.
3. Click **Fetch origin**; if it detects new commits, click **Pull origin**.
4. Open your editor and inspect the updated files.

For an open PR:

1. In Desktop select **Current Branch → Pull Requests** and choose the PR.
2. Read **History**, compare the branch to `main`, and open the files locally if useful.
3. Return to GitHub website for PR comments/review/merge.

Do **not** interpret a PR as already merged. Do **not** manually copy the agent's files into `main` and then merge the same PR.

## 8. Reading the Changes panel

- **Green/added lines**: new content.
- **Red/removed lines**: removed content.
- **Modified**: an existing file changed.
- **Added/Deleted/Renamed**: the change type.
- **Checked boxes**: files included in your next local commit; unchecked files are not included in that commit.
- **History tab**: committed changes, not merely unsaved editor text.

Always check unexpected deletions, renamed files, generated results, secrets, and unrelated edits. In large changes, review one logical feature at a time.

## 9. When you work with an agent

Before inviting an agent, define: **scope, allowed files, forbidden files, branch name, success criteria, evidence, and stop conditions**.

Recommended rules:
- Give the agent a dedicated branch and ask for a PR rather than direct changes to `main`.
- For local agents, open only the intended cloned folder/worktree and confirm Desktop's **Current Branch**.
- Inspect the entire diff in Desktop/GitHub; test actual results. A written "done" message is not evidence.
- If the agent and you are changing the same files, pause one side of the work until the other commits and syncs.
- Never paste private data, credentials, or unreleased datasets into a public repo or an unapproved agent.

See the [Agent Collaboration Guide](../03_Work_With_AI/AI_Guide.md).

## 10. Three common mistakes to avoid

**"I committed, but GitHub still shows the old file."** → Check if you clicked **Push origin** and whether the website is displaying the same branch.

**"The agent says it's done, but my folder didn't change."** → Perhaps the agent changed a remote branch. Fetch and check out that branch, or merge its PR and then pull `main`.

**"I clicked Download ZIP again."** → ZIP is not a sync operation. Use the existing cloned repository in Desktop.

## 11. Recommended habits

- One topic per branch; one meaningful purpose per commit.
- Pull before starting; commit small steps; push to back up/share.
- Review PRs before merging; do not accept AI-generated deletion blindly.
- Keep training material separate from sensitive files.
- For code projects, check tests/builds, not only the visual diff.
- Keep `main` stable and use separate branches for agents and experiments.

**Official references:** [Branches](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop) · [Committing and reviewing](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop) · [Syncing](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop) · [Viewing PRs](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop).