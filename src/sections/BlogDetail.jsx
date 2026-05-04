"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BLOGS } from "@/data/blogs";
import LikeButton from "@/components/blog/LikeButton";
import ShareMenu from "@/components/blog/ShareMenu";

const BlogDetail = ({ blog }) => {
  // Find prev/next blogs for footer navigation
  const currentIndex = BLOGS.findIndex((b) => b.slug === blog.slug);
  const prevBlog = currentIndex > 0 ? BLOGS[currentIndex - 1] : null;
  const nextBlog = currentIndex < BLOGS.length - 1 ? BLOGS[currentIndex + 1] : null;

  return (
    <article className="relative z-2 px-6 sm:px-10 pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-10"
        >
          <Link href="/" className="hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blogs" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-white transition-colors cursor-pointer">{blog.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-300 truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-md border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold tracking-wider uppercase mb-5">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-5">
            {blog.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {blog.description}
          </p>
        </motion.div>

        {/* Author Info & Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-white/10 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-violet-600/20 border border-white/10">
              {blog.authorImage ? (
                <img src={blog.authorImage} alt={blog.authorName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-violet-500" />
              )}
            </div>
            <div>
              <div className="font-semibold text-white mb-0.5">{blog.authorName}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <span>{blog.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <LikeButton slug={blog.slug} />
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm font-medium text-gray-400">
                Share:
              </span>
              <ShareMenu title={blog.title} />
            </div>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full aspect-[2/1] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-12 relative border border-white/10 bg-[#0a0a0a]"
        >
          {blog.image ? (
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${blog.accent} opacity-20`} />
          )}
          {/* Faux icon if no image */}
          {!blog.image && (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <span className="text-7xl">✍️</span>
            </div>
          )}
        </motion.div>

        {/* Markdown Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-invert prose-violet max-w-none mb-20 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300 prose-img:rounded-xl prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-xl"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl mt-10 mb-5 border-b border-white/10 pb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl mt-8 mb-4" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-6" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-violet-500 pl-5 py-2 my-8 bg-violet-500/5 text-gray-300 italic rounded-r-lg" {...props} />
              ),
              pre: ({node, ...props}) => <>{props.children}</>,
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                if (!match) {
                  return <code className="bg-white/10 text-violet-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
                }
                return (
                  <div className="relative group my-6">
                    <pre className="p-4 rounded-xl overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed bg-[#0a0a0f] border border-white/10">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                    <button className="absolute top-3 right-3 p-1.5 rounded bg-white/10 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/20 transition-all text-xs border border-white/10">
                      Copy
                    </button>
                  </div>
                );
              },
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </motion.div>

      </div>
    </article>
  );
};

export default BlogDetail;
