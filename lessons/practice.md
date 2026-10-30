# Practise everything

> **Four short labs** that repeat the lessons with your own hands. Use **your own practice project** (from [Lesson 3](03-your-first-project.md)) and nothing private.

## Warm-up: inspect a real example (no clicking needed)

| | Open | Find |
|---|---|---|
| <img src="../assets/icons/issue.svg" width="20" height="20" alt=""> | [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) | What was asked for, and how "done" was defined |
| <img src="../assets/icons/pull-request.svg" width="20" height="20" alt=""> | [Pull Request #4, Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files) | How many files changed? Was the data file changed? |
| <img src="../assets/icons/check.svg" width="20" height="20" alt=""> | [The accepted results](../examples/economics/draft_results.md) | Check the arithmetic: 5.0% → 4.5% is −0.5 percentage points; $25 → $26 is +4.0% |

The example project's files are in [examples/economics](../examples/economics/README.md). The counties and numbers are invented.

## Lab 1: Branch and commit (10 minutes)

<img src="../assets/icons/branch.svg" width="20" height="20" alt=""> **Goal:** make a change on a branch and see that `main` stays untouched.

1. **Current Branch → New branch**: `practice/lab-1-note`.
2. In your folder, create `my-practice-note.md` with a heading and three bullet points. Save.
3. In Desktop, look at **Changes**, then **Commit to practice/lab-1-note**.
4. Click **Publish branch**.
5. On GitHub.com, use the branch selector to view `practice/lab-1-note`, then `main`.

**Done when:** the file is on your branch and not on `main`.

## Lab 2: Pull request and merge (10 minutes)

<img src="../assets/icons/pull-request.svg" width="20" height="20" alt=""> **Goal:** accept a change through review.

1. In Desktop, **Preview Pull Request → Create pull request**.
2. Check **base: main** and **compare: practice/lab-1-note**.
3. Create it, then read **Files changed**.
4. Click **Merge pull request → Confirm merge**.
5. In Desktop, **Current Branch → main → Fetch origin → Pull origin**.

**Done when:** `my-practice-note.md` is in your folder while on `main`.

## Lab 3: An AI assistant's proposal (15 minutes)

<img src="../assets/icons/ai.svg" width="20" height="20" alt=""> **Goal:** review an AI's work like a coauthor's.

1. Create the branch `agent/lab-3-note`.
2. Ask any AI assistant: *"Add one short paragraph to `my-practice-note.md` explaining Commit versus Push. Keep the three bullets. Don't change other files. If you can't edit files, give me the text to paste."*
3. Apply the change (or let the AI edit, if it can reach your folder).
4. In Desktop **Changes**, confirm only that one file changed and nothing was removed.
5. Commit, publish, open a pull request, read **Files changed**, merge.

**Done when:** you can say exactly what the AI changed, and what you checked yourself.

## Lab 4: Break it and fix it (10 minutes)

<img src="../assets/icons/revert.svg" width="20" height="20" alt=""> **Goal:** practise recovery without fear.

1. On `main`, delete one bullet from your note, commit, and push.
2. In **History**, right-click that commit → **Revert changes in commit**, then **Push origin**.
3. Edit the note again but **don't commit**. Right-click it in **Changes** → **Discard changes…**

**Done when:** the bullet is back and History shows both the mistake and the revert.

## Can you do all of these?

- [ ] Name the three places and what happens in each
- [ ] Commit, then push, and explain the difference
- [ ] Fetch, then pull, and explain the difference
- [ ] Make a branch, open a pull request, merge it, and pull `main`
- [ ] Review an AI's changes before accepting them
- [ ] Undo an uncommitted edit and revert a pushed one

---

[All lessons](README.md) · [Cheat sheet](cheat-sheet.md) · [Dictionary](dictionary.md)
