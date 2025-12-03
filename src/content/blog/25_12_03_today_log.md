---
updatedDate: '2025-12-04T00:27:15+08:00'
title: 2025-12-03 Today Log
description: Record today's log
publishDate: '2024-07-26T16:44:14+08:00'
tags:
  - Today_log
  - pubData
language: 中文
slug: 25_12_13_today_log
---
## 🛠️ The Record of today's log
  
记录一下今日日志  
  
将博客整理了一下   
具体活动如下：  
###1. 修改了博客的一些构造 如：  
   将原来的 route 路由 archive 修改成了 projects （本来就是projects 算是拨乱反正  
###2. 写了两篇 blog  （目前是两篇 但其实还有一些想写的东西 暂时先按下不表  
###3. 修改了 signature 的 bug  
   详情见 [Worry_Signature](https://blog.deepl.win/blog/Worry_Signature)  
###4. 也算是初次尝试 （其实昨天已经尝试了  
   在 GitHub 上写 日志 博客  
   对于其构造也很熟练了  
   以后仍会坚持写 （希望如此  
###5. 对于 Github 上写 blog 的格式  
   做一些修改  
   将在接下来阐述 并不但做一章了  

   
   对于 blog 的标题部分的格式 做了一些完善
   
```
这是标题格式
---
title: 2025-12-03 Today Log
description: Record today's log
publishDate: 
updatedDate: 2025-12-03T20:34:58+08:00
tags:
  - Today_log
  - pubData
language: 中文
slug: 25_12_13_today_log
---
```
对于其中的 publishData 和 updataData  
在原来的场景中 只能用作手动输入  

而我希望能够自动生成时间表示  

于是再经过查询 ChatGPT 之后  
提出了修改 /src/content.config.ts 文件  
给出如下代码  

```/src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

// 允许：缺失 / "" / null -> fallback
const publishDateSchema = z.preprocess(
  (v) => (v === "" || v == null ? new Date() : v),
  z.coerce.date()
);

const optionalDateSchema = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.coerce.date().optional()
);

// Define blog collection
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        publishDate: publishDateSchema,
updatedDate: 2025-12-03T20:34:58+08:00

        heroImage: z
          .object({
            src: image(),
            alt: z.string().optional(),
            inferSize: z.boolean().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            color: z.string().optional(),
          })
          .optional(),

        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        language: z.string().optional(),
        draft: z.boolean().default(false),
        comment: z.boolean().default(true),
        slug: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
updatedDate: 2025-12-03T20:34:58+08:00
      })),
});

// Define docs collection
const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z
      .object({
        title: z.string().max(60),
        description: z.string().max(1600),

        publishDate: publishDateSchema,
updatedDate: 2025-12-03T20:34:58+08:00

        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        draft: z.boolean().default(false),
        order: z.number().default(999),
      })
      .transform((data) => ({
        ...data,
updatedDate: 2025-12-03T20:34:58+08:00
      })),
});

export const collections = { blog, docs };
```

源代码我将在下面进行标注  

```bash
schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
updatedDate: 2025-12-03T20:34:58+08:00
...  

```

将 publishDate 改为不填写也能获取到当前时间  
updataDate 则改为自动记录  
  
当然修改完成以后  
还没进行测试  
此日志也将作为测试的一部分  
  

结果：
<img width="625" height="747" alt="截屏2025-12-03 17 51 00" src="https://github.com/user-attachments/assets/c550cc35-6942-409b-b8c3-31a0f7b687ff" />
首次表现结果成功  
但时间是 GMT（格林尼治标准时间）  
不是北京时间  
  
进行修改  
在我查完 GPT 之后发现了一个棘手的问题  
页面暂且按下不表  
若是修改 rss 中的时间 则波及范围太广  
暂时不进行 rss 的修改  
之后📎附件将提出 GPT 对话  
  
那么现在问题就是  
在 blog 中  
具体时间是不显示的  
只显示日期  
那么我对于测试的结果只能依靠于 rss  
这显然是不优越的  

我将进行修改  
###6.修改全局的具体时间显示


在修改了很多地方之后
经过大费周章的询问排查


```/utils/data.ts 原文本
-
import config from 'virtual:config'

const dateFormat = new Intl.DateTimeFormat(config.locale.dateLocale, config.locale.dateOptions)

export function getFormattedDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) {
  if (typeof options !== 'undefined') {
    return new Date(date).toLocaleDateString(config.locale.dateLocale, {
      ...(config.locale.dateOptions as Intl.DateTimeFormatOptions),
      ...options
    })
  }

  return dateFormat.format(new Date(date))
}
```


```/utils/data.ts 修改后的
import config from 'virtual:config'

export function getFormattedDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) {
  const d = new Date(date)

  const fmt = new Intl.DateTimeFormat(config.locale.dateLocale, {
    ...(config.locale.dateOptions as Intl.DateTimeFormatOptions),
    ...(options ?? {})
  })

  return fmt.format(d)
}

```

```site-config.ts
  locale: {
    lang: 'en-US',
    attrs: 'en_US',

    // ✅ 显示用中文/北京时间（你也可以改回 en-US）
    dateLocale: 'zh-CN',

    // ✅ 默认显示：YYYY/MM/DD HH:mm（由 locale 决定分隔符）
    dateOptions: {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
      // second: '2-digit', // 想显示秒就打开
    }
  },
```


###7. 修改 rss 中的链接错误  
    因为是 fork 的别人的代码  
    所以其中的固定域名链接是别人的  
    正确的修改文件在 astro.config.ts 文件中
    将
  ```bash
    export default defineConfig({
  // Top-Level Options
  site: 'https://deepl.win',
  // base: '/docs',
  trailingSlash: 'never',
  ```
与
```bash
server: {
    host: true,
    allowedHosts: ['deepl.win']
  },
```
改回来即可  
  
还有一个致命问题  
###8. 发布时间是会改变的
    发布时间和修改时间是一个时间
    一直是最后提交时间

修改
1.
```修改 content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  return Array.from(new Set(lowercaseItems));
}

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(1600),

      // ✅ 必须写在 frontmatter，才能“固定不变”
      publishDate: z.coerce.date(),

      // 可选：你想显示“更新”就写，不写就不显示
updatedDate: 2025-12-03T20:34:58+08:00

      heroImage: z.object({
        src: image(),
        alt: z.string().optional(),
        inferSize: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        color: z.string().optional(),
      }).optional(),

      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      comment: z.boolean().default(true),
      slug: z.string().optional(),
    }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(1600),
      publishDate: z.coerce.date(),
updatedDate: 2025-12-03T20:34:58+08:00
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      draft: z.boolean().default(false),
      order: z.number().default(999),
    }),
});

export const collections = { blog, docs };
```
从这一刻起：你如果没写 publishDate，构建会报错，强制你把发布时间“写死”。  
即 第一次可以不写入  
不写入则按照下面2.GitHub Actions：在“发布/合并那一刻”自动写入 publishDate（只写一次）写入当前时间  
但是  
之后进行更新  
则不写入会构建报错  强行让你写  
  
  
2.GitHub Actions：在“发布/合并那一刻”自动写入 publishDate（只写一次）

新建：.github/workflows/stamp-publishdate.yml

这份会做：

对本次 push 改动到的文章文件：

如果 frontmatter 没有 publishDate：插入一次（用 UTC ISO，最标准）

如果已经有：不改（所以永久固定）

updatedDate：我给你两个版本，你选其一

A：每次改动都刷新 updatedDate

B：完全不碰 updatedDate（手动维护）

先给你 B（只固定 publishDate，不动 updatedDate），最符合“发布后不变”的诉求：
```新建：.github/workflows/stamp-publishdate.yml
name: Stamp publishDate once

on:
  workflow_dispatch:
  push:
    paths:
      - "src/content/blog/**/*.md"
      - "src/content/blog/**/*.mdx"

permissions:
  contents: write

jobs:
  stamp:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Stamp publishDate into frontmatter (once)
        shell: bash
        run: |
          set -euo pipefail

          NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

          CHANGED=$(git diff --name-only ${{ github.event.before }} ${{ github.sha }} -- \
            "src/content/blog/**/*.md" "src/content/blog/**/*.mdx" || true)

          if [ -z "$CHANGED" ]; then
            echo "No changed blog posts."
            exit 0
          fi

          for FILE in $CHANGED; do
            echo "Processing $FILE"

            # 没有 frontmatter 就加一个
            if ! head -n 1 "$FILE" | grep -q '^---$'; then
              tmp=$(mktemp)
              {
                echo "---"
                echo "publishDate: $NOW"
                echo "---"
                cat "$FILE"
              } > "$tmp"
              mv "$tmp" "$FILE"
              continue
            fi

            # frontmatter 内已存在 publishDate 就跳过（只写一次）
            if awk '
              NR==1 {in=($0=="---"); next}
              in==1 && $0=="---" {exit 0}
              in==1 && $0 ~ /^publishDate:/ {found=1}
              END {exit(found?0:1)}
            ' "$FILE"; then
              echo "publishDate exists, skip."
              continue
            fi

            # 在 frontmatter 结束 --- 之前插入 publishDate
            tmp=$(mktemp)
            awk -v now="$NOW" '
              NR==1 {print; in=1; next}
              in==1 && $0=="---" {print "publishDate: " now; print; in=0; next}
              {print}
            ' "$FILE" > "$tmp"
            mv "$tmp" "$FILE"
          done

      - name: Commit changes (if any)
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          git diff --cached --quiet || git commit -m "chore: stamp publishDate"
          git push

```
这样你“第一次 push 文章”就会自动写入 publishDate 并提交回仓库，之后不再变化。



## 附件

The End.  
