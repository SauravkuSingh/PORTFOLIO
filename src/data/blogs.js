export const BLOGS = [
  {
    slug: "react-nextjs-tips",
    title: "5 React & Next.js tips every developer should know",
    description:
      "Practical patterns I've learned building production apps — from Server Components to metadata fixes that actually impact your SEO.",
    category: "Next.js",
    date: "May 1, 2026",
    readTime: "5 min read",
    authorName: "Saurav Singh",
    authorImage: "/assets/profile.webp",
    image: "/assets/blogs/react-nextjs-tips-cover.webp", // 👈 Added the AI generated image here
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
    content: `
After building production apps with React and Next.js for several years, I've collected a handful of tips that I wish someone had told me earlier. These aren't just "use useCallback everywhere" advice — these are practical patterns that actually make a difference.

## 1. Stop putting everything in useEffect

Most developers reach for \`useEffect\` for data fetching, but in Next.js App Router you should fetch data directly in Server Components instead. This means zero loading spinners, zero client-side waterfalls, and better SEO.

\`\`\`jsx
// Instead of this in a client component:
useEffect(() => { fetch('/api/data')... }, [])

// Do this in a Server Component:
const data = await fetch('https://api.example.com/data')
\`\`\`

## 2. Use "use client" only where you need it

A common mistake is adding \`"use client"\` to your page files. This silently breaks \`metadata\` exports — Google sees no title or description. Keep page files as Server Components, and push \`"use client"\` down to the leaf components that actually need interactivity.

\`\`\`jsx
// page.jsx — NO "use client" here
export const metadata = { title: 'My Page' }
export default function Page() { return <MyComponent /> }

// MyComponent.jsx — "use client" goes HERE
"use client"
import { useState } from 'react'
\`\`\`

## 3. Always set metadataBase in layout.jsx

If you're using Open Graph images like \`/og-image.png\`, they resolve as relative paths without \`metadataBase\`. Social platforms won't find your image and your link previews will be blank.

\`\`\`jsx
export const metadata = {
  metadataBase: new URL('https://www.yoursite.com'),
  title: 'Your Site',
}
\`\`\`

## 4. Use next/image for every image

The \`Image\` component from \`next/image\` automatically handles lazy loading, WebP conversion, and responsive sizing. Using a plain \`<img>\` tag means you're leaving free performance on the table — which directly hurts your Core Web Vitals and Google rankings.

## 5. Add a sitemap.js and robots.js file

Next.js App Router has built-in support for sitemaps and robots files — no plugins needed. Just create \`src/app/sitemap.js\` and \`src/app/robots.js\`. Remember: \`rules\` must be an array, not an object — a common gotcha that breaks your build.

\`\`\`js
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.yoursite.com/sitemap.xml',
  }
}
\`\`\`

## Conclusion

These five tips cover mistakes I see even experienced developers make. The biggest takeaway: in Next.js App Router, think carefully about what runs on the server vs the client — getting that boundary right unlocks performance and SEO that you simply can't get otherwise.
    `,
  },
];

export const getBlogBySlug = (slug) =>
  BLOGS.find((b) => b.slug === slug) || null;

export const getAllCategories = () => {
  const categories = new Set(BLOGS.map((b) => b.category));
  return ["All Posts", ...Array.from(categories)];
};