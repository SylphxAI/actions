# ADR 0001: Add GroundAtlas Action-Surface Validation

## Status

Accepted

## Context

`SylphxAI/actions` owns reusable action implementations and their versioned
action references. The repository's README previously described a
`SylphxAI/actions/publish@v1` path even though the publish workflow surface now
belongs in `SylphxAI/.github`. The repository also had no local CI to catch
action metadata or documentation drift before consumers discovered it.

The GroundAtlas fleet rollout needs every adopted repository to expose a
vendor-neutral project manifest while preserving `.doctrine/project.json` as
the Sylphx-specific adapter.

## Decision

Add:

- a vendor-neutral `project.manifest.json`;
- a local `GroundAtlas` workflow using `SylphxAI/groundatlas@v0.1.2` and
  `groundatlas@0.1.2`;
- an action-surface test that proves documented action paths exist and the
  non-owned publish path is not advertised;
- concise project-control documentation in `PROJECT.md`, README, this ADR, and
  `docs/specs/action-surface-validation.md`.

## Consequences

- The Slack notification action remains the only action surface advertised by
  this repository.
- Organization reusable workflows and publish/release automation remain owned
  by `SylphxAI/.github`.
- GroundAtlas generated files remain evidence/navigation only, not source of
  truth.
- Main readback plus the local GroundAtlas workflow are the first proof surface
  for this repository's own changes; downstream consumer workflow proof is
  still required for action contract behavior changes.
