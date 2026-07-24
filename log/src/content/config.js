import { defineCollection, z } from "astro:content";


const freeNotesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    maturity: z.enum(['seedling', 'budding', 'evergreen']).optional(), // How developed is this thought?
    relatedNotes: z.array(z.string()).optional(), // Connect ideas
    confidence: z.enum(['speculation', 'hypothesis', 'conviction']).optional(),
    series: z.union([
        z.string(),
        z.object({
            name: z.string(),
            order: z.number().optional()
        })
    ]).optional(), // Group notes into a series/cluster
    description: z.string().optional(),
  })
});

const projectLogsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    project: z.string(),  // Which project?
    date: z.date(),
    status: z.enum(['in-progress', 'mvp', 'iterating', 'vision']).optional(),
    kicker: z.string().optional(),
    pinned: z.boolean().optional(),
    description: z.string().optional(),
    // Build diary, decision logs, progress updates
  })
});

const deepDivesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    project: z.string().optional(),  // Which project does this deep dive belong to? Powers the portfolio hub.
    stack: z.array(z.string()).optional(),
    difficulty: z.enum(['Intermediate', 'Advanced']).optional(),
  })
});

const projectsCollection = defineCollection({
  schema: z.object({
    name: z.string(),            // Must match the `project` field used in projectLogs / deepDives.
    tagline: z.string(),         // One-line value proposition.
    summary: z.string(),         // 1–2 sentences for the portfolio card.
    status: z.enum(['live', 'mvp', 'building', 'vision', 'archived']).optional(),
    role: z.string().optional(),   // e.g. "Co-founder & Engineer"
    year: z.string().optional(),   // e.g. "2026"
    stack: z.array(z.string()).optional(),
    accent: z.enum(['blue', 'emerald', 'violet', 'amber']).optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),  // Lower = earlier in the portfolio.
  })
});

const systemCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().optional(),
    type: z.string(),
    canonical: z.string().optional(),
  })
})

export const collections = {
    freeNotes: freeNotesCollection,
    projectLogs: projectLogsCollection,
    system: systemCollection,
    deepDives: deepDivesCollection,
    projects: projectsCollection,
}