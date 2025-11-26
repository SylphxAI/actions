# Publish Action

Publish packages to npm with changesets, workspace resolution, and Slack notifications.

## Features

- 🔧 Automatic `workspace:^` protocol resolution
- 📦 Changesets-based versioning and publishing
- 🔔 Slack notifications on success/failure
- 🏗️ Multi-platform artifact support
- ⚡ Bun-first, Node.js compatible

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

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `npm-token` | NPM authentication token | **required** |
| `github-token` | GitHub token for releases/PRs | **required** |
| `build-command` | Build command | `bun run build` |
| `skip-build` | Skip build step | `false` |
| `test-command` | Test command (optional) | `''` |
| `version-command` | Version command | `bun run version-packages` |
| `publish-command` | Publish command | `bun run release` |
| `bun-version` | Bun version | `latest` |
| `node-version` | Node.js version | `20` |
| `npm-registry` | NPM registry URL | `https://registry.npmjs.org` |
| `create-github-releases` | Create GitHub releases | `true` |
| `working-directory` | Working directory | `.` |
| `slack-webhook` | Slack webhook URL | `''` |
| `download-artifacts` | Download build artifacts | `false` |
| `artifacts-path` | Artifacts path | `artifacts` |
| `pre-publish-command` | Pre-publish command | `''` |
| `post-publish-command` | Post-publish command | `''` |

## Outputs

| Output | Description |
|--------|-------------|
| `published` | Whether packages were published |
| `published-packages` | JSON array of published packages |

## Workspace Protocol Resolution

This action automatically resolves `workspace:^` dependencies to actual version numbers before publishing, fixing the [changesets issue #1011](https://github.com/changesets/changesets/issues/1011).

## Slack Notifications

If `slack-webhook` is provided, notifications are sent:
- ✅ On successful publish with package links
- ❌ On failure with workflow link
