import Link from 'next/link';
import { getRelatedPosts } from '@/lib/blog-posts';
import { ArrowRight } from 'lucide-react';

export function RelatedBlogPosts({ toolSlug }: { toolSlug: string }) {
  const posts = getRelatedPosts(toolSlug, 5);
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-cyan-50/50 to-indigo-50/30 p-6 md:p-8">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-4 rounded-lg p-3 -mx-3 hover:bg-white/60 transition-colors"
            >
              <div>
                <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                  {post.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-secondary mt-1 transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-secondary hover:underline"
      >
        View all articles
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
