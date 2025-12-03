import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

/**
 * Frontmatter 里最坑的就是：
 * publishDate:   （空）
 * updatedDate:   （空）
 * 或者 0 / "0" / ""
 * 这些会导致 z.coerce.date() 解析成 Invalid Date 或 epoch(1970)
 * 所以统一先过滤为 undefined。
 */
function normalizeEmptyDate(v: unknown) {
  if (v === '' || v == null) return undefined
  if (v === 0 || v === '0') return undefined
  if (typeof v === 'string' && v.trim() === '') return undefined
  return v
}

const optionalDateSchema = z.preprocess(
  normalizeEmptyDate,
  z.coerce.date().optional()
)

// -------------------- Blog collection --------------------
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        // ✅ 允许缺失/空：workflow 会写回；构建期也不会炸
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
        // ✅ 最终保证 publishDate/updatedDate 都是 Date
        // workflow 写回前：publishDate 缺失 -> new Date() 临时兜底（可能随构建变化）
        // workflow 写回后：publishDate 已固定 -> 不再变化
        const publish = data.publishDate ?? new Date()
        const update = data.updatedDate ?? publish
        return {
          ...data,
          publishDate: publish,
          updatedDate: update
        }
      })
})

// -------------------- Docs collection --------------------
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: () =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        // docs 同样容错（你 workflow 目前只写 blog；docs 将来要写也兼容）
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
