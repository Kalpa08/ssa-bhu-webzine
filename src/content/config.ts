import { z, defineCollection } from 'astro:content';

// 1. The Base Blueprint
// Every article across the magazine shares these core attributes.
// We define it once to keep our codebase DRY (Don't Repeat Yourself).
const baseSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDate: z.date(),
  // The cover image is optional, but if provided, must be a string path
  coverImage: z.string().optional(),
  // Enforcing a strict character limit ensures our UI cards never break their layout
  excerpt: z.string().max(160, "Keep the excerpt under 160 characters for UI consistency."),
});

// 2. Defining the Standard Collections
// These sections will strictly follow the base schema.
const campusCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const interfaceCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const echoesCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const dialoguesCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

// 3. Defining the Specialized 'Canvas' Collection
// The Fine Arts gallery requires specific metadata that standard articles do not.
const canvasCollection = defineCollection({
  type: 'content',
  // We extend the base schema, adding mandatory rules specific to artwork
  schema: baseSchema.extend({
    medium: z.string({
      required_error: "A Medium (e.g., 'Oil on Canvas', 'Digital') is strictly required for the Canvas gallery.",
    }),
    // Dimensions might not exist for digital art, so we make it optional
    dimensions: z.string().optional(), 
  }),
});

// 4. Exporting the Matrix
// We register these collections with Astro so they can be queried globally.
export const collections = {
  'campus': campusCollection,
  'interface': interfaceCollection,
  'echoes': echoesCollection,
  'dialogues': dialoguesCollection,
  'canvas': canvasCollection,
};
