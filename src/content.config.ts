import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// We define the blueprint once to keep the code clean
const articleSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDate: z.date(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

// We apply the blueprint to each section of your magazine
export const collections = {
  'campus': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/campus" }),
    schema: articleSchema
  }),
  'interface': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/interface" }),
    schema: articleSchema
  }),
  'echoes': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/echoes" }),
    schema: articleSchema
  }),
  'dialogues': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/dialogues" }),
    schema: articleSchema
  }),
  'canvas': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/canvas" }),
    schema: articleSchema
  }),
};
