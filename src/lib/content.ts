import { originalMarkdown } from "./original-content.generated";

export type ContentItem = {
  type: "project" | "essay" | "projectLog" | "deepDive" | "system" | "note";
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string;
  meta: Record<string, unknown>;
  path: string;
};

function scalar(value: string): unknown {
  const clean = value.trim();
  if (!clean) return "";
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) return clean.slice(1, -1);
  if (clean.startsWith("[") && clean.endsWith("]")) return clean.slice(1, -1).split(",").map((part) => String(scalar(part.trim())));
  if (clean === "true" || clean === "false") return clean === "true";
  if (/^\d+$/.test(clean)) return Number(clean);
  return clean;
}

function parse(raw: string) {
  if (!raw.startsWith("---")) return { meta: {} as Record<string, unknown>, body: raw.trim() };
  const end = raw.indexOf("\n---", 3);
  const frontmatter = raw.slice(4, end).split("\n");
  const meta: Record<string, unknown> = {};
  let parent = "";
  for (const line of frontmatter) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const nested = /^\s+([\w-]+):\s*(.*)$/.exec(line);
    if (nested && parent) {
      const current = (meta[parent] as Record<string, unknown>) || {};
      current[nested[1]] = scalar(nested[2]);
      meta[parent] = current;
      continue;
    }
    const match = /^([\w-]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    parent = match[1];
    meta[parent] = match[2] ? scalar(match[2]) : {};
  }
  return { meta, body: raw.slice(end + 4).trim() };
}

const typeByFolder: Record<string, ContentItem["type"]> = {
  projects: "project", freeNotes: "essay", projectLogs: "projectLog", deepDives: "deepDive", system: "system", "note-to-self": "note",
};

export const content: ContentItem[] = Object.entries(originalMarkdown).map(([path, raw]) => {
  const { meta, body } = parse(raw);
  const folder = path.split("/")[0];
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const title = String(meta.title || meta.name || slug.replaceAll("-", " "));
  return {
    type: typeByFolder[folder], slug, title,
    date: String(meta.date || meta.year || ""),
    description: String(meta.description || meta.summary || meta.tagline || ""),
    body, meta, path,
  };
});

export const projects = content.filter((item) => item.type === "project").sort((a, b) => Number(a.meta.order || 99) - Number(b.meta.order || 99));
export const essays = content.filter((item) => item.type === "essay").sort((a, b) => b.date.localeCompare(a.date));
export const projectLogs = content.filter((item) => item.type === "projectLog").sort((a, b) => b.date.localeCompare(a.date));
export const deepDives = content.filter((item) => item.type === "deepDive").sort((a, b) => b.date.localeCompare(a.date));
export const systemPages = content.filter((item) => item.type === "system");

export function seriesName(item: ContentItem) {
  const series = item.meta.series;
  if (typeof series === "string") return series;
  if (series && typeof series === "object") return String((series as Record<string, unknown>).name || "Uncollected");
  return "Uncollected";
}

export const writingGroups = essays.reduce<Record<string, ContentItem[]>>((groups, essay) => {
  const group = seriesName(essay);
  (groups[group] ||= []).push(essay);
  return groups;
}, {});

export function projectMaterial(projectName: string) {
  return {
    logs: projectLogs.filter((item) => item.meta.project === projectName),
    dives: deepDives.filter((item) => item.meta.project === projectName),
  };
}

export const formatDate = (date: string) => date ? new Date(date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }) : "";
