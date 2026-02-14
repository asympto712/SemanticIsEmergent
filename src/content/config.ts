// import utilities
// z is for Zod used for type validation
import { defineCollection, z } from 'astro:content';

// // import loaders
// import {glob, file} from 'astro/loaders';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({image}) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      pubDate: z.coerce.date(),
      lang: z.string(),
      lastUpdate: z.optional(z.coerce.date()),
    }),
});

export const collections = { blog: blogCollection };
