import { getBlogBySlug, BLOGS } from "@/data/blogs";
import BlogDetail from "@/sections/BlogDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} – Saurav Singh`,
    description: blog.description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
