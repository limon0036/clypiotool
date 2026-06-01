import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentList,
  ContentPageLayout,
  ContentSection,
} from "@/components/ContentPageLayout";
import {
  generalUsageNotes,
  quickStartSteps,
  toolGuides,
} from "@/lib/site-user-guide";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "User Guide | clypio Utility Hub",
  description:
    "Step-by-step instructions for using every tool on clypio Utility Hub.",
};

export default function UserGuidePage() {
  return (
    <ContentPageLayout
      plain
      eyebrow="User guide"
      title="How to use clypio Utility Hub"
      description="Complete instructions for navigating the site and getting the best results from every online tool."
    >
      <ContentSection title="Getting started on the site">
        <p>
          clypio Utility Hub is free to use in your browser. Follow these general steps before
          diving into individual tools:
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          {quickStartSteps.map((step, index) => (
            <li key={step.title}>
              <span className="font-semibold text-foreground">
                {index + 1}. {step.title}
              </span>
              <span className="block mt-1">{step.description}</span>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection title="General tips">
        <ContentList items={[...generalUsageNotes]} />
      </ContentSection>

      <ContentSection title="Finding tools">
        <ContentList
          items={[
            "Home page — browse popular tools and open any card to start.",
            "Service menu (header) — dropdown list of all utilities on desktop.",
            "Mobile menu — tap the menu icon for Home, About, and the full tool list.",
            "Tool pages — use on-page navigation to switch to related tools without returning home.",
          ]}
        />
        <p>
          Return to the{" "}
          <Link href="/" className="font-medium text-secondary hover:underline">
            home page
          </Link>{" "}
          anytime to explore new utilities.
        </p>
      </ContentSection>

      <div className="space-y-12">
        <div className="border-t border-border/60 pt-10">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Tool-by-tool instructions
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Detailed steps for each utility. Click Open Tool to go directly to that page.
          </p>
        </div>

        {toolGuides.map((guide) => (
          <section
            key={guide.slug}
            id={guide.slug}
            className="scroll-mt-24 space-y-5 border-b border-border/60 pb-10 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary md:text-2xl">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{guide.summary}</p>
              </div>
              <Link
                href={`/tools/${guide.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground hover:bg-secondary/90"
              >
                Open Tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">
                Steps
              </h4>
              <ol className="list-decimal space-y-4 pl-5 text-muted-foreground leading-relaxed">
                {guide.steps.map((step) => (
                  <li key={step.title}>
                    <span className="font-semibold text-foreground">{step.title}</span>
                    <span className="block mt-1">{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>

            {guide.tips.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-primary">Pro tips</h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  {guide.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      <ContentSection title="Need more help?">
        <p>
          Each tool page includes an About section at the bottom with extra context and best
          practices. For site-wide questions, email{" "}
          <a
            href="mailto:support@clypio.com"
            className="font-medium text-secondary hover:underline"
          >
            support@clypio.com
          </a>
          .
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
