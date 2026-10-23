# Research Verification Checklist — Toy Economics Example

**Purpose:** Show how a human can review an AI agent's proposed research edit **before merging a Pull Request**.

### Dataset checks

- [x] Data file has four fictional counties × two calendar years = eight observations (checked against provided CSV).
- [x] Unemployment rate is reported in **percent**; changes are stated in **percentage points**.
- [x] Hourly wages are **nominal USD**, not adjusted for price changes.
- [x] Alpha's unemployment change: `4.5 - 5.0 = -0.5` percentage points.
- [x] Alpha's wage growth: `(26.0 / 25.0 - 1) × 100 = 4.0%`.
- [x] No regression estimate, statistical significance, or causal effect is asserted.

### Documentation and process checks

- [x] A data dictionary explains all four columns.
- [x] The draft results link to the source CSV and dictionary.
- [ ] A real-world source was independently checked — **not applicable: data are fabricated**.
- [ ] A statistical model was independently replicated — **not applicable: no model was run**.

### What this teaches about GitHub

**Issue:** records why the check is needed. **Branch:** lets a contributor or agent propose a change without immediately changing `main`. **Commit:** saves the proposed documentation. **PR / Files changed:** shows exactly what changed. **Merge:** accepts the reviewed proposal. **Pull:** updates the researcher's local GitHub Desktop folder.

A checked box here documents a simple teaching calculation; it is not a substitute for a rigorous research audit or independent economic inference.

View [Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3) and [Pull Request #4](https://github.com/ningzhanglab/Github-for-Beginners/pull/4) to see the actual GitHub workflow.
