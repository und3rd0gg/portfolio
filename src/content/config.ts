import { glob } from "astro/loaders";
import { z, reference, defineCollection } from "astro:content";

const articles = defineCollection({
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/articles" }),
    schema: ({ image }) => z.object({
        cover: image(),
        coverAlt: z.string(),
        title: z.string(),
        slug: z.string(),
        snippet: z.string().optional(),
        category: z.string(),
        pubDate: z.coerce.date(),
        readingDuration: z.number(),
        originalLink: z.string().url().optional(),
        isDraft: z.boolean().default(false),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Retro Rocket Team'),
        relatedArticles: z.array(reference('articles')).optional(),
    }),
});

const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      link: z.string().url(),
    }),
});


export const collections = { articles, projects };