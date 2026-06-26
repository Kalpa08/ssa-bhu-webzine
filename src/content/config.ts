import { defineCollection, z } from 'astro:content';

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'campus': articleCollection,
  'interface': articleCollection,
  'echoes': articleCollection,
  'dialogues': articleCollection,
  'canvas': articleCollection, // Can be modified later for art specifically
};
EOF
