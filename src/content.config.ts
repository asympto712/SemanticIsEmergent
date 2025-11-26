// import utilities
// z is for Zod used for type validation
import { defineCollection, z } from 'astro:content';

// import loaders
import {glob, file} from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/pages/posts/"}),
});

export const collections = { blog };
