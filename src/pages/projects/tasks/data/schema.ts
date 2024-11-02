// src/pages/projects/data/schema.ts
import { z } from 'zod'

const timeEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  duration: z.number(),
  description: z.string(),
})

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  project: z.string(),
  assignee: z.string().nullable(),
  timeEntries: z.array(timeEntrySchema).optional(),
})

export type Task = z.infer<typeof taskSchema>