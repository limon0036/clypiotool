'use client';

import { toolContentSections } from '@/lib/tool-content-sections';
import { CheckCircle2, XCircle, HelpCircle, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function SectionBlock({
  id,
  title,
  icon,
  children,
  className,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm',
        className
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          {icon}
        </div>
        <h2 id={`${id}-heading`} className="text-xl md:text-2xl font-bold text-primary leading-snug">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function ToolContentSections({ slug }: { slug: string }) {
  const content = toolContentSections[slug];
  if (!content) return null;

  const { toolName, whyUse, howItWorks, advantages, disadvantages } = content;

  return (
    <div
      className="mt-16 w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
      aria-label={`Detailed guide for ${toolName}`}
    >
      <SectionBlock
        id={`why-use-${slug}`}
        title={`Why use the ${toolName}?`}
        icon={<HelpCircle className="h-5 w-5" />}
      >
        <div className="space-y-4">
          {whyUse.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id={`how-it-works-${slug}`}
        title="How it works"
        icon={<Settings2 className="h-5 w-5" />}
      >
        <ol className="space-y-5">
          {howItWorks.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock
        id={`advantages-${slug}`}
        title="What are its advantages?"
        icon={<CheckCircle2 className="h-5 w-5" />}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {advantages.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        id={`disadvantages-${slug}`}
        title="What are its disadvantages?"
        icon={<XCircle className="h-5 w-5" />}
      >
        <ul className="space-y-3">
          {disadvantages.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
              <XCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>
    </div>
  );
}
