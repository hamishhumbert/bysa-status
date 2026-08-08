# BYSA incident severity policy

BYSA classifies incidents by business impact, not engineering difficulty.

| Priority | Meaning | Current use |
| --- | --- | --- |
| `priority-p1` | Production is unavailable or a critical, revenue-blocking workflow cannot operate. Immediate response is required. | No monitor yet. BYSA does not yet have a verified production service. |
| `priority-p2` | A major production workflow is unavailable, but the entire business is not stopped. | No monitor yet. Authenticated case workflows are not yet externally verified in production. |
| `priority-p3` | Staging, a non-critical subsystem, or a degraded workflow needs attention. | All current public staging checks. |
| `priority-p4` | A warning or maintenance issue has low immediate business impact. | Reserved for future performance, certificate, backup-freshness, or maintenance checks. |

## Current monitored scope

- BYSA staging web response and stable public content marker.
- BYSA staging process liveness through `/livez`.
- BYSA staging dependency readiness through `/readyz`.

These checks do not prove that authentication, case creation, evidence storage,
marketplace connectors, payments, messaging, or backups work end to end.

## Alerting limitations

Upptime runs on scheduled GitHub Actions. Checks normally run about every five
minutes, but GitHub can delay or drop scheduled jobs. GitHub issue assignment
and repository notifications provide founder-stage email alerting; this is not
a guaranteed 24/7 paging system.

P1 and P2 monitors must not be added until the corresponding production
workflow exists, is externally verified, and has a tested response owner.

## Maintenance policy

Automatic Upptime template rewriting is disabled. GitHub's repository token is
intentionally not allowed to rewrite workflow files, and BYSA Status does not
store a broad personal access token. Review and apply upstream workflow updates
manually so each workflow change remains visible in Git history.
