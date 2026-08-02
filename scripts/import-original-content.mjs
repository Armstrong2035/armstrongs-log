import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(process.cwd(), "app", "original-content");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith(".md") ? [full] : [];
  });
}

const entries = Object.fromEntries(
  walk(root).map((file) => [
    relative(root, file).replaceAll("\\\\", "/"),
    readFileSync(file, "utf8"),
  ]),
);

const output = `// Generated from Armstrong's original Markdown files. Do not edit by hand.\nexport const originalMarkdown: Record<string, string> = ${JSON.stringify(entries, null, 2)};\n`;
writeFileSync(join(process.cwd(), "app", "original-content.generated.ts"), output);
