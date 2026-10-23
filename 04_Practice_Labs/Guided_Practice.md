# Guided Practice: GitHub Desktop + AI Agent

Four small exercises. No command line. Use **your own private or public practice repository** and only non-sensitive material. These exercises do not require a paid AI plan; for the agent labs, an advice-only assistant can be used instead of one that edits directly.

## Lab 1 — Your first change (10–15 minutes)

**Goal:** understand local edits, commits, and uploads.

1. Open a practice repository in Desktop (**File → Clone Repository…** if needed).
2. **Current Branch → New Branch**: name `practice/lab-1-note`.
3. Open your editor and create a `my-practice-note.md` file with a heading and three bullet points.
4. Return to Desktop → **Changes** and click the file to inspect the additions.
5. Enter Summary `Add first practice note`, then **Commit to practice/lab-1-note**.
6. Click **Publish branch** or **Push origin**.
7. On GitHub.com, switch to the practice branch and confirm the file is present.

**Questions:** Why did Commit not immediately update GitHub? What did Push do?

**Pass condition:** a visible remote branch contains one intended change; `main` remains untouched.

## Lab 2 — Propose a change and review it (10–15 minutes)

**Goal:** use a PR before changing the shared version.

1. From Lab 1, open **Preview Pull Request** in Desktop.
2. Confirm **base: main** and head: `practice/lab-1-note`.
3. Use a title such as `Add a beginner note`; create a **draft PR** in your browser.
4. Open **Files changed**. Find your added heading and bullets.
5. Describe in the PR what you changed and how you checked it.
6. If it's your own practice repo and the change is intended, mark ready and merge when appropriate.
7. Desktop → select `main` → **Fetch origin → Pull origin**.

**Questions:** Was your branch the same as `main` before merge? What changed after pulling?

**Pass condition:** the local `main` reflects the accepted file.

## Lab 3 — Collaborate with an advice-only/local agent (15–20 minutes)

**Goal:** treat an agent as a contributor whose work you review.

1. From updated `main`, create `agent/lab-3-improve-note` in Desktop.
2. Give the agent this prompt:

> Suggest or make **only one** improvement to `my-practice-note.md`: add a short paragraph explaining Commit versus Push. Keep the three existing bullets. Do not edit `main`, delete files, or commit/push without my approval. Report exactly what changed and what you verified. If you cannot access the files, return copy-ready Markdown.

3. If the agent has only chat access, paste its proposed paragraph into the file yourself. If it can edit the local folder, check that it used the **same folder and branch**.
4. Desktop → review the **Changes** panel; verify it is one intended file and no material vanished.
5. Commit, push, and open a draft PR.
6. Inspect the PR diff on GitHub and merge only after review.

**Questions:** What could the agent really access? How did you distinguish a suggestion from an actual edit?

**Pass condition:** a reviewed PR contains only the scoped improvement.

## Lab 4 — Review a cloud agent's PR (optional; 15–20 minutes)

**Goal:** understand that cloud agent work happens remotely.

Prerequisite: a cloud agent or connected service that can submit a PR in a repository where you have rights. Some GitHub-native agent features require a paid plan or administrative enablement. If unavailable, ask a teammate to create a practice PR or revisit this lab later.

1. Create a small GitHub Issue: "Add one sentence to the practice README."
2. Assign it to an eligible cloud agent, or ask your connected agent to open a **draft PR from a new branch**.
3. Open PR → **Files changed**. Check every file and any tests/checks.
4. Desktop → **Current Branch → Pull Requests** → select the PR.
5. Open the proposed files in your editor and inspect them.
6. Leave feedback/merge **on GitHub.com** after approval.
7. Desktop → `main` → fetch/pull, confirming the accepted change is local.

**Questions:** Why did the change not immediately appear in your local `main`? Why is the PR status important?

**Pass condition:** you can identify the agent's branch and verify a remote change before accepting it.

## End-of-practice checklist

- [ ] I can point to **my local folder**, **Desktop**, and **GitHub.com**.
- [ ] I understand Clone, Branch, Changes, Commit, Push, Fetch, Pull, PR, Merge.
- [ ] I can distinguish local and cloud agent changes.
- [ ] I can find an agent PR and review it in Desktop and browser.
- [ ] I can say **what I actually verified** instead of trusting "done."
- [ ] I know to stop before destructive actions.

Continue with [Agent Collaboration Guide](../03_Agent_Collaboration/Agent_Collaboration_Guide.md) or [Recovery and Common Problems](../05_Troubleshooting/Recovery_and_Common_Problems.md).