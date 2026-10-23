# GitHub Desktop — One-Page Cheat Sheet

No terminal. Use **GitHub Desktop** to inspect and sync files, a **text editor** to edit them, and the **GitHub website** to review pull requests.

## Everyday clicks

| I want to… | Click |
|---|---|
| Open a project from GitHub for the first time | **File → Clone Repository…** |
| Find the local project folder | **Repository → Show in Finder / Show in Explorer** |
| Edit the project | **Repository → Open in [editor]** |
| See which files changed | **Changes** |
| See earlier saved checkpoints | **History** |
| Work safely without changing `main` | **Current Branch → New Branch** |
| Save selected changes locally | Select files, enter Summary, **Commit to [branch]** |
| Upload a new branch | **Publish branch** |
| Upload existing local commits | **Push origin** |
| See changes made online | **Fetch origin**, then **Pull origin** if available |
| View an agent PR in Desktop | **Current Branch → Pull Requests** |
| Request merge of your branch | **Preview Pull Request**; finish on GitHub.com |
| Comment, request changes, approve, or merge PR | GitHub website: **Pull requests** |

## Three rules that prevent confusion

1. **Commit ≠ Push.** Commit saves a local checkpoint; Push uploads your commits.
2. **Fetch ≠ Pull.** Fetch checks/downloads information about remote updates; Pull updates your local selected branch with remote commits.
3. **PR ≠ Merge.** Opening a PR proposes the change; merging accepts it into the base branch.

## Agent collaboration in 7 actions

1. Describe a small, verifiable task.
2. Start a separate `agent/...` branch.
3. Tell the agent which files it **may** and **must not** edit.
4. Ask it to list exact edits and evidence.
5. Review all changed files in Desktop or PR **Files changed**.
6. Test/run/open the result yourself.
7. Merge only after approval, then pull the updated `main` into Desktop.

## What should I do if…?

| Problem | Fast first check |
|---|---|
| Website has older files | Did you **Push origin**? Is the website on the same branch? |
| Desktop still has older files | **Fetch origin** and **Pull origin** on the intended branch |
| I can't see agent edits | Was it a cloud agent? Find its PR/branch and check it out |
| My file disappeared | Check **Current Branch** before assuming it was deleted |
| I have unwanted local changes | Review and preserve wanted edits before considering **Discard Changes** |
| Merge conflict | Stop; read both versions carefully. Ask a collaborator before overwriting |
| I made a bad shared commit | Prefer a **Revert** (new corrective commit) over rewriting shared history |

## Simple vocabulary

**Repository:** project and its history. **Branch:** safe working version. **Commit:** saved checkpoint. **Push:** upload checkpoints. **Pull:** bring shared changes down. **Pull request:** proposal for review. **Diff:** the lines/files added or removed.

## Practice safely

Use a small, non-sensitive Markdown exercise, not an important dataset. Clone → New Branch → edit → review Changes → Commit → Push → draft PR.

Detailed help: [First 15 Minutes](../00_Start_Here/First_15_Minutes.md) · [Recovery](../05_Troubleshooting/Recovery_and_Common_Problems.md) · [Official Desktop docs](https://docs.github.com/en/desktop).