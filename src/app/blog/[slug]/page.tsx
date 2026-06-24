import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { ContentPageLayout, ContentSection } from '@/components/ContentPageLayout';
import { Calendar, Clock, ArrowLeft, Wrench } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: `${post.title} | clypio Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ContentPageLayout
      eyebrow="Blog"
      title={post.title}
      description={post.excerpt}
    >
      <div className="flex flex-wrap items-center gap-4 -mt-4 mb-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {post.sections.map((section) => (
        <ContentSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ContentSection>
      ))}

      {post.relatedToolSlug && (
        <section className="rounded-xl border border-border/60 bg-muted/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-secondary" />
            <p className="font-semibold text-foreground">Try the related tool</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Put what you learned into practice with our free online tool.
          </p>
          <Link
            href={`/tools/${post.relatedToolSlug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
          >
            Open tool
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </section>
      )}

      <div className="pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </div>
    </ContentPageLayout>
  );
}
