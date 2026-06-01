import Link from 'next/link';
import { tools } from '@/lib/tools-data';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OtherToolsNav({ currentSlug }: { currentSlug: string }) {
  const otherTools = tools.filter((tool) => tool.slug !== currentSlug);

  return (
    <nav className="mt-12 w-full" aria-label="Other tools">
      <h2 className="text-lg md:text-xl font-bold text-primary mb-4">
        Explore more tools
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {otherTools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={`/tools/${tool.slug}`}
              className={cn(
                'group flex items-start gap-3 rounded-xl p-4 w-full',
                'hover:bg-muted/50 transition-colors'
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                  tool.color
                )}
              >
                {tool.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-1 font-semibold text-primary group-hover:text-secondary transition-colors">
                  {tool.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
                <span className="block text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {tool.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
