# SylphxAI Actions

Reusable GitHub Actions for SylphxAI projects.

## Available Actions

| Action | Description |
|--------|-------------|
| [publish](./publish) | Publish packages to npm with changesets |

## Publish Action

Automated npm publishing with [changesets](https://github.com/changesets/changesets), workspace protocol resolution, and optional Slack notifications.

### Quick Start

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

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

### Inputs

#### Required

| Input | Description |
|-------|-------------|
| `npm-token` | NPM authentication token |
| `github-token` | GitHub token for creating releases and PRs |

#### Build Configuration

| Input | Default | Description |
|-------|---------|-------------|
| `build-command` | `bun run build` | Command to build packages |
| `skip-build` | `false` | Skip the build step |
| `test-command` | `''` | Command to run tests before publishing |

#### Version & Publish

| Input | Default | Description |
|-------|---------|-------------|
| `version-command` | `bun run version-packages` | Command to update package versions |
| `publish-command` | `bun run release` | Command to publish packages |
| `create-github-releases` | `true` | Create GitHub releases |

#### Multi-platform Support

| Input | Default | Description |
|-------|---------|-------------|
| `download-artifacts` | `false` | Download build artifacts before publishing |
| `artifacts-path` | `artifacts` | Path to download artifacts to |
| `pre-publish-command` | `''` | Command to run before changesets |
| `post-publish-command` | `''` | Command to run after successful publish |

#### Runtime

| Input | Default | Description |
|-------|---------|-------------|
| `bun-version` | `latest` | Bun version to use |
| `node-version` | `20` | Node.js version for npm publish |
| `npm-registry` | `https://registry.npmjs.org` | NPM registry URL |
| `working-directory` | `.` | Working directory for commands |

#### Notifications

| Input | Default | Description |
|-------|---------|-------------|
| `slack-webhook` | `''` | Slack webhook URL for notifications |

### Outputs

| Output | Description |
|--------|-------------|
| `published` | Whether packages were published (`true`/`false`) |
| `published-packages` | JSON array of published packages |

### Examples

#### Basic (Single Package)

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

#### With Tests

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    test-command: bun test
```

#### Monorepo with Turborepo

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    build-command: bun run build --filter=./packages/*
```

#### With Slack Notifications

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

#### Multi-platform Binary Publishing

```yaml
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - run: bun run build:binary
      - uses: actions/upload-artifact@v4
        with:
          name: binary-${{ matrix.os }}
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
          download-artifacts: true
          artifacts-path: dist
          pre-publish-command: bun run create-platform-packages
```

#### Custom Registry (GitHub Packages)

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.GITHUB_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    npm-registry: https://npm.pkg.github.com
```

#### Skip Build (Pre-built)

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
    skip-build: true
```

### Features

#### Workspace Protocol Resolution

Automatically resolves `workspace:*`, `workspace:^`, and `workspace:~` protocols to actual versions before publishing. This ensures published packages have correct dependency versions.

```json
// Before (in monorepo)
{
  "dependencies": {
    "@myorg/utils": "workspace:^"
  }
}

// After (published)
{
  "dependencies": {
    "@myorg/utils": "^1.2.3"
  }
}
```

#### Changesets Integration

Uses [changesets/action](https://github.com/changesets/action) for:
- Automated version bumping
- Release PR creation
- npm publishing
- GitHub release creation

#### Slack Notifications

When `slack-webhook` is provided:
- **Success**: Lists all published packages with npm links
- **Failure**: Alerts with repository, branch, and workflow link

### Prerequisites

1. **Changesets**: Initialize changesets in your project
   ```bash
   bun add -D @changesets/cli
   bunx changeset init
   ```

2. **NPM Token**: Create an npm access token with publish permissions

3. **Package.json Scripts** (recommended):
   ```json
   {
     "scripts": {
       "build": "bunup",
       "version-packages": "changeset version",
       "release": "changeset publish"
     }
   }
   ```

### Troubleshooting

#### "No changesets found"
This is normal when there are no pending changes. The action will create a Release PR when changesets exist.

#### "npm ERR! 403 Forbidden"
Check that your `NPM_TOKEN` has publish permissions and the package name is available.

#### Workspace versions not resolved
Ensure your root `package.json` has a `workspaces` field pointing to your packages.

## License

MIT
