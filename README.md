# SylphxAI Actions

Reusable GitHub Actions for SylphxAI projects.

## Available Actions

| Action | Description | Usage |
|--------|-------------|-------|
| [publish](./publish) | Publish to npm with changesets | `uses: SylphxAI/actions/publish@v1` |

## Quick Start

### Publish to NPM

```yaml
- uses: SylphxAI/actions/publish@v1
  with:
    npm-token: ${{ secrets.NPM_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

## License

MIT
