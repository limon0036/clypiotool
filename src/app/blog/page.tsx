import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | clypio Utility Hub',
  description:
    'Informative articles on password security, typing skills, productivity, QR codes, Markdown, health, and more — from the clypio Utility Hub team.',
};

export default function BlogPage() {
  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-gradient-to-br from-cyan-50/90 via-white to-indigo-50/40">
        <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary">
            Blog
          </p>
          <h1 className="text-3xl font-black tracking-tight text-primary md:text-4xl">
            Tips, guides &amp; insights
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Practical articles to help you work smarter — covering security, productivity,
            typing, marketing, health, and the tools you use every day.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
