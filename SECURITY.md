# Security policy

## GitHub Actions

Every remote action must be pinned to a reviewed 40-character commit SHA. Keep
the human-readable release or branch in an inline comment so future updates are
auditable. Every workflow must also declare the narrowest practical top-level
`permissions` block.

Upptime's generated workflow refresh is deliberately manual. Before running
`Updates CI`, review the upstream changes and action releases. After it runs,
restore full-SHA pins, rerun `node scripts/verify-workflow-security.mjs`, and
merge only after the workflow-security check passes.

The monitoring workflows need repository contents write access because Upptime
commits status data. `Uptime CI` additionally needs issue write access to manage
incident issues, and `Setup CI` needs Actions write access to dispatch graph
generation. Other workflows must not inherit those extra permissions.
