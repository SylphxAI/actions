# SylphxAI Actions

Shared, versioned GitHub Actions for SylphxAI repositories.

## Available Actions

| Action | Description |
| --- | --- |
| [`SylphxAI/actions/slack-notify@v1`](./slack-notify/action.yml) | Send a Slack message to a supplied webhook. |

## Slack Notify

```yaml
- uses: SylphxAI/actions/slack-notify@v1
  with:
    webhook: ${{ secrets.SLACK_WEBHOOK }}
    message: "Deployment completed for ${{ github.repository }}"
```

Inputs:

| Input | Required | Description |
| --- | --- | --- |
| `webhook` | yes | Slack incoming webhook URL. |
| `message` | yes | Slack `mrkdwn` message text. |

## Release and npm publish workflows

Organization-level reusable release and npm-publish workflows live in
[`SylphxAI/.github`](https://github.com/SylphxAI/.github). Do not call a
non-existent publish action path from this repository.

## Project control

Start with [PROJECT.md](./PROJECT.md) for the human project boundary and
[`project.manifest.json`](./project.manifest.json) for the vendor-neutral
machine-readable project control file.

The local GroundAtlas workflow uploads manifest JSON, fleet JSON, and the fleet
Markdown scorecard as evidence/navigation only. Generated `.groundatlas*`
reports are not the source of truth for action contracts or downstream consumer
delivery proof.
