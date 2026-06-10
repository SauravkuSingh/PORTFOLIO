export const BLOGS = [
  {
    slug: "tailwind-css-vs-bootstrap",
    title: "Tailwind CSS vs Bootstrap: Which Should You Choose?",
    description:
      "Utility-first vs component framework — a practical, side-by-side look at how Tailwind CSS and Bootstrap differ, and which one actually fits your next project.",
    category: "CSS",
    date: "June 10, 2026",
    readTime: "6 min read",
    authorName: "Saurav Singh",
    authorImage: "/assets/profile.webp",
    image: "/assets/blogs/blog2.png",
    imageFit: "contain", // wide banner — show whole image instead of cropping
    accent: "from-cyan-400 via-teal-500 to-emerald-600",
    content: `
Both Tailwind CSS and Bootstrap promise to make styling faster — but they take opposite approaches to get there. I've shipped production apps with both, so here's an honest, side-by-side breakdown to help you pick the right one.

## The core difference: utility-first vs component-first

**Bootstrap** is a *component framework*. It ships ready-made components — buttons, cards, navbars, modals — that you drop in with a class name. You get a polished look out of the box.

**Tailwind CSS** is a *utility-first framework*. It gives you tiny, single-purpose classes (\`flex\`, \`pt-4\`, \`text-center\`) that you compose to build any design. There are no pre-built components — you assemble them yourself.

The same button tells the whole story:

\`\`\`html
<!-- Bootstrap: a named component -->
<button class="btn btn-primary">Save</button>

<!-- Tailwind: composed from utilities -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Save
</button>
\`\`\`

## 1. Speed vs control

Bootstrap is faster to *start* with — one class and you have a styled button. Tailwind is faster to *customize* — you're never fighting opinionated defaults or writing \`!important\` overrides to escape them.

If you've ever spent an afternoon trying to make a Bootstrap card look "not like Bootstrap," you already understand Tailwind's appeal.

## 2. Bundle size & performance

This one's decisive. Tailwind scans your files and strips every class you don't use, so production CSS is often **under 10 KB**. Bootstrap ships its full stylesheet unless you manually customize the build.

\`\`\`bash
# Tailwind's production CSS after purging unused classes
~8-10 KB

# Bootstrap's default bundle
~25 KB+ (plus its JS for interactive components)
\`\`\`

## 3. Design freedom

Bootstrap sites tend to *look like Bootstrap* — recognizable buttons, spacing, and that familiar blue. That's fine for dashboards and internal tools where consistency beats originality.

Tailwind imposes no visual identity. Your design system lives in \`tailwind.config.js\`, so two Tailwind sites can look nothing alike. For a unique brand or portfolio, that freedom matters.

## 4. The learning curve

Bootstrap is easier on day one — memorize a few component classes and you're productive. Tailwind feels verbose at first ("why is my HTML full of classes?"), but once the utility names click, you stop context-switching between your HTML and CSS files entirely.

Tip: pair Tailwind with its IntelliSense extension and extract repeated markup into components (or use \`@apply\` and \`tailwind-merge\`) to keep things clean.

## When to choose which

**Reach for Bootstrap when:**
- You need a prototype or admin panel *today*
- Your team isn't comfortable hand-building UI
- A consistent, conventional look is acceptable

**Reach for Tailwind when:**
- You want a custom, on-brand design
- Performance and small bundles matter
- You're building with a component framework like React or Next.js

## The verdict

There's no universal winner — but the industry has clearly shifted toward utility-first. Bootstrap is still a great choice for quick, conventional UIs, while Tailwind wins for custom designs, performance, and modern component-based apps.

My rule of thumb: **Bootstrap to ship something fast, Tailwind to build something that's yours.** For nearly every project I start today, that's Tailwind.
    `,
  },
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