

import Blogs from "@/sections/Blogs";

export const metadata = {
  title: 'Blog – Saurav Singh | Web Development Articles',
  description: 'Articles on React, Next.js, Node.js and full stack development by Saurav Singh.',
  alternates: {
    canonical: '/blogs',
  },
}

export default function BlogsPage() {
  return <Blogs />;
}
