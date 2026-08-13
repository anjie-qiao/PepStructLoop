# PepStructLoop

**Sequence intelligence explores. Structure intelligence decides.**

PepStructLoop is a reproducible, de novo peptide-design workflow for the NTSR1 target. It combines PepMLM sequence generation, physicochemical and perplexity filtering, diversity-aware selection, and Boltz complex prediction in a sequence-to-structure evidence funnel.

## Current measured funnel

| Stage | Candidates | Status |
|---|---:|---|
| PepMLM de novo generation | 100,000 | Measured |
| Hard sequence QC | 39,125 | Measured |
| PPL evaluated | 9,305 | Measured |
| Diversity-controlled structural core | 4,016 | Measured / structure prediction running |
| Structural shortlist | ~100–200 | Projected |
| Final computational panel | ~100 | Projected |
| Expert selection | 3 | Projected |

The labels **measured**, **running**, and **projected** remain explicit throughout the homepage so computational plans are not presented as experimental results.

## Target and design space

- Target: mouse NTSR1 / UniProt O88319
- Receptor length: 424 aa
- Peptide design space: 12–33 aa across 22 discrete lengths
- Structure model: Boltz complex prediction
- Receptor MSA: shared alignment, maximum depth 512
- Peptides: de novo single-sequence chains

## Local homepage

Requires Node.js 22.13 or newer.

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
```

The interactive project homepage lives in `app/`. It tells the sequence-universe → molecular-interface → structure-feedback story with measured project statistics and explicitly marked projections.

Public homepage: **https://anjie-qiao.github.io/PepStructLoop/**

`pnpm build:pages` creates the static GitHub Pages artifact in `pages-dist/` from the same validated homepage source.

## Scientific boundary

The structural layer ranks hypotheses; it does not establish binding affinity or biological activity. Final candidates still require expert review and experimental validation.
