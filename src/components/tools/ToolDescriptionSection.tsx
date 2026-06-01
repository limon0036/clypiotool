'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toolDescriptions } from '@/lib/tool-descriptions';
import { toolDescriptionImages, type ToolDescriptionImage } from '@/lib/tool-description-images';
import { cn } from '@/lib/utils';

function getFallbackSrc(slug: string, index: number) {
  return `https://picsum.photos/seed/${slug}-example-${index}/600/360`;
}

function InlineExampleImage({
  image,
  slug,
  index,
  className,
}: {
  image: ToolDescriptionImage;
  slug: string;
  index: number;
  className?: string;
}) {
  const [src, setSrc] = useState(image.src);

  return (
    <figure className={cn('w-full flex flex-col flex-1 min-h-0', className)}>
      <div className="relative w-full flex-1 min-h-[180px] md:min-h-[200px] overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => {
            const fallback = getFallbackSrc(slug, index);
            if (src !== fallback) setSrc(fallback);
          }}
        />
      </div>
      <figcaption className="mt-2 text-sm text-muted-foreground leading-snug shrink-0">
        {image.caption}
      </figcaption>
    </figure>
  );
}

function TextBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-0 p-5 md:p-6 flex items-center justify-center">
      <p className="text-muted-foreground text-base leading-relaxed w-full">{children}</p>
    </div>
  );
}

function DescriptionRow({
  slug,
  imageIndex,
  text,
  images,
  imageFirst,
}: {
  slug: string;
  imageIndex: number;
  text: string;
  images: ToolDescriptionImage[];
  imageFirst: boolean;
}) {
  const imageColumn = (
    <div className="w-full md:w-1/2 flex flex-col min-h-0">
      <ImageCell slug={slug} index={imageIndex} images={images} fallbackText={text} />
    </div>
  );
  const textColumn = (
    <div className="w-full md:w-1/2 flex flex-col min-h-0">
      <TextBlock>{text}</TextBlock>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-stretch">
      {imageFirst ? (
        <>
          {imageColumn}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {imageColumn}
        </>
      )}
    </div>
  );
}

function ImageCell({
  slug,
  index,
  images,
  fallbackText,
}: {
  slug: string;
  index: number;
  images: ToolDescriptionImage[];
  fallbackText: string;
}) {
  const image = images[index];
  if (!image) {
    return <TextBlock>{fallbackText}</TextBlock>;
  }
  return <InlineExampleImage image={image} slug={slug} index={index} />;
}

function PairBlock({
  slug,
  indexA,
  indexB,
  paragraphs,
  images,
  imageFirstRow,
}: {
  slug: string;
  indexA: number;
  indexB: number;
  paragraphs: string[];
  images: ToolDescriptionImage[];
  imageFirstRow: boolean;
}) {
  return (
    <div className="w-full space-y-6 md:space-y-8">
      <DescriptionRow
        slug={slug}
        imageIndex={indexA}
        text={paragraphs[indexA]}
        images={images}
        imageFirst={imageFirstRow}
      />
      <DescriptionRow
        slug={slug}
        imageIndex={indexB}
        text={paragraphs[indexB]}
        images={images}
        imageFirst={!imageFirstRow}
      />
    </div>
  );
}

export function ToolDescriptionSection({ slug }: { slug: string }) {
  const content = toolDescriptions[slug];
  const images = toolDescriptionImages[slug] ?? [];
  if (!content) return null;

  const blocks: { first: number; second: number | null }[] = [];
  for (let i = 0; i < content.paragraphs.length; i += 2) {
    blocks.push({
      first: i,
      second: i + 1 < content.paragraphs.length ? i + 1 : null,
    });
  }

  return (
    <section
      className="mt-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
      aria-labelledby={`tool-about-${slug}`}
    >
      <h2
        id={`tool-about-${slug}`}
        className="text-xl md:text-2xl font-bold text-primary mb-8 leading-snug"
      >
        {content.heading}
      </h2>

      <div className="w-full space-y-12">
        {blocks.map((block, blockIndex) => {
          if (block.second === null) {
            return (
              <DescriptionRow
                key={block.first}
                slug={slug}
                imageIndex={block.first}
                text={content.paragraphs[block.first]}
                images={images}
                imageFirst
              />
            );
          }

          return (
            <PairBlock
              key={block.first}
              slug={slug}
              indexA={block.first}
              indexB={block.second}
              paragraphs={content.paragraphs}
              images={images}
              imageFirstRow={blockIndex % 2 === 0}
            />
          );
        })}
      </div>
    </section>
  );
}
