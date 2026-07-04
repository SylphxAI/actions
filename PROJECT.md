# SylphxAI Actions

SylphxAI/actions is a shared GitHub Actions repository for reusable automation consumed by SylphxAI repositories through versioned action references.

## Lifecycle

- State: `production`
- Layer: `tooling`
- Machine manifest: [`.doctrine/project.json`](./.doctrine/project.json)
- Vendor-neutral project manifest:
  [`project.manifest.json`](./project.manifest.json)

## Goals

- Provide shared, versioned GitHub Action surfaces for SylphxAI repositories.
- Maintain the Slack notification composite action in `slack-notify/action.yml`.
- Keep README action paths aligned with action directories that exist on `main`.
- Keep action ownership, public surfaces, and adoption gaps explicit for agents.

## Non-Goals

- This repository does not own repository-specific CI, release, or deployment workflows.
- This repository does not own organization reusable workflows; those belong in `SylphxAI/.github`.
- This repository does not own enterprise engineering doctrine.

## Boundary

This repository owns reusable action implementations and their public action references. Consuming repositories must call only documented action paths and must not rely on private files or unstated behavior.

## Public Surfaces

- Slack notification action: [`slack-notify/action.yml`](./slack-notify/action.yml)
- Versioned action tag: `v1`
- Usage documentation: [`README.md`](./README.md)
- Local GroundAtlas gate: [`.github/workflows/groundatlas.yml`](./.github/workflows/groundatlas.yml)

## Delivery

This repository has a lightweight local GroundAtlas project-control workflow. It
validates `project.manifest.json`, keeps `.doctrine/project.json` as a Sylphx
Doctrine adapter, runs action-surface tests, and uploads GroundAtlas manifest
JSON, fleet JSON, and fleet Markdown scorecard reports as evidence only.

The repository currently has no required status contexts on `main`. Action
consumers use versioned Git refs such as `v1`; production proof is GitHub
main/tag readback plus successful local project-control CI. Action contract
behavior changes still require action metadata validation and successful
downstream consumer workflow runs.
