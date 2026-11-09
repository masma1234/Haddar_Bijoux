# Haddar Bijoux Codex handoff

## What's included

- `HADDAR_CODEX_PROMPT.md`: Codex-ready implementation brief and verified 6-image mapping.
- `incoming/`: six distinct 1200 x 1200 AI-generated illustrative JPGs in required file names.
- `reference/haddar-palette-swatch.png`: user-provided palette image. The repository's actual `AGENTS.md` remains authoritative for CSS tokens.
- `SHA256SUMS.txt`: checksums of the original six JPGs.

## How to use

1. Extract this ZIP **at the root of your Haddar Bijoux repository** so that `incoming/hero.jpg` and its five sibling files exist. The ZIP includes no application source files and does not override `AGENTS.md`.
2. Open your repository in Codex.
3. Paste the contents of `HADDAR_CODEX_PROMPT.md` into a Codex task, or point Codex to the file in the repository with: `Read HADDAR_CODEX_PROMPT.md, follow AGENTS.md, and implement the brief.`
4. Review the final `NEEDS OWNER INPUT` items, particularly legal disclosures, production domain, rights, and any unverified business claim.

**Important:** The JPGs are generated illustrative artwork, not inventory photographs, and their native aspect ratio is square. Do not describe them as real product photos, and do not crop jewelry off to force 3:4 frames.
