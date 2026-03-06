import { z, defineCollection } from 'astro:content';

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  duration: z.number().optional(),
  tags: z.array(z.string()).optional(),
  sharedWith: z.array(z.string()).optional(),
  sharedConcepts: z.array(z.string()).optional(),
  icon: z.string().optional(),
  certifications: z.array(z.string()).optional(),
});

export const collections = {
  programming: defineCollection({ schema: lessonSchema }),
  cloud:       defineCollection({ schema: lessonSchema }),
  cicd:        defineCollection({ schema: lessonSchema }),
  data:        defineCollection({ schema: lessonSchema }),
  networking:  defineCollection({ schema: lessonSchema }),
};