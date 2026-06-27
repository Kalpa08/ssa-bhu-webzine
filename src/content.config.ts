import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Updated schema to accept optional cover images!
const standardTextSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDate: z.coerce.date(),
  image: z.string().optional(), 
});

// A reusable schema for all our text-based articles
const standardTextSchema = z.object({
  title: z.string(),
  author: z.string(),
  pstandardTextSchemaublishDate: z.coerce.date(),
});

const campus = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/campus" }),
  schema: standardTextSchema,
});

const echoes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/echoes" }),
  schema: standardTextSchema,
});

const interfaceCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/interface" }),
  schema: standardTextSchema,
});

const dialogues = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/dialogues" }),
  schema: standardTextSchema,
});

// A specialized schema strictly for visual art
const canvas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/canvas" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    image: z.string(), // Requires an image path
    medium: z.enum(["Painting", "Photography", "Digital Art", "Mixed Media"]),
  }),
});

export const collections = {
  campus,
  echoes,
  interface: interfaceCollection,
  dialogues,
  canvas,
};
