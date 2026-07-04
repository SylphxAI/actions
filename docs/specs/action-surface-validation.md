# Action-Surface Validation Spec

## Goal

Keep `SylphxAI/actions` honest about the reusable action paths it owns and
dogfood GroundAtlas through the same released package/action gate used by the
fleet.

## Scope

This repository owns reusable action implementations under documented action
paths such as `slack-notify/action.yml`.

It does not own:

- organization reusable workflows in `SylphxAI/.github`;
- consumer repository CI, release, deployment, branch protection, or production
  proof;
- enterprise doctrine or the GroundAtlas schema.

## Workflow Contract

`.github/workflows/groundatlas.yml` runs on:

- `pull_request`;
- `push` to `main`;
- `merge_group`.

It must:

1. check out the repository;
2. set up Node.js 22.14.0;
3. run `node --test tests/action-surface.test.mjs`;
4. run `SylphxAI/groundatlas@v0.1.3` with `package-spec:
   groundatlas@0.1.3`, `require-atlas: "true"`, and `strict: "true"`;
5. assert that GroundAtlas selects `project.manifest.json` and treats
   `.doctrine/project.json` only as an adapter;
6. assert the human-readable Markdown scorecard reports one adopted project with
   zero warnings and zero blockers;
7. upload the manifest JSON, fleet JSON, and fleet Markdown reports as
   `groundatlas-package-dogfood`.

## Acceptance

- README advertises `SylphxAI/actions/slack-notify@v1`.
- README does not advertise `SylphxAI/actions/publish@v1`.
- `slack-notify/action.yml` remains a composite action with `webhook` and
  `message` inputs.
- `ga audit` passes after `ga update`.
- `ga manifest --json` selects `project.manifest.json`.
- `ga fleet --require-atlas --strict --json` reports one adopted project with
  zero warnings and zero blockers.
- `ga fleet --require-atlas --strict` renders a Markdown scorecard with the
  same adopted summary.
