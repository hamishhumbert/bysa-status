import fs from "node:fs";
import path from "node:path";

const workflowDir = path.resolve(".github", "workflows");
const files = fs
  .readdirSync(workflowDir)
  .filter((name) => /\.ya?ml$/i.test(name))
  .sort();

const errors = [];
for (const file of files) {
  const text = fs.readFileSync(path.join(workflowDir, file), "utf8");
  if (!/^permissions:\s*$/m.test(text)) {
    errors.push(`${file}: missing an explicit top-level permissions block`);
  }

  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const match = line.match(/^\s*-?\s*uses:\s*([^\s#]+)/);
    if (!match || match[1].startsWith("./") || match[1].startsWith("docker://")) continue;
    const at = match[1].lastIndexOf("@");
    const ref = at === -1 ? "" : match[1].slice(at + 1);
    if (!/^[0-9a-f]{40}$/.test(ref)) {
      errors.push(`${file}:${index + 1}: remote action is not pinned to a full commit SHA`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${files.length} workflows: explicit permissions and full-SHA action pins.`);
}
