# Lesson 6: Work with other people

> **You'll learn:** how to join a coauthor's project, write tasks as Issues, and get your work reviewed.
> **Time:** 20 minutes. **You need:** [Lesson 5](05-branches-and-pull-requests.md), and a coauthor's project (or a friend willing to try).

![Route picture: each numbered circle is one step, placed in the lane where it happens](../assets/routes/team.svg)

*The route for joining someone's project. Dashed stations are steps your teammate does.*

## Steps

### <img src="../assets/icons/people.svg" width="36" height="36" alt=""> Step 1: Get access

<img src="../assets/icons/people.svg" width="20" height="20" alt=""> **Done by your teammate, on GitHub.com**

**Do this:** ask the project's owner to add you. On GitHub.com they open the project's **Settings → Collaborators**, click **Add people** and type your username. You accept the invitation from your email or from GitHub notifications.

**You'll see:** the project in your list on GitHub.com.

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** Without access you can still read and copy a public project, but you can't upload to it.

### <img src="../assets/icons/clone.svg" width="36" height="36" alt=""> Step 2: Clone the project

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **File → Clone repository…**, choose the **GitHub.com** tab, select the project, pick a local folder, and click **Clone**.

**You'll see:** a connected copy of the project in your folder, and its name under **Current Repository**.

> <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> **Watch out:** Clone once. Afterwards, use **Fetch** and **Pull** to get updates. Don't use **Download ZIP**: a ZIP copy isn't connected and can't sync.

### <img src="../assets/icons/branch.svg" width="36" height="36" alt=""> Step 3: Create your own branch

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **Current Branch → New branch**, for example `docs/fix-variable-definitions`.

### <img src="../assets/icons/edit.svg" width="36" height="36" alt=""> Step 4: Edit and save

<img src="../assets/icons/place-folder.svg" width="20" height="20" alt=""> **In your project folder**

**Do this:** make your change in your editor and save.

### <img src="../assets/icons/publish.svg" width="36" height="36" alt=""> Step 5: Commit and publish

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** review **Changes**, click **Commit to** *your branch*, then **Publish branch**.

### <img src="../assets/icons/pull-request.svg" width="36" height="36" alt=""> Step 6: Open a pull request and ask for a review

<img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> **On GitHub.com**

**Do this:** **Preview Pull Request → Create pull request**. On the pull request page, use **Reviewers** on the right to request your teammate.

**You'll see:** your teammate gets a notification.

### <img src="../assets/icons/review.svg" width="36" height="36" alt=""> Step 7: Your teammate comments

<img src="../assets/icons/people.svg" width="20" height="20" alt=""> **Done by your teammate, on GitHub.com**

**Do this:** nothing. Your teammate reads **Files changed** and comments, approves or requests changes.

### <img src="../assets/icons/push.svg" width="36" height="36" alt=""> Step 8: Fix and push again

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** stay on the **same branch**. Edit, commit, and click **Push origin**.

**You'll see:** the same pull request updates automatically. Don't open a new one.

### <img src="../assets/icons/merge.svg" width="36" height="36" alt=""> Step 9: Your teammate merges

<img src="../assets/icons/people.svg" width="20" height="20" alt=""> **Done by your teammate, on GitHub.com**

**Do this:** when you both agree, the owner clicks **Merge pull request**.

### <img src="../assets/icons/pull.svg" width="36" height="36" alt=""> Step 10: Update your main

<img src="../assets/icons/place-desktop.svg" width="20" height="20" alt=""> **In GitHub Desktop**

**Do this:** **Current Branch → main**, **Fetch origin**, **Pull origin**.

## Write tasks as Issues

### <img src="../assets/icons/issue.svg" width="36" height="36" alt=""> An Issue is a written to-do on GitHub.com

<img src="../assets/icons/place-web.svg" width="20" height="20" alt=""> **On GitHub.com**

Instead of an email saying "please fix the dataset", open the project's **Issues** tab, click **New issue**, and write:

- **What's needed:** "Say whether the unemployment change is in percent or percentage points."
- **Which files:** `draft_results.md` only.
- **How we'll know it's done:** the table says "percentage points" and the arithmetic is shown.

Everyone can see the task, discuss it in one place, and link the pull request that fixes it. **A real example:** [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) led to [Pull Request #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4).

![From an Issue to a reviewed and merged change](../assets/illustrations/econ-issue-to-merge.svg)

## Good habits for shared projects

| | Habit | Why |
|---|---|---|
| <img src="../assets/icons/pull.svg" width="20" height="20" alt=""> | **Pull before you start** | You begin from everyone's latest work |
| <img src="../assets/icons/branch.svg" width="20" height="20" alt=""> | **One branch per task** | Reviews stay small and clear |
| <img src="../assets/icons/commit.svg" width="20" height="20" alt=""> | **Small, clearly named commits** | History explains itself: "Fix wage units", not "stuff" |
| <img src="../assets/icons/review.svg" width="20" height="20" alt=""> | **Nobody merges their own work unreviewed** | A second pair of eyes catches mistakes |
| <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> | **Two people editing the same paragraph?** Talk first | Overlapping edits cause conflicts ([Lesson 8](08-fix-mistakes.md)) |

## Check yourself

<details><summary>Your teammate asked for changes. Do you open a new pull request?</summary>

No. Push new commits to the **same branch**; the existing pull request updates by itself.
</details>

<details><summary>Why clone instead of downloading a ZIP?</summary>

A clone stays connected to GitHub.com, so you can Push and Pull. A ZIP is a disconnected copy.
</details>

---

**Next:** [Lesson 7: Work with an AI assistant](07-work-with-ai.md) · [Previous: Lesson 5](05-branches-and-pull-requests.md) · [All lessons](README.md)
