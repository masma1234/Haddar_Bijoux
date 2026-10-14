import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const translated = z.object({fr:z.string().min(1), ar:z.string().min(1)});
const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: ({ image }) => z.object({
    order: z.number(), category: z.enum(['classic','personalized','matching','earrings','necklaces','all']),
    title: translated, subtitle: translated, alt: translated,
    image: image().optional(), credit: z.string(), rights: z.string(),
    isPlaceholder: z.boolean(), hero: z.boolean().default(false),
  }).superRefine((data, ctx) => {
    if (data.image && (!data.credit.trim() || !data.rights.trim() || /CONFIRMER/.test(data.credit + data.rights))) ctx.addIssue({code:'custom',message:'Real images require confirmed credit and rights.'});
    if (Boolean(data.image) === data.isPlaceholder) ctx.addIssue({code:'custom',message:'Set isPlaceholder=false when adding an image; true when no image exists.'});
  }),
});
export const collections = { products };
