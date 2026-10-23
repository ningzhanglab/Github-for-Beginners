# Your First 15 Minutes with GitHub Desktop

**Goal:** create a small personal project, make one change, and see it appear on GitHub.com. No command line, no code, no branches, and no pull requests yet.

**You need:** a free [GitHub account](https://github.com/signup), the [GitHub Desktop app](https://desktop.github.com/), and any simple text editor. GitHub Desktop works on supported Windows and macOS computers.

> **Start with your own project**, not this teaching repository. That way you won't accidentally change someone else's files.

![A simplified drawing showing the main areas of GitHub Desktop](../assets/illustrations/desktop-controls-econ.svg)

*Illustration, not a screenshot. The buttons may be arranged a little differently on your screen.*

## Step 1 — Open GitHub Desktop and sign in

Install GitHub Desktop, open it, and sign into your GitHub.com account when asked. The app is free.

If you have no GitHub account yet, create one first. **You do not need to install Git separately or open a terminal.**

## Step 2 — Make your first project folder

In GitHub Desktop, select **File → New repository…** (on the welcome screen you may see **Create a New Repository on your Hard Drive…**).

Use these example settings:

| Field | Enter or choose |
|---|---|
| Name | `my-first-notes` |
| Description | `A simple practice project` |
| Local Path | A place you will remember, such as Documents |
| Initialize with a README | **Select this option** |
| Git ignore / License | Leave the optional defaults for this exercise |

Click **Create repository**. GitHub Desktop creates a project folder **on your computer**, including a `README.md` file.

**What did you just do?** You created a *repository*: a project folder that can remember its saved changes.

## Step 3 — Change one sentence

In GitHub Desktop, choose **Repository → Show in Finder** (Mac) or **Show in Explorer** (Windows). Open `README.md` in your text editor.

Replace or add this simple example and **save** it:

```markdown
# My First Notes

This is my practice project.

- Today I learned how to save a change.
- Next I want to learn how to work with an AI assistant.
```

Go back to GitHub Desktop. Click **Changes** on the left.

You should see `README.md`. Click it and look at the added or removed lines. If you don't see the file, check that you edited the **same folder** and saved the file.

**What did you just do?** You edited a file in an ordinary editor. GitHub Desktop noticed it and showed the difference.

## Step 4 — Save a checkpoint

At the bottom of the **Changes** panel, type this in **Summary**:

```text
Add my first practice note
```

Click **Commit to main**.

**What did you just do?** A *commit* is a named checkpoint. You can find it later by clicking **History**.

At this point, your change is saved in the project **on your computer**. It may not yet be on GitHub.com.

## Step 5 — Put it on GitHub.com

Click **Publish repository** in GitHub Desktop.

In the publish window:

1. Keep the repository name `my-first-notes`.
2. For a personal exercise, select **Keep this code private** unless you deliberately want everyone to see it.
3. Click **Publish Repository**.

Then use **Repository → View on GitHub** to open the project in your browser. You should see the README containing the sentence you added.

**What did you just do?** You published the project so your saved files can be accessed on GitHub.com with the visibility you chose.

## Success! You only need these four concepts

| Word | What it means |
|---|---|
| **Repository** | The whole project folder and its saved history |
| **Changes** | What is different from the last saved checkpoint |
| **Commit** | Save a checkpoint on your computer |
| **Publish / Push** | Send the project or new checkpoints to GitHub.com |

**Try a second change:** Edit the README again and save it. In GitHub Desktop use **Changes → Commit to main → Push origin**. Then refresh GitHub.com. This is your everyday routine for a simple personal project.

## What if I already have a GitHub project?

Instead of **New repository**, use **File → Clone Repository…** to make a connected copy of a repository you can access. Then open the folder, edit, commit, and **Push origin** if you have permission. For shared projects, it's better to learn branches and review pages before editing `main`.

Our [fictional economics research example](../examples/economics/) is available for **reading and inspection**. Do not try to push changes to this shared teaching repository as a beginner exercise.

## What should I learn next?

- [**See what the most important Desktop buttons do**](../02_GitHub_Desktop/README.md)
- [**Why branches and review pages matter**](Why_GitHub.md)
- [**Let an AI assistant help without losing control**](../03_Work_With_AI/README.md)
- [**If something goes wrong**](../05_Help/README.md)

[Back to Start Here](README.md) · [Back to Home](../README.md)

*Steps based on GitHub's [official first-repository guide](https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop). Menu labels can vary slightly by app version.*
