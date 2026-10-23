# 03 · Work with an AI assistant

You can ask an AI assistant to improve a document, organize notes, or check a research table. But **you stay in control of what becomes part of the project**.

![Local and cloud AI assistants work in different places](../assets/illustrations/agent-local-cloud-econ.svg)

*Illustration, not a screenshot. Some agents can only suggest text; they cannot directly edit GitHub.*

## The safest beginner approach: five actions

1. **Give a small task.** Example: "Explain the four columns in my sample economics CSV; don't change any numbers."
2. **Use a separate branch** (a safe working version), not the accepted `main` version.
3. **Have the assistant show exactly what changed.** An assistant might edit files locally, open a proposal on GitHub.com, or only return text for you to paste.
4. **Check the changes yourself.** Use GitHub Desktop's **Changes / History**, or a GitHub.com **Pull Request** (a review page).
5. **Accept only after reviewing.** When you merge a proposal online, use Desktop to pull the accepted changes onto your computer.

**Rule:** If the agent says "done", ask which actual files, branch and review page changed. A message alone is not proof.

## Which example fits your situation?

| My AI assistant… | Read |
|---|---|
| Can edit the same folder on **my computer** | [Local AI assistant workflow](Local_Agent.md) |
| Can open changes **on GitHub.com** | [Cloud / connected AI assistant workflow](Cloud_Agent.md) |
| Can only suggest text in a chat | [Copy-paste prompts](Copy_Paste_Prompts.md) and apply the text in your editor |

Want more explanations? Open the [complete AI collaboration guide](AI_Guide.md).

## Copy this example instruction

> Please read my sample economics research project. On a separate branch, explain the meaning and units of each variable in `data_dictionary.md`. Do **not** change the CSV or the accepted main branch. Show which files you changed, what you checked, and what is still uncertain. Do not merge changes without my approval. If you cannot edit files, return a complete draft instead.

**See a real teaching example:** [the task (Issue #3)](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) → [the reviewed changes (Pull Request #4)](https://github.com/ningzhanglab/Github-for-Beginners/pull/4/files). The research values are fictional, and this is a teaching demonstration rather than an independent agent evaluation.

**Next:** [Try an economics example](../04_Practice/README.md) · [Home](../README.md)
