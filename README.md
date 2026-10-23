# GitHub Desktop for Beginners

A practical, **no-command-line** guide to managing projects with **GitHub Desktop** and collaborating safely with **AI agents**.

This is a tutorial for people who want to manage actual project files—not become version-control experts. You can use it for research notes, coursework, documentation, spreadsheets, websites, and code projects.

> **Scope:** GitHub Desktop on Windows or macOS, plus the GitHub website for issues, pull requests (PRs), and reviews. **No terminal commands or command-line Git tutorials.** GitHub Desktop uses version control behind the scenes; you only need the visual workflow.

## Learn by doing

| Time | Where to start | What you will be able to do |
|---|---|---|
| 15 minutes | [First 15 Minutes](00_Start_Here/First_15_Minutes.md) | Clone, edit, commit, and push one file |
| 30–60 minutes | [Desktop Beginner Handbook](01_GitHub_Desktop/Beginner_Handbook.md) | Understand changes, history, branches, PRs, and syncing |
| 10 minutes | [Visual Workflow Maps](01_GitHub_Desktop/Visual_Workflows.md) | Choose the right workflow for your situation |
| Anytime | [Desktop Cheat Sheet](02_Cheat_Sheets/GitHub_Desktop_Cheat_Sheet.md) | Remember what every important button does |
| 30 minutes | [AI Agent Collaboration Guide](03_Agent_Collaboration/Agent_Collaboration_Guide.md) | Delegate safely and review AI changes |
| 20 minutes | [Hands-on Practice Labs](04_Practice_Labs/Guided_Practice.md) | Complete beginner-to-agent exercises |

## What does each tool do?

| Tool | Main job |
|---|---|
| **GitHub Desktop** (installed application) | Manage local copies, inspect changes, save checkpoints (commits), switch branches, sync with GitHub |
| **File editor** (VS Code, a Markdown editor, etc.) | Actually edit the files in your project |
| **GitHub website** | Host the shared repository, discuss issues, review and merge pull requests |
| **AI agent** (local assistant or cloud agent) | Propose and sometimes edit files under the access you give it; **you review and approve** |

**Important:** GitHub Desktop is *not* an AI agent, and GitHub Desktop alone does not edit your files. A cloud agent's ability to edit your repository depends on its permissions and connected service. Do not assume every AI chat has write access.

## Repository guide

```text
GitHub-for-Beginners/
├── README.md
├── 00_Start_Here/
│   └── First_15_Minutes.md
├── 01_GitHub_Desktop/
│   ├── Beginner_Handbook.md
│   └── Visual_Workflows.md
├── 02_Cheat_Sheets/
│   └── GitHub_Desktop_Cheat_Sheet.md
├── 03_Agent_Collaboration/
│   ├── Agent_Collaboration_Guide.md
│   ├── Local_Agent_Workflow.md
│   ├── Cloud_Agent_Workflow.md
│   └── Prompt_Library.md
├── 04_Practice_Labs/
│   └── Guided_Practice.md
├── 05_Troubleshooting/
│   └── Recovery_and_Common_Problems.md
├── 06_Reference/
│   └── Glossary_and_Official_Links.md
├── .github/
│   ├── ISSUE_TEMPLATE/agent-task.md
│   └── PULL_REQUEST_TEMPLATE.md
└── AGENTS.md
```

## The one mental model to remember

```text
GitHub website (shared project)
       ↓ Clone once
Local project folder ←→ GitHub Desktop ←→ GitHub website
       ↑ edits                    ↑ review / merge PRs
       └── Your editor or local AI agent

Cloud AI agent → separate branch + pull request → your review → merge
```

**Typical solo day:** Fetch/Pull → choose branch → edit → review changes → Commit → Push → PR (when needed).

**Typical agent day:** define a small task → have agent work on a separate branch → inspect changed files → test/open output → approve PR → sync in Desktop.

## Need help now?

- [I don't know what to click](02_Cheat_Sheets/GitHub_Desktop_Cheat_Sheet.md)
- [I want the AI agent to work on my files](03_Agent_Collaboration/Agent_Collaboration_Guide.md)
- [I want ready-to-copy prompts](03_Agent_Collaboration/Prompt_Library.md)
- [I accidentally changed or removed files](05_Troubleshooting/Recovery_and_Common_Problems.md)
- [I don't understand the words in the interface](06_Reference/Glossary_and_Official_Links.md)

## Official resources

- [Download GitHub Desktop](https://desktop.github.com/)
- [GitHub Desktop documentation](https://docs.github.com/en/desktop)
- [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop)
- [Using a cloud coding agent on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview) (depends on subscription, access, and repository settings)

This teaching repository is intentionally editor- and agent-neutral. Menu labels may change; use the linked official documentation to check newer interfaces. Last reviewed: October 2026.

**Safety:** Do not upload passwords, API keys, confidential university records, or private participant/client data to a public repository or to an AI service that is not approved for that data.
