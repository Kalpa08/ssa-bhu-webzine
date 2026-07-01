import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Base schema for shared fields
const baseSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDate: z.coerce.date(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),

  // Add these two new lines:
  issue: reference('issues').optional(), 
  order: z.number().default(99).optional(),
});

const echoes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/echoes" }),
  schema: baseSchema.extend({
    category: z.enum(["Poetry", "Short Story", "Reflective Essay", "Memoir", "Letter", "Translation", "Flash Fiction"]),
  }),
});

const interfaceCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/interface" }),
  schema: baseSchema.extend({
    category: z.enum(["Science", "Technology", "Artificial Intelligence", "Research Stories", "Mathematics", "Philosophy of Science", "Scientific Visualization"]),
  }),
});

const journeys = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journeys" }),
  schema: baseSchema.extend({
    category: z.enum(["Travelogue", "Photo Essay", "Nature Writing", "Cultural Exploration", "Personal Reflection"]),
    location: z.string().optional(),
  }),
});

const canvas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/canvas" }),
  schema: baseSchema.extend({
    category: z.enum(["Photography", "Painting", "Digital Art", "Illustration", "Sketch", "Mixed Media"]),
    location: z.string().optional(),
    image: z.string(), // Overrides base schema to make image required
  }),
});

// Specialized schema strictly for Issues (No tags/categories required)
// Specialized schema strictly for Issues
const issues = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/issues" }),
  schema: z.object({
    issueNumber: z.string(), // Matches CMS
    theme: z.string(),       // Matches CMS
    year: z.string(),        // Matches CMS
    publishDate: z.coerce.date(),
    image: z.string().optional(),
  }),
});

export const collections = { echoes, interface: interfaceCollection, journeys, issues, canvas };
