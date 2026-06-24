import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPageClient } from '@/components/tools/ToolPageClient';
import { tools } from '@/lib/tools-data';
import { toolDescriptions } from '@/lib/tool-descriptions';
import { getSiteUrl } from '@/lib/site-url';
import { getToolKeywords } from '@/lib/tool-seo-keywords';

type Props = { params: Promise<{ slug: string }> };

function getToolSeoData(slug: string) {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) return null;

  const descriptionBlock = toolDescriptions[slug];
  const firstParagraph = descriptionBlock?.paragraphs[0];
  const baseTitle = `${tool.title} | Free Online ${tool.title} Tool`;
  const description = firstParagraph
    ? `${tool.title} online tool. ${firstParagraph}`.slice(0, 160)
    : `${tool.title} online tool by clypio Utility Hub. ${tool.description}`;
  return {
    tool,
    title: baseTitle,
    description,
    keywords: getToolKeywords(slug),
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seoData = getToolSeoData(slug);

  if (!seoData) {
    return { title: 'Tool not found' };
  }

  const baseUrl = getSiteUrl();
  const canonicalUrl = `${baseUrl}/tools/${seoData.tool.slug}`;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      siteName: 'clypio Utility Hub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageClient slug={slug} />;
}
