# Publish Action

Publish packages to npm using bump with Slack notifications.

## Usage

```yaml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: SylphxAI/actions/publish@v1
        with:
          npm-token: ${{ secrets.NPM_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### With Slack notifications

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

### With custom build

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    build-command: 'bun run build'
```

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `npm-token` | NPM authentication token | **required** |
| `github-token` | GitHub token for releases/PRs | **required** |
| `mode` | Bump mode: auto, release, version, pr | `auto` |
| `base-branch` | Base branch for PR mode | `main` |
| `dry-run` | Preview without publishing | `false` |
| `build-command` | Build command (empty = skip) | `''` |
| `download-artifacts` | Download build artifacts | `false` |
| `artifacts-path` | Path to download artifacts to | `artifacts` |
| `pre-publish-command` | Command before bump | `''` |
| `post-publish-command` | Command after publish | `''` |
| `slack-webhook` | Slack webhook URL | `''` |
| `working-directory` | Working directory | `.` |

## Outputs

| Output | Description |
|--------|-------------|
| `published` | Whether packages were published |
| `version` | The new version (single package) |
| `versions` | JSON object of versions (monorepo) |

## Multi-platform Support

For projects with native binaries built on multiple platforms:

```yaml
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - run: bun run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-${{ matrix.os }}
          path: dist/

  publish:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: SylphxAI/actions/publish@v1
        with:
          npm-token: ${{ secrets.NPM_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          download-artifacts: 'true'
          pre-publish-command: 'bun run create-platform-packages'
```

## How it works

1. **Push to main** → Creates/updates release PR
2. **Merge release PR** → Publishes to npm + Slack notification

Uses [@sylphx/bump](https://github.com/SylphxAI/bump) under the hood.
