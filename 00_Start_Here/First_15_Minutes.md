# First 15 Minutes: GitHub Desktop, No Terminal

**Goal:** make a small change to this learning repository through the graphical interface and see it appear on GitHub. Do not start with the command line.

> You need a GitHub account, [GitHub Desktop](https://desktop.github.com/), and any text editor (VS Code is optional). Both Windows and macOS are supported. **Practice on your own fork/copy or a practice repository**, not directly on a shared teaching repository unless you have permission.

## 1. What you are looking at (2 minutes)

There are three different places:

| Place | Meaning | Example |
|---|---|---|
| GitHub.com, in your browser | Shared online project | `https://github.com/owner/project` |
| The folder on your computer | Your local project copy | A folder you can open in Finder/File Explorer |
| GitHub Desktop app | Visual control center | Shows what changed and syncs with GitHub |

GitHub Desktop is not where you type your document. Edit in your normal editor; use Desktop to check what changed.

## 2. Sign in and clone (3 minutes)

1. Install and open GitHub Desktop.
2. Sign into your GitHub.com account when asked (on Mac, check **GitHub Desktop → Settings**; on Windows, **File → Options** if you need to revisit authentication).
3. Select **File → Clone Repository…**.
4. On the **GitHub.com** tab select your own practice repository; or select **URL** and paste a repository URL.
5. Choose a **Local Path** that is easy to find, then select **Clone**.
6. Select **Repository → Show in Finder** (Mac) or **Show in Explorer** (Windows) and confirm the files exist.

**Clone** means "make a connected copy on my computer." **Download ZIP** is a one-time download and does not give you the same convenient sync workflow.

## 3. Create a safe branch (2 minutes)

1. Select **Current Branch → New Branch**.
2. Name it `practice/my-first-edit` (or `practice/your-name`).
3. Choose the default branch as the starting point, then **Create Branch**.

A branch is a separate workspace for a change. Work on your practice branch rather than directly on `main` in a collaborative repository.

## 4. Edit and save one file (3 minutes)

1. Select **Repository → Open in your editor**, or open the local folder in your editor manually.
2. Create `practice-notes.md` containing:

```markdown
# My first GitHub Desktop note

Today I changed a file locally.

- I know where the project folder is.
- I can review changes before uploading.
```

3. Save the file.
4. Return to GitHub Desktop. Under **Changes**, you should see `practice-notes.md`.
5. Click the file to see the added lines. If you see unexpected files, investigate before committing.

## 5. Save, upload, and open a PR (5 minutes)

1. In Desktop, check the box beside the file you want to include.
2. In the **Summary** field enter `Add first practice note`.
3. Click **Commit to practice/my-first-edit**. This saves a named checkpoint **locally**.
4. Click **Publish branch** (first time) or **Push origin** to send it to GitHub.
5. Click **Preview Pull Request** (or use the repository's GitHub website → **Pull requests → New pull request**).
6. Confirm the base is `main`, verify the diff, and open a **draft PR** if you only want to practice.

**Stop before merging** if this is not your repository or you have not reviewed the change. A pull request is a proposed change and discussion; it is not automatically merged.

## Success checklist

- [ ] I know where the local project folder lives.
- [ ] Desktop shows the correct repository and branch.
- [ ] My file appears in the **Changes** list.
- [ ] I can explain the difference between **Commit** and **Push**.
- [ ] My practice branch appears online.
- [ ] I can open a PR without immediately merging.

**Next:** [Desktop Beginner Handbook](../01_GitHub_Desktop/Beginner_Handbook.md) or [Agent Collaboration Guide](../03_Agent_Collaboration/Agent_Collaboration_Guide.md).

**Official:** [Clone a repository](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop); [First repository tutorial](https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop).