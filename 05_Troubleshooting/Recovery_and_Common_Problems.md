# Recovery and Common Problems — Visual Methods Only

Do not panic-click **Discard**, **Force push**, or **Delete**. Start by identifying the repository, branch, and whether the change is **uncommitted, committed only locally, pushed, or merged**.

## 1. Why can't I see the latest files?

| What happened | Check | Safer next action |
|---|---|---|
| Someone edited GitHub.com | Desktop has an older local copy | On correct branch: **Fetch origin → Pull origin** |
| Agent opened a PR | Changes exist on agent's branch | Open PR on website or **Current Branch → Pull Requests** |
| You edited locally | Website is older | Commit selected changes and **Push origin** |
| You are viewing wrong branch | Same repo but different contents | Inspect **Current Branch** and GitHub website branch selector |
| You downloaded ZIP | Files are disconnected | Clone once with GitHub Desktop |

## 2. I changed a file accidentally (not committed)

1. Open **Changes** and click the file to see what would be removed.
2. Copy out any lines you still need.
3. Only then consider **Discard Changes** for that file. **Discard is destructive for uncommitted edits** and may be hard to undo.
4. If uncertain, preserve the entire local folder elsewhere and ask for help before discarding.

If an agent changed many files unexpectedly, stop the agent, inspect the complete file list, and do not commit the whole batch blindly.

## 3. I committed a mistake

**Only local / not pushed:** review the commit in **History** and Desktop's options for undo/amend. Understand the effect before editing history.

**Already pushed or merged and shared:** prefer **Revert**, which records a new commit reversing an earlier commit. In Desktop's **History**, right-click the relevant commit and look for the revert option; check resulting changes and push when appropriate. A revert of a merge or a conflicted change may need additional assistance.

**Do not** use force push to rewrite shared `main` just to hide a mistake.

Official: [Options for managing commits](https://docs.github.com/en/desktop/managing-commits/options-for-managing-commits-in-github-desktop).

## 4. Switching branches made my files look different

A branch shows another version of the repository. Switching may change visible file content. This does not by itself mean your work was deleted. First check **Current Branch** and **History**. If Desktop prompts about uncommitted work, choose deliberately whether to carry changes, stash them, or return to the prior branch.

Do not delete branches just to tidy up while unsure where your work lives.

## 5. A merge conflict appeared

A conflict usually means two people/agents changed overlapping material.

1. Do not guess which version is correct.
2. Identify filenames and read **both** sides.
3. Decide whether to keep A, B, or a careful combination in the editor; do not automatically accept all agent changes.
4. Re-run document checks/tests.
5. Continue the merge only after reviewing the resolved files.

For a critical shared repo, ask the teammate who owns the affected file to help. The GitHub website and Desktop can guide through conflicts; complex cases may require further support.

## 6. The agent says "done" but nothing changed

Check for evidence, in this order:

1. Did it create a **branch** or a **PR URL**?
2. Is it working in the correct repository?
3. Was it a cloud agent (remote) or local agent (your folder)?
4. If local: inspect Desktop **Changes** and **History**.
5. If remote: inspect **Pull requests**, **Files changed**, and the actual branch.
6. Has the work been merged? If yes, return to Desktop `main` and pull.

A chat message alone is **not** proof of saved work or a successful test.

## 7. Permission denied or push rejected

- Check you are signed into the correct GitHub account.
- Check you have repository write access.
- A protected branch may block direct pushes: use a branch and PR.
- If your remote branch has newer commits: fetch first, then follow Desktop prompts; do not force push.
- Huge files may be blocked by GitHub; avoid treating this as an authorization problem.

## 8. Safety checklist before sharing

- [ ] No passwords, tokens, private keys, confidential data, or private research records.
- [ ] No unexpected mass deletions, binary replacements, or unrelated formatting.
- [ ] Correct repository and branch.
- [ ] PR diff reviewed.
- [ ] Real output opened/tested.
- [ ] User or project owner explicitly approves risky changes.

See [Agent Collaboration Guide](../03_Agent_Collaboration/Agent_Collaboration_Guide.md) for prevention and [Desktop Cheat Sheet](../02_Cheat_Sheets/GitHub_Desktop_Cheat_Sheet.md) for fast navigation.