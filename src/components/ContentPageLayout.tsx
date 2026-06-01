import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "June 1, 2026";

type ContentPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  /** No hero gradient background (e.g. user guide). */
  plain?: boolean;
};

export function ContentPageLayout({
  eyebrow,
  title,
  description,
  children,
  plain = false,
}: ContentPageLayoutProps) {
  return (
    <div className="w-full">
      <section
        className={cn(
          "border-b border-border/60",
          !plain && "bg-gradient-to-br from-cyan-50/90 via-white to-indigo-50/40"
        )}
      >
        <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-black tracking-tight text-primary md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-06-01">{LAST_UPDATED}</time>
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
        <article className="space-y-10 md:space-y-12">{children}</article>

        <footer className="mt-12 border-t border-border/60 pt-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Questions about these policies? Email{" "}
            <a
              href="mailto:support@clypio.com"
              className="font-medium text-secondary hover:underline"
            >
              support@clypio.com
            </a>
            . You may also review our{" "}
            <Link href="/terms" className="font-medium text-secondary hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-secondary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

type ContentSectionProps = {
  title: string;
  children: ReactNode;
};

export function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-primary md:text-2xl">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export function ContentList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
