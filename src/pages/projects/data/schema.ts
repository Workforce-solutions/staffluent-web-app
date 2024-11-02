// src/pages/projects/data/schema.ts
import { z } from 'zod'

export const projectSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: z.enum(['active', 'completed', 'on hold']),
    progress: z.number(),
    team: z.array(z.object({
        name: z.string(),
        avatar: z.string()
    })),
})

export type Project = z.infer<typeof projectSchema>