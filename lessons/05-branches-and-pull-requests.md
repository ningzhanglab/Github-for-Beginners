# Lesson 5: Branches and pull requests

> **You'll learn:** how to try a change without touching the accepted version, then have it reviewed before it's accepted.
> **Time:** 20 minutes. **You need:** your project from [Lesson 3](03-your-first-project.md).

## Why bother?

Your paper's `main` version is correct. You want to try a different set of control variables, but if it doesn't work out, you don't want to undo a mess.

- A **branch** <img src="../assets/icons/branch.svg" width="20" height="20" alt=""> is a separate working version. Edits there don't touch `main`.
- A **pull request** <img src="../assets/icons/pull-request.svg" width="20" height="20" alt=""> (PR) is a review page on GitHub.com. It shows exactly what your branch would change in `main`, so you or a coauthor can check it.
- **Merge** <img src="../assets/icons/merge.svg" width="20" height="20" alt=""> means accepting the pull request. Only then does `main` change.

```text
main  ●────────●────────────────●   accepted version
                \              /
robustness/      ●────●────●──    your experiment, reviewed, then merged
new-controls
```

[![Route picture: each numbered circle is one step, placed in the lane where it happens](../assets/routes/pr.svg)](https://ningzhanglab.github.io/Github-for-Beginners/workflows.html#pr)

*The route for this lesson. Notice the middle part: the review happens on GitHub.com before anything reaches main. Click the picture to step through it on the route map.*

## Steps

### <img src="../assets/icons/pull.svg" width="36" height="36" alt=""> Step 1: Start from the latest main

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **Current Branch → main**, then **Fetch origin**, and **Pull origin** if it appears.

**You'll see:** an up-to-date `main`, so your branch starts from the newest version.

### <img src="../assets/icons/branch.svg" width="36" height="36" alt=""> Step 2: Create a branch

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **Current Branch → New branch**. Name it after what you're trying, such as `robustness/new-controls`. Click **Create branch**.

**You'll see:** the top bar shows your new branch. Your files look the same; nothing has changed yet.

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** A branch is not a copy of your folder. The same folder now shows the branch's version of the files.

### <img src="../assets/icons/edit.svg" width="36" height="36" alt=""> Step 3: Edit and save

<img src="../assets/icons/place-folder.svg" width="20" height="20" alt=""> **In your project folder**

**Do this:** make your change in your editor and save.

### <img src="../assets/icons/commit.svg" width="36" height="36" alt=""> Step 4: Commit to your branch

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** review **Changes**, write a Summary, and click **Commit to robustness/new-controls**.

**You'll see:** the button names your branch, not `main`. That's how you know `main` is safe.

### <img src="../assets/icons/publish.svg" width="36" height="36" alt=""> Step 5: Publish the branch

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** click **Publish branch** in the top bar.

**You'll see:** the branch now exists on GitHub.com too.

### <img src="../assets/icons/pull-request.svg" width="36" height="36" alt=""> Step 6: Open a pull request

<img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> **On GitHub.com**

**Do this:** in Desktop, click **Preview Pull Request**, then **Create pull request**. Your browser opens. Check the two branch boxes at the top:

| Box | Means | Should say |
|---|---|---|
| **base** | the version you want to change | `main` |
| **compare** | the branch with your proposal | `robustness/new-controls` |

Add a title and a short description of what you changed and why, then click **Create pull request**.

**You'll see:** a review page with the tabs **Conversation**, **Commits** and **Files changed**.

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** Not finished yet? Use the arrow next to the button and choose **Create draft pull request**.

### <img src="../assets/icons/review.svg" width="36" height="36" alt=""> Step 7: Review the changes

<img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> **On GitHub.com**

**Do this:** open **Files changed** and read every file. You or a reviewer can click any line to leave a comment.

**You'll see:** exactly what was added (green) and removed (red).

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** You might see a **Checks** area. Those are automatic tests some projects set up. If your project has none, that's normal.

### <img src="../assets/icons/merge.svg" width="36" height="36" alt=""> Step 8: Merge

<img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> **On GitHub.com**

**Do this:** when it's right, click **Merge pull request**, then **Confirm merge**.

**You'll see:** the pull request is marked **Merged**. `main` on GitHub.com now includes your change.

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** Merging is the moment of acceptance. Only merge after you've read the changes.

### <img src="../assets/icons/pull.svg" width="36" height="36" alt=""> Step 9: Bring main home

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **Current Branch → main**, then **Fetch origin** and **Pull origin**.

**You'll see:** your folder's `main` now includes the accepted change.

## A real pull request to look at

[Pull Request #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) in this repository proposed four documentation files for a made-up economics dataset. Open **Files changed** and notice that the data file itself was not touched. That's what a well-scoped PR looks like.

## Check yourself

<details><summary>You opened a pull request. Has main changed?</summary>

No. A pull request is only a proposal. `main` changes when someone clicks **Merge**.
</details>

<details><summary>Your experiment failed. What happens to main?</summary>

Nothing. Close the pull request without merging (or never open one), and switch back to `main`.
</details>

---

**Next:** [Lesson 6: Work with other people](06-work-with-other-people.md) · [Previous: Lesson 4](04-save-and-sync.md) · [All lessons](README.md)
