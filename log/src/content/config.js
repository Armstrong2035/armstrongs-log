import { defineCollection, z } from "astro:content";


const freeNotesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    maturity: z.enum(['seedling', 'budding', 'evergreen']).optional(), // How developed is this thought?
    relatedNotes: z.array(z.string()).optional(), // Connect ideas
    confidence: z.enum(['speculation', 'hypothesis', 'conviction']).optional(),
    series: z.string().optional(), // Group notes into a series/cluster
  })
});

const projectLogsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    project: z.string(),  // Which project?
    date: z.date(),
    status: z.enum(['in-progress', 'blocked', 'completed']).optional(),
    // Build diary, decision logs, progress updates
  })
});

const systemCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date().optional(),
    type: z.string(),
  })
})

export const collections = {
    freeNotes: freeNotesCollection,
    projectLogs: projectLogsCollection,
    system: systemCollection, 
}