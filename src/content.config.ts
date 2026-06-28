import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Standard schema for text-based articles
const standardTextSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDate: z.coerce.date(),
  image: z.string().optional(), 
});

const echoes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/echoes" }),
  schema: standardTextSchema,
});

const interfaceCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/interface" }),
  schema: standardTextSchema,
});

const journeys = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journeys" }),
  schema: standardTextSchema,
});

// Specialized schema for Issues (No author needed, cover image required)
const issues = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/issues" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    image: z.string(),
  }),
});

// Specialized schema strictly for visual art
const canvas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/canvas" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    image: z.string(), 
    medium: z.enum(["Painting", "Photography", "Digital Art", "Mixed Media"]),
  }),
});

export const collections = { echoes, interface: interfaceCollection, journeys, issues, canvas };
