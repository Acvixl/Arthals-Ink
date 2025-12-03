import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

function normalizeEmptyDate(v: unknown) {
  // 防止 "" / null / undefined / 0 / "0" 被 z.coerce.date() 转成 1970
  if (v === '' || v == null) return undefined
  if (v === 0 || v === '0') return undefined
  if (typeof v === 'string' && v.trim() === '') return undefined
  return v
}

const optionalDateSchema = z.preprocess(
  normalizeEmptyDate,
  z.coerce.date().optional()
)

// Define blog collection
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        // ✅ 允许不写：Action 会写回；写回前也不让构建挂
        publishDate: optionalDateSchema,
        updatedDate: optionalDateSchema,

        heroImage: z
          .object({
            src: image(),
            alt: z.string().optional(),
            inferSize: z.boolean().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            color: z.string().optional()
          })
          .optional(),

        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        language: z.string().optional(),
        draft: z.boolean().default(false),
        comment: z.boolean().default(true),
        slug: z.string().optional()
      })
      .transform((data) => {
        // ✅ 在脚本写回前的兜底：避免 undefined/1970 导致页面或 TS 报错
        const publish = data.publishDate ?? new Date()
        const update = data.updatedDate ?? publish
        return {
          ...data,
          publishDate: publish,
          updatedDate: update
        }
      })
})

// Define docs collection
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        publishDate: optionalDateSchema,
        updatedDate: optionalDateSchema,

        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        draft: z.boolean().default(false),
        order: z.number().default(999)
      })
      .transform((data) => {
        const publish = data.publishDate ?? new Date()
        const update = data.updatedDate ?? publish
        return {
          ...data,
          publishDate: publish,
          updatedDate: update
        }
      })
})

export const collections = { blog, docs }
