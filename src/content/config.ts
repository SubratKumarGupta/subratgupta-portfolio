import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    discerption: z.string(),
    author: z.enum(["subrat gupta"]),
    date: z.date(),
    draft: z.boolean(),
    tags: z.array(z.string()),
    //   image: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blog,
};
