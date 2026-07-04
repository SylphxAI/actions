import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const readText = (path) => readFileSync(path, "utf8");

test("README advertises only action paths owned by this repository", () => {
  const readme = readText("README.md");

  assert.ok(existsSync("slack-notify/action.yml"));
  assert.ok(readme.includes("SylphxAI/actions/slack-notify@v1"));
  assert.ok(!readme.includes("SylphxAI/actions/publish@v1"));
  assert.ok(readme.includes("SylphxAI/.github"));
});

test("slack notify action has a stable composite action contract", () => {
  const action = readText("slack-notify/action.yml");

  assert.match(action, /name:\s*['"]Slack Notify['"]/);
  assert.match(action, /using:\s*['"]composite['"]/);
  assert.match(action, /webhook:/);
  assert.match(action, /message:/);
});

test("project control keeps GroundAtlas neutral and Doctrine adapter-specific", () => {
  const manifest = readJson("project.manifest.json");
  const doctrine = readJson(".doctrine/project.json");
  const workflow = readText(".github/workflows/groundatlas.yml");

  assert.equal(manifest.project.id, "sylphxai-actions");
  assert.equal(manifest.adoption.status, "adopted");
  assert.ok(
    manifest.surfaces.some(
      (surface) =>
        surface.path === ".doctrine/project.json" &&
        surface.description.includes("not the vendor-neutral GroundAtlas default"),
    ),
  );
  assert.equal(doctrine.project.repo, "SylphxAI/actions");
  assert.ok(workflow.includes("uses: SylphxAI/groundatlas@v0.1.2"));
  assert.ok(workflow.includes("package-spec: groundatlas@0.1.2"));
});
