# Visual Workflows: What Happens Next?

These diagrams explain **what to click and in what order**, using GitHub Desktop and the GitHub website. No terminal.

## Workflow A: you edit locally

```mermaid
flowchart TD
    A[Open repo in GitHub Desktop] --> B[Fetch / Pull main]
    B --> C[Create your own branch]
    C --> D[Open folder in editor]
    D --> E[Save changes]
    E --> F[Desktop: review Changes]
    F --> G[Commit selected files]
    G --> H[Publish branch / Push origin]
    H --> I[Open Pull Request on GitHub]
    I --> J{Reviewed and ready?}
    J -- No --> D
    J -- Yes --> K[Merge PR on website]
    K --> L[Desktop: main → Fetch → Pull]
```

**Remember:** the editor writes files; Desktop tracks and syncs; GitHub website handles collaboration and PR approval.

## Workflow B: an agent edits your local folder

```mermaid
flowchart TD
    A[Desktop: create agent branch] --> B[Open exact project folder in local agent/editor]
    B --> C[Agent edits allowed files]
    C --> D[Desktop: inspect all changes]
    D --> E{Meets scope and tests?}
    E -- No --> F[Ask agent to revise on same branch]
    F --> D
    E -- Yes --> G[Commit and Push]
    G --> H[Create PR on GitHub]
    H --> I[Review and merge]
    I --> J[Desktop: switch to main, then Pull]
```

**Check:** for a local agent, files usually appear in Desktop's **Changes** panel before you commit. The agent could commit autonomously if you grant that permission—then inspect **History** too.

## Workflow C: a cloud agent changes GitHub remotely

```mermaid
flowchart TD
    A[Create scoped issue or agent task on GitHub] --> B[Agent opens branch / PR]
    B --> C[GitHub: Files changed + checks]
    C --> D[Desktop: Current Branch → Pull Requests]
    D --> E[Open/test the agent branch locally]
    E --> F{Approved?}
    F -- No --> G[Comment on PR; request changes]
    G --> B
    F -- Yes --> H[Merge on GitHub website]
    H --> I[Desktop: main → Fetch origin → Pull origin]
```

A remote agent's work does not immediately appear in your local folder. **Sync is a separate action**.

## The buttons are different

| Button | Plain-English meaning | Typical moment |
|---|---|---|
| Clone | Make a connected local copy | First time opening a remote project |
| New Branch | Give the task a safe workspace | Before editing |
| Commit to … | Save a selected local checkpoint | After inspecting changed files |
| Publish branch | Make a brand-new local branch visible online | First upload of that branch |
| Push origin | Upload your local commits | After committing |
| Fetch origin | Check what is new online | Before pulling or reviewing remote work |
| Pull origin | Download and integrate remote commits into current local branch | After merge or when online work changed |
| Preview Pull Request | Compare and propose branch changes | Before review/merge |

## Which state are you in?

| Situation | Do this first |
|---|---|
| Only want to read files | Open GitHub.com; cloning optional |
| Want to make changes on your computer | Clone once, create branch |
| Changes are shown in Desktop | Inspect, commit, then push |
| PR is open but not merged | Review the PR branch; do not assume `main` changed |
| PR merged online | Switch to `main` in Desktop, fetch, pull |
| Agent is running locally in your folder | Watch Desktop **Changes** / **History** |
| Two contributors edited the same file | Pause, sync, resolve conflict deliberately |

Read: [Beginner Handbook](Desktop_Guide.md) · [Cloud Agent Workflow](../03_Work_With_AI/Cloud_Agent.md).