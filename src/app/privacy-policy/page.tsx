import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentList,
  ContentPageLayout,
  ContentSection,
} from "@/components/ContentPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | clypio Utility Hub",
  description:
    "Learn how clypio Utility Hub collects, uses, and protects information when you use our website and online tools.",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains what information we may collect when you use clypio Utility Hub, how we use it, and the choices available to you."
    >
      <ContentSection title="1. Introduction">
        <p>
          clypio Utility Hub (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
          your privacy. This Privacy Policy describes our practices when you visit our website,
          use our online tools, or contact us for support.
        </p>
        <p>
          By using the Service, you acknowledge that you have read this policy. If you do not
          agree, please discontinue use of the website.
        </p>
      </ContentSection>

      <ContentSection title="2. Scope">
        <p>This policy applies to:</p>
        <ContentList
          items={[
            "Visitors browsing clypio Utility Hub pages.",
            "Users interacting with our browser-based tools.",
            "Individuals who contact us by email or other support channels.",
          ]}
        />
        <p>
          It does not apply to third-party websites, apps, or services linked from our platform.
          Those parties maintain their own privacy policies.
        </p>
      </ContentSection>

      <ContentSection title="3. Information we may collect">
        <p>
          <strong className="text-foreground">Information you provide.</strong> When you
          voluntarily contact us (for example, by email), we may receive your name, email
          address, message content, and any details you choose to include.
        </p>
        <p>
          <strong className="text-foreground">Tool input data.</strong> Many utilities process
          data locally in your browser (such as text you type into a formatter or values you
          enter into a calculator). In those cases, we do not intentionally store your inputs on
          our servers unless a specific tool clearly states otherwise.
        </p>
        <p>
          <strong className="text-foreground">Automatic technical data.</strong> Like most
          websites, we or our service providers may collect limited technical information,
          including:
        </p>
        <ContentList
          items={[
            "IP address (often truncated or anonymized by analytics providers).",
            "Browser type, device type, and operating system.",
            "Pages visited, referring URLs, and approximate geographic region.",
            "Date and time of access and general usage patterns.",
            "Cookie or similar technology identifiers, where applicable.",
          ]}
        />
      </ContentSection>

      <ContentSection title="4. How we use information">
        <p>We use collected information to:</p>
        <ContentList
          items={[
            "Operate, maintain, and improve website performance and tool reliability.",
            "Understand aggregate usage trends and fix errors or abuse.",
            "Respond to support requests and communicate about the Service.",
            "Protect the security and integrity of our platform and users.",
            "Comply with legal obligations and enforce our Terms of Use.",
          ]}
        />
        <p>We do not sell your personal information.</p>
      </ContentSection>

      <ContentSection title="5. Legal bases (where applicable)">
        <p>
          If you are located in regions with data protection laws such as the GDPR, we process
          personal data based on one or more of the following grounds: your consent, performance
          of a contract or service request, legitimate interests in operating and securing the
          website (balanced against your rights), and compliance with legal obligations.
        </p>
      </ContentSection>

      <ContentSection title="6. Cookies and similar technologies">
        <p>
          We may use cookies, local storage, or similar technologies to remember preferences,
          measure traffic, or support advertising and analytics partners. You can often control
          cookies through your browser settings. Disabling cookies may affect certain features.
        </p>
        <p>
          Third-party advertisers or analytics providers may set their own cookies when you
          interact with ad placements on our site. Their use of data is governed by their
          respective policies.
        </p>
      </ContentSection>

      <ContentSection title="7. Advertising and third-party processors">
        <p>
          We may display advertisements to support free access to tools. Ad partners may process
          limited technical data (such as device identifiers or coarse location) to deliver and
          measure ads. We encourage you to review the privacy policies of any third-party
          services you interact with through our website.
        </p>
        <p>
          We may also rely on infrastructure providers (for example, hosting, analytics, or
          database services) who process data on our behalf under contractual safeguards
          appropriate to their role.
        </p>
      </ContentSection>

      <ContentSection title="8. Data retention">
        <p>
          We retain information only as long as necessary for the purposes described in this
          policy, unless a longer retention period is required by law. Support emails may be
          kept for a reasonable period to resolve inquiries and maintain records. Aggregated or
          anonymized analytics data may be retained longer because it no longer identifies you.
        </p>
      </ContentSection>

      <ContentSection title="9. Security">
        <p>
          We implement reasonable administrative, technical, and organizational measures designed
          to protect information against unauthorized access, alteration, or disclosure.
          However, no method of transmission over the Internet or electronic storage is 100%
          secure, and we cannot guarantee absolute security.
        </p>
      </ContentSection>

      <ContentSection title="10. Children’s privacy">
        <p>
          The Service is not directed to children under 13 (or the minimum age in your
          jurisdiction). We do not knowingly collect personal information from children. If you
          believe a child has provided us personal data, contact us and we will take appropriate
          steps to delete it.
        </p>
      </ContentSection>

      <ContentSection title="11. International users">
        <p>
          If you access the Service from outside the country where our servers or providers are
          located, your information may be transferred to and processed in other jurisdictions
          that may have different data protection laws. By using the Service, you understand such
          transfers may occur.
        </p>
      </ContentSection>

      <ContentSection title="12. Your rights and choices">
        <p>Depending on your location, you may have the right to:</p>
        <ContentList
          items={[
            "Request access to personal information we hold about you.",
            "Request correction or deletion of certain data.",
            "Object to or restrict certain processing activities.",
            "Withdraw consent where processing is consent-based.",
            "Lodge a complaint with a supervisory authority.",
          ]}
        />
        <p>
          To exercise these rights, email{" "}
          <a
            href="mailto:support@clypio.com"
            className="font-medium text-secondary hover:underline"
          >
            support@clypio.com
          </a>
          . We may need to verify your identity before responding. You may also stop using the
          Service at any time.
        </p>
      </ContentSection>

      <ContentSection title="13. Changes to this policy">
        <p>
          We may update this Privacy Policy periodically. The &quot;Last updated&quot; date at
          the top of the page indicates when revisions were last made. Material changes may also
          be highlighted on the website where appropriate.
        </p>
      </ContentSection>

      <ContentSection title="14. Related documents">
        <p>
          Please also read our{" "}
          <Link href="/terms" className="font-medium text-secondary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/about" className="font-medium text-secondary hover:underline">
            About
          </Link>{" "}
          pages for additional context about how the platform operates.
        </p>
      </ContentSection>

      <ContentSection title="15. Contact us">
        <p>
          For privacy-related questions or requests, contact{" "}
          <a
            href="mailto:support@clypio.com"
            className="font-medium text-secondary hover:underline"
          >
            support@clypio.com
          </a>
          . We will make reasonable efforts to respond within a timely manner.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
