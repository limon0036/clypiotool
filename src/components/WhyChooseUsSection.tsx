import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  Globe,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { tools } from "@/lib/tools-data";
import { quickStartSteps, whyChooseBenefits } from "@/lib/site-user-guide";
import { cn } from "@/lib/utils";

const benefitIcons = {
  "Secure & Reliable": ShieldCheck,
  "Fast Performance": Cpu,
  "All-in-One Platform": Globe,
  "Easy for Everyone": CheckCircle2,
} as const;

type WhyChooseUsSectionProps = {
  className?: string;
};

export function WhyChooseUsSection({ className }: WhyChooseUsSectionProps) {
  return (
    <section
      id="why-choose-us"
      className={cn(
        "rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-slate-50 via-white to-cyan-50/80 shadow-sm animate-in fade-in",
        className
      )}
    >
      <div className="p-6 md:p-10 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Simple tools. Clear steps. No sign-up.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Use clypio Utility Hub in minutes—pick a tool, enter your data, and copy the
              result. Follow the quick guide below or read the full instructions for every
              tool.
            </p>
          </div>
          <Link
            href="/user-guide"
            className="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground hover:bg-secondary/90 shrink-0"
          >
            See more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyChooseBenefits.map((item) => {
              const Icon = benefitIcons[item.title];
              return (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/90 p-4 space-y-2 border border-border/40 shadow-sm"
                >
                  <div className={`inline-flex rounded-lg p-2 ${item.bg}`}>
                    <Icon className={`w-5 h-5 ${item.accent}`} />
                  </div>
                  <p className="font-bold text-primary text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white/95 border border-border/50 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-secondary/10 p-2">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-primary">How to use this site</p>
                <p className="text-xs text-muted-foreground">Quick start in 4 steps</p>
              </div>
            </div>
            <ol className="space-y-3">
              {quickStartSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-primary">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/user-guide"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-secondary/30 bg-secondary/5 px-4 py-2.5 text-sm font-semibold text-secondary hover:bg-secondary/10 transition-colors"
            >
              <MousePointerClick className="w-4 h-4" />
              Full guide for all {tools.length} tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
