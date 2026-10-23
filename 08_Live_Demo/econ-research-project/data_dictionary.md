# Synthetic County-Year Data Dictionary

This document describes [synthetic_county_panel.csv](synthetic_county_panel.csv). All values and county names are **invented for teaching**.

| Column | Type | Unit | Meaning |
|---|---|---|---|
| `county` | Text | None | Fictional county label (Alpha, Beta, Gamma, Delta) |
| `year` | Integer | Calendar year | 2024 or 2025 |
| `unemployment_rate_pct` | Number | Percent (%) | Fictional unemployment rate in that county-year |
| `mean_hourly_wage_usd` | Number | Nominal USD per hour | Fictional average hourly wage in that county-year |

## Important distinctions

If the unemployment rate moves from 5.0% to 4.5%, it changes by **−0.5 percentage points**, not −0.5 percent.

If wages move from $25.00 to $26.00, the **percentage change in wages** is `(26.00 / 25.00 - 1) × 100 = 4.0%`.

Neither measure is adjusted for inflation. There are four counties × two years = **eight rows**. No real county, wage series, labor-market survey, or source is being referenced.

## Scope of the result

A data dictionary makes the dataset easier to audit and reuse. It does **not** establish that data are representative, accurate for a real population, or suitable for a causal model.

See also [verification_checklist.md](verification_checklist.md) and the [teaching Issue #3](https://github.com/ningzhanglab/Github-for-Beginners/issues/3).