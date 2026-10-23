# Copy-and-Paste Agent Prompt Library

These prompts are *templates*, not guaranteed instructions for a particular AI product. Replace placeholders such as `OWNER/REPO`, `FILE`, and `BRANCH`. If the AI lacks repository write access, ask it to return a draft you can apply manually.

## Prompt 1 — Ask agent to inspect before making changes

> Review the repository `OWNER/REPO` first. Summarize the top-level folders, the purpose of each important file, and the current README learning path. Identify unclear or broken links. **Do not make any edits yet.** List the changes you recommend, ordered by impact, and identify what you could not verify.

**Use when:** starting with an unfamiliar or old repository. Avoid broad instructions like "improve everything."

## Prompt 2 — Let agent perform one controlled edit

> Work in `OWNER/REPO` on a new branch `agent/TASK`. Goal: `[one-sentence outcome]`. Allowed files: `[specific files]`. Do **not** modify `main`, delete unrelated files, change repository settings, or expand scope. Keep existing useful content. Verify all relative links affected by your edit. Report exact files modified, tests/checks performed, limitations, and the commit/PR URL if your environment supports one. **Do not merge the PR.** If you cannot write to the repository, tell me explicitly and supply a complete copy-ready draft.

**Use when:** editing an existing handbook or README.

## Prompt 3 — Local folder agent, review before commit

> You are working on my computer. Before any edit, report the **absolute folder path**, repository name, and current branch. Do not proceed if these differ from `[EXPECTED_FOLDER]` and `agent/TASK`. Edit only `[FILES]` to accomplish `[GOAL]`. **Do not commit, push, switch branches, or delete files.** When finished, list changes and validation results so I can review them in GitHub Desktop.

**Use when:** you want Desktop to show pending changes before saving anything to GitHub.

## Prompt 4 — Cloud agent with pull request handoff

> Work on GitHub repository `OWNER/REPO` to complete Issue `#NUMBER`. Create or use a dedicated `agent/TASK` branch. Preserve `main`; do not force push or merge. Keep modifications within `[PATHS]`. If a PR is supported, open a draft PR targeting `main` and include: summary, changed files, tests/checks, limitations, and anything needing human confirmation. Do not claim success unless the PR/commit can be verified.

**Use when:** agent is connected to GitHub and can modify remote branches.

## Prompt 5 — Review another agent's proposed PR

> Review PR `URL` against the Issue requirements. Check changes for wrong files, unexpected deletions, broken links, inconsistent terminology, missing tests, and inaccurate claims. Categorize findings as **blocker**, **improvement**, or **unverified**. Cite filenames and relevant lines. **Do not edit, approve, or merge**; provide a concise review checklist for me.

**Use when:** you want an independent second opinion before merge.

## Prompt 6 — Refine one section without rewriting everything

> In `OWNER/REPO`, improve only `FILE`, section `HEADING`. Keep all equations, links, examples, and technical terminology unless they are demonstrably wrong. Write for a beginner with clear, compact sentences. No new unrelated sections. Provide a before/after summary; stop if the section or file cannot be found.

**Use when:** maintaining teaching material incrementally.

## Prompt 7 — Create a handoff note for the next agent

> Write a short handoff summary of this task: goal, repository and branch, files inspected, files changed, source references, completed checks, unresolved questions, and exact suggested next step. Label every unverified assumption. Do not present proposed changes as committed unless you verified the commit and branch.

**Use when:** transferring work to a new chat or agent.

## Prompt 8 — Explain an unexpected deletion without changing code

> The PR at `URL` removes or replaces `[FILENAMES]`. Analyze whether each removal was requested, whether it could break links or consumers, and what the safest recovery options are. **Read-only review only.** Do not accept the change automatically or modify the repository.

**Use when:** Desktop or the PR shows deleted files.

## Agent task requirements: a compact standard

Add this paragraph to any prompt when the stakes are higher:

> **Proof over claims:** Show the exact branch and files modified. Distinguish changes made from changes only suggested. Mark tests as passed, failed, not run, or not applicable. State limitations. No confidential data, API tokens, silent scope expansion, destructive deletion, or direct write to `main`.

## What is a good agent result?

| Weak result | Better result |
|---|---|
| "Done." | "Updated `docs/intro.md` on `agent/intro`; see PR #7." |
| "Everything works." | "Checked all internal Markdown links; did not run a website build." |
| "I fixed the data." | "Replaced one provisional field, with a source URL; two mappings remain unverified." |
| "Cleaned up files." | "Renamed two specified files; updated all three references; did not delete other files." |

**Next:** [Local Agent Workflow](Local_Agent_Workflow.md) · [Cloud Agent Workflow](Cloud_Agent_Workflow.md).