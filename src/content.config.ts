import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared frontmatter schema for both blog sections.
const postSchema = ({ image }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
	});

// Gaming section — dev logs, reviews, behind-the-scenes.
const gaming = defineCollection({
	loader: glob({ base: './src/content/gaming', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

// Writing section — fiction, story craft, Neridia/EverThawe.
const writing = defineCollection({
	loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

export const collections = { gaming, writing };
