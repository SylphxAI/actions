# Publish Action

Publish packages to npm using bump with Slack notifications.

## Features

- 📦 Automatic versioning based on conventional commits
- 🔄 Creates release PRs or publishes directly
- 🔔 Slack notifications on success/failure
- 📝 Auto-generated changelog
- ⚡ Bun-first, zero config

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
| `build-command` | Build command (runs before publish) | `''` |
| `skip-build` | Skip build step | `false` |
| `dry-run` | Preview without publishing | `false` |
| `tag` | Create git tags | `true` |
| `changelog` | Update CHANGELOG.md | `true` |
| `github-release` | Create GitHub release | `true` |
| `slack-webhook` | Slack webhook URL | `''` |
| `working-directory` | Working directory | `.` |
| `bun-version` | Bun version | `latest` |

## Outputs

| Output | Description |
|--------|-------------|
| `published` | Whether packages were published |
| `version` | The new version (single package) |
| `versions` | JSON object of versions (monorepo) |

## How it works

1. **Push to main** → Creates/updates release PR
2. **Merge release PR** → Publishes to npm + Slack notification

Uses [@sylphx/bump](https://github.com/SylphxAI/bump) under the hood.
