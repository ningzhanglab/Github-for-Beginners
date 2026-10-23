# GitHub Features Through Economics Research Examples

Start with the [visual tutorial](../01_Start_Here/Why_GitHub.md) for annotated diagrams. This chapter answers the recurring question: **"Why would an economics researcher need each GitHub feature?"**

All hypothetical analyses below are **examples**. The [live repository exercise](../examples/economics) uses entirely synthetic observations, not real economic evidence.

## Case 1 — You are revising a regression table

**Without GitHub:** `table_2_final.tex`, `table_2_fixed.tex`, `table_2_final_3.tex`; nobody knows which file was used in the submitted draft.

**With GitHub Desktop:** edit `table_2.tex` in your editor; click **Changes** to inspect the diff, then commit `Clarify column definitions in Table 2`. The **History** tab shows past versions and messages.

**Why useful:** you can identify *which revision* introduced a changed standard error or sample-size note. GitHub itself cannot tell whether an econometric result is correct; you must still verify the analysis.

## Case 2 — Test a new robustness specification

You want to replace the control set in an illustrative wage regression, but the accepted `main` draft must remain usable.

**Desktop workflow:** Fetch/Pull `main` → **Current Branch → New Branch** → name it `robustness/controls-v2` → edit the script and table in an editor → inspect Changes → Commit → Push → open PR.

**Why useful:** the experiment is isolated until reviewed. A branch is not a separate physical backup or a second repository. Switching the branch changes the version shown in your working folder; save or commit uncommitted work first.

**Caution:** avoid saying a "robustness check passed" until the script genuinely ran and the coefficients/diagnostics were checked.

## Case 3 — A coauthor sees a missing definition

The data use unemployment rates in percent, but your result table interprets a **percentage-point** change. Instead of messaging "please fix", open an **Issue** with acceptance criteria.

**Real teaching record:** [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) requests a dictionary, numerical checks, and explicit interpretation limits.

**Why useful:** the task has one URL, agreed scope, and a place to attach questions, evidence, and decisions. An Issue is a task; it does not itself change any file.

## Case 4 — Review a contributor or agent's changes

An agent adds a data dictionary and updates the result description. How do you know it did not change the underlying data?

**Real teaching record:** [PR #4 → Files changed](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). It shows **four changed files**, while the [synthetic CSV](../examples/economics/synthetic_county_panel.csv) was left untouched.

**Why useful:** a PR collects proposed changes in a single place, with before/after diffs, comments, and a merge decision.

**Desktop:** **Current Branch → Pull Requests** lets you inspect a currently open PR branch. This particular demo PR is **already merged**; inspect it on the GitHub website or use Desktop History to view the resulting commits. Review comments and merging occur on GitHub.com.

## Case 5 — You and a coauthor edited the same document

You revised `introduction.tex`; your collaborator updated its last paragraph on another branch. Before merging, inspect both edits and discuss the correct wording. GitHub may combine non-overlapping changes automatically but overlapping edits can cause a merge conflict.

**Why useful:** separate branches and PR comments let collaborators negotiate instead of emailing replacement versions. Resolve conflicts deliberately—never assume the agent's version should win.

## Case 6 — A regression result changed unexpectedly

Use Desktop **History** to identify the last relevant edit to the code or table. You can inspect older commits and their diffs. If a change to a shared branch needs undoing, a **Revert** creates another commit that reverses it, where applicable.

**Why useful:** there is a trail for recovery. **Important:** uncommitted changes may not be recoverable, and a GitHub repo should not be your only backup. Do not rewrite shared history with force pushes as a normal fix.

## Case 7 — A cloud agent says "done"

The agent may have committed to an online branch, opened a PR, drafted a file in chat only, or failed to publish. Ask for **repository + branch + commit or PR URL**.

**Why useful:** evidence replaces claims. Verify the actual file diff, test result, and PR status. Once merged, open Desktop on `main` and **Fetch / Pull** to update your local files.

See [agent walkthrough](Economics_AI_Example.md).

## Case 8 — You want a replication package others can follow

A simple repository can contain:

```text
econ-replication-example/
├── README.md                 # how to understand/reproduce the project
├── docs/
│   ├── research_question.md
│   ├── data_dictionary.md
│   └── research_log.md
├── src/                      # scripts (R, Python, Stata, etc.)
├── data/
│   └── synthetic_example.csv # safe teaching data only
└── outputs/
    └── table_1.md            # verified outputs or interpretation notes
```

- **README:** how to use the project, dependencies, data origin, replication steps.
- **History/Commit:** what code and documentation changed.
- **Branch:** independent experiments.
- **Issue:** documented defects and planned checks.
- **PR/Review:** scrutinize proposed solutions.
- **Tags/Releases (optional):** label versions such as `submission-v1` or `replication-v1`.

For actual research, do not commit restricted microdata, credentials, or files forbidden by data-use agreements. Large datasets can be unsuitable for ordinary repository tracking; keep secure sources in approved storage and document how authorized users obtain them.

## One-page decision table

| I am trying to… | Use |
|---|---|
| Keep the accepted draft safe while exploring | New **Branch** |
| Save today's data dictionary update | **Commit** |
| Publish my commits for collaboration | **Push origin** |
| Get the coauthor's accepted edits onto my laptop | **Fetch origin → Pull origin** |
| Assign a source verification task | **Issue** |
| Check an agent's proposed variable-definition change | **Pull Request → Files changed** |
| Reject a bad proposal | PR **comments / request changes**; do not merge |
| Investigate an older result or undo a shared mistake | **History**, potentially **Revert** |
| Mark a documented, approved submission milestone | **Release or tag** (optional) |

**Next:** [Economics agent collaboration example](Economics_AI_Example.md) · [Desktop annotated controls](../assets/illustrations/desktop-controls-econ.svg).