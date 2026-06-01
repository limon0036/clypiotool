import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentList,
  ContentPageLayout,
  ContentSection,
} from "@/components/ContentPageLayout";
import { tools } from "@/lib/tools-data";

export const metadata: Metadata = {
  title: "About | clypio Utility Hub",
  description:
    "Learn about clypio Utility Hub — our mission, tools, values, and commitment to free, reliable online utilities.",
};

export default function AboutPage() {
  return (
    <ContentPageLayout
      eyebrow="About us"
      title="About clypio Utility Hub"
      description="We build fast, free, browser-based tools so students, professionals, and creators can finish everyday digital tasks without friction."
    >
      <ContentSection title="Our mission">
        <p>
          clypio Utility Hub is an independent web platform dedicated to practical online
          utilities. We believe essential tools should be free to access, easy to understand,
          and respectful of your time. Whether you are generating a secure password, testing
          typing speed, or converting units for a project, our goal is the same: help you get
          accurate results in seconds with a clean, dependable interface.
        </p>
        <p>
          Many routine tasks still require jumping between apps, downloads, or sign-up walls.
          We consolidate useful utilities in one place so you can stay focused on your work
          instead of hunting for yet another single-purpose website.
        </p>
      </ContentSection>

      <ContentSection title="Who we serve">
        <p>
          Our tools are designed for anyone who works on a computer or phone regularly,
          including:
        </p>
        <ContentList
          items={[
            "Students preparing assignments, notes, and study materials.",
            "Developers and technical writers formatting Markdown or sharing links.",
            "Freelancers and small business owners managing passwords, QR codes, and URLs.",
            "Office workers tracking time, tasks, and everyday conversions.",
            "Health-conscious users checking BMI and wellness metrics at a glance.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Tools available on the platform">
        <p>
          We currently offer {tools.length} browser-based utilities, with more planned over
          time. Each tool runs in your session without requiring a desktop install:
        </p>
        <ContentList items={tools.map((tool) => `${tool.title} — ${tool.description}`)} />
        <p>
          Explore the full collection from the{" "}
          <Link href="/" className="font-medium text-secondary hover:underline">
            home page
          </Link>{" "}
          or the Service menu in the header.
        </p>
      </ContentSection>

      <ContentSection title="How we build and operate">
        <ContentList
          items={[
            "Performance first — pages are optimized for quick load times on mobile and desktop.",
            "Privacy-minded design — many tools process data locally in your browser when possible.",
            "Clear UX — labels, instructions, and results are written in plain language.",
            "Continuous improvement — we refine tools based on stability, feedback, and real-world use.",
            "Accessible layout — responsive design so utilities work across common screen sizes.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Our values">
        <p>
          <strong className="text-foreground">Simplicity.</strong> Features should solve a real
          problem without unnecessary complexity.
        </p>
        <p>
          <strong className="text-foreground">Trust.</strong> We publish clear Terms and Privacy
          Policy pages and avoid misleading claims about what our tools can do.
        </p>
        <p>
          <strong className="text-foreground">Accessibility.</strong> Free core utilities should
          remain available to everyone, not locked behind paywalls for basic tasks.
        </p>
        <p>
          <strong className="text-foreground">Responsibility.</strong> Users remain in control of
          how they apply generated outputs—especially for security, health, or legal contexts.
        </p>
      </ContentSection>

      <ContentSection title="Transparency and policies">
        <p>
          We maintain dedicated legal and information pages so you know how the platform works
          and how data is handled:
        </p>
        <ContentList
          items={[
            "Terms of Use — rules for acceptable use, service limitations, and liability.",
            "Privacy Policy — what data may be collected, why, and your choices.",
          ]}
        />
        <p>
          Read our{" "}
          <Link href="/terms" className="font-medium text-secondary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-secondary hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          for full details.
        </p>
      </ContentSection>

      <ContentSection title="Get in touch">
        <p>
          We welcome feedback, partnership inquiries, and bug reports. For support or general
          questions, email{" "}
          <a
            href="mailto:support@clypio.com"
            className="font-medium text-secondary hover:underline"
          >
            support@clypio.com
          </a>
          . We aim to review messages within a reasonable business timeframe.
        </p>
        <p>
          Thank you for using clypio Utility Hub. We are glad to be part of your daily workflow.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
