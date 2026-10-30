# AI prompt library

Ready-made instructions for working with an AI assistant on a GitHub project. Replace the words in `CAPITALS`. These are templates, not guarantees: what an assistant can actually do depends on the product and the access you give it. New to this? Read [Lesson 7](07-work-with-ai.md) first.

## <img src="../assets/icons/review.svg" width="20" height="20" alt=""> 1. Look first, change nothing

**Use when:** starting with an unfamiliar project.

> Review the repository `OWNER/REPO`. Summarize what each folder and important file is for, and list unclear text or broken links. **Do not make any edits.** Recommend changes in order of importance, and say what you couldn't check.

## <img src="../assets/icons/edit.svg" width="20" height="20" alt=""> 2. One small, controlled edit

**Use when:** you want one specific improvement.

> Work in `OWNER/REPO` on a new branch `agent/TASK`. Goal: `ONE-SENTENCE OUTCOME`. Only edit `FILES`. Do **not** change `main`, delete other files, or change settings. Keep existing useful content. Tell me exactly which files you changed and what you checked. **Do not merge.** If you can't edit the repository, give me a complete draft to paste.

## <img src="../assets/icons/open-folder.svg" width="20" height="20" alt=""> 3. Edit my local folder, but let me review before saving

**Use when:** the assistant can edit files on your computer.

> Before editing, tell me the full folder path and the current branch. Stop if they aren't `EXPECTED-FOLDER` and `agent/TASK`. Edit only `FILES` to `GOAL`. **Don't commit, push, switch branches or delete files.** When finished, list the changes so I can review them in GitHub Desktop.

## <img src="../assets/icons/pull-request.svg" width="20" height="20" alt=""> 4. Work on GitHub.com and open a pull request

**Use when:** the assistant is connected to GitHub and can open pull requests.

> Complete Issue `#NUMBER` in `OWNER/REPO`. Use a new branch `agent/TASK`. Don't change `main`, force-push, or merge. Only change `PATHS`. Open a **draft** pull request into `main` describing what changed, what you checked, and what still needs a human decision. Don't claim success unless I can see the pull request.

## <img src="../assets/icons/review.svg" width="20" height="20" alt=""> 5. Second opinion on a pull request

**Use when:** you want a review before you merge.

> Review the pull request at `URL` against its Issue. Look for wrong files, unexpected deletions, broken links, inconsistent terms and claims that aren't supported. Sort findings into **must fix**, **nice to have** and **couldn't check**, with file names. **Don't edit, approve or merge anything.**

## <img src="../assets/icons/edit.svg" width="20" height="20" alt=""> 6. Improve one section only

**Use when:** polishing writing without a rewrite.

> In `OWNER/REPO`, improve only the section `HEADING` in `FILE`. Keep all numbers, equations, links and examples unless they're clearly wrong. Write for a beginner in short sentences. Don't add new sections. Show me a before/after summary.

## <img src="../assets/icons/book.svg" width="20" height="20" alt=""> 7. Handover note for the next session

**Use when:** pausing work or moving to a new chat.

> Write a short handover: goal, repository and branch, files looked at, files changed, checks done, open questions, and the exact next step. Label anything you didn't verify. Don't describe suggested changes as saved unless you've confirmed the commit.

## <img src="../assets/icons/warning.svg" width="20" height="20" alt=""> 8. Explain a deletion before I accept it

**Use when:** a pull request removes files.

> The pull request at `URL` removes `FILES`. For each one, was the removal requested? Could it break links or anything else? What's the safest way to restore it if needed? **Read only; don't change the repository.**

## Add this line when it matters

> **Show proof, not claims:** name the branch and every file changed; separate what you changed from what you only suggested; say which checks passed, failed or weren't run. No private data, no passwords, no deleting files, no changes to `main`.

## What a good answer looks like

| Weak | Better |
|---|---|
| "Done." | "Updated `docs/intro.md` on `agent/intro`; see pull request #7." |
| "Everything works." | "Checked all links in the file; didn't test the website." |
| "I fixed the data." | "Added a source note for one row; two values still need checking." |

---

[Lesson 7: Work with an AI assistant](07-work-with-ai.md) · [All lessons](README.md)
